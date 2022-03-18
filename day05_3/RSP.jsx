import React, { useState, useRef, useEffect, memo } from 'react';


const rspCoords = {
    바위 : '0',
    가위 : '-142px',
    보 : '-284px'
}

const scores = {
    가위 : 1,
    바위 : 0,
    보 : -1,
    
}

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
}


const RSP = memo(() => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);

    const interval = useRef();

    // 함수 컴포넌트 안에 작성할 것 
    useEffect( () => { // componentDidMount, componentDidUpdate 역할 (1:1 대응은 아님)
        console.log('다시 실행');
        interval.current = setInterval(changeHand, 100);
        return () => { // componentWillUnmount
            console.log('종료');
            clearInterval(interval.current);
        }
    }, [imgCoord]); // []이 클로저 이슈를 해결해줌, 두번째 인수배열에 넣은 값들이 바뀔때 useEffect가 계속 실행됨, [] 빈값이면 최초 1회만 실행됨
    
    const changeHand = () => {
        console.log('이미지 슉슉', imgCoord)
        if(imgCoord === rspCoords.바위) {
            setImgCoord(rspCoords.가위);
        } else if(imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보);
        } else if(imgCoord === rspCoords.보) {
            setImgCoord(rspCoords.바위);
        }
    }

    const onClickBtn = (choice) => (e) => {

        clearInterval(interval.current);

        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if(diff === 0){
            setResult('비겼습니다');
        } else if([-1, 2].includes(diff)){
            setResult('이겼습니다');
            setScore((prevScore) => { return prevScore + 1 });
        } else {
            setResult('졌습니다!');
            setScore((prevScore) => { return prevScore - 1 });
        }

        setTimeout(() => {
            interval.current = setInterval(changeHand, 100);
        }, 2000);
    }

    return (
        <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}/>
        <div>
            <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
            <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
            <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
        </>
    );
});

export default RSP;

// class to hooks
// useEffect 사용
// state 마다 다른 effect 를 사용하고 싶을 경우 useEffect를 여러번 사용함
