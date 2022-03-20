import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers() {
    console.log('getWinNumbers');

    const candidate = Array(45).fill().map((v,i) => i+1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNmuber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0,6).sort((p,c) => p - c);
    return [...winNumbers, bonusNmuber];
}

// 함수 컴포넌트는 전체 재실행
const Lotto = () => {

    const lottoNumbers = useMemo(() => getWinNumbers(), []); // useMemo는 []가 바뀌기 전까지 값을 저장한다
    const [winBalls, setWinBalls] = useState([]);

    // // 아래도 getWinNumbers()가 계속 실행됨getWinNumbers()가 계속 실행됨
    // const [winBalls, setWinBalls] = useState([]); // hooks는 선언 순서 중요 (ex. winBalls 사용)
    // const lottoNumbers = useMemo(() => getWinNumbers(), [winBalls]);

    // const lottoNumbers = getWinNumbers(); // getWinNumbers()가 계속 실행됨, 따라서 useMemo 사용
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);

    // // 이러면 조건 충족 안할때 실행되지 않아 문제가 된다, 그래서 조건문에 사용하면 안되고 반복문 안에도 웬만하면 쓰지 말아라
    // if(조건){
    //     const [redo, setRedo] = useState(false); // 6번
    // }

    const timeouts = useRef([]);
    
    
    // // ajax 호출하기
    // useEffect(() => {
    //     // ajax를 componentDidMount 에서만 쓰고 싶다 하면.. 아래 꼼수 코드
    // }, []);
    //
    // const mounted = useRef(false);
    // useEffect(() => {
    //     // componentDidMount때 실행은 되지만 아무것도 안하게 하기 꼼수
    //     if(!mounted.current){
    //         mounted.current = true;
    //     } else {
    //         // ajax 요청
    //     }
    //    
    // }, [바뀌는값]); // componentDidUpdate만 O, componentDidMount는 X

    useEffect(() => {
        console.log('useEffect');

        for(let i=0; i < winNumbers.length -1; i++){
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevBalls) => {
                    return [...prevBalls, winNumbers[i]]
                })
            }, (i + 1) * 1000);
        };

        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
        
        return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            })
        }
        
    }, [timeouts.current]); // 빈 배열[]이면 componentDidMount()와 동일
    // 빈 배열이 아니면 componentDidMount, componentDidUpdate 둘다 수행
    // useEffect는 [timeouts.current]가 바뀔때 {...}를 실행한다
    // componentDidMount 때 무조건 실행되고 두번째 인자가 바뀔 때 componentDidUpdate가 실행된다

    useEffect( () => {
        console.log('로또 숫자를 생성합니다');
    }, [winNumbers]);

    // useCallback을 사용하므로써 함수를 기억하여 함수의 재생성을 막음
    const onClickRedo = useCallback(() => {
        console.log('onClickRedo');
        console.log(winNumbers); // 기억해서 당첨 숫자가 바뀌질 않음 // 따라서 useCallback 안에서 사용하는 state는 주의 필요 -> 따라서 winNumbersw를 두번째 인자로 넣어줌
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = []; // useEffect에서 감지 후 동작
    }, [winNumbers]);
    // useCallback은 함수 자체를 기억한다 winNumbers가 바뀌기 전까지

    return (
        <>
        <div>당첨 숫자</div>
        <div id="결과창">
            {winBalls.map((v) => <Ball key={v} number={v} />)}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} onClick={onClickRedo} />}
        {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    );
};

export default Lotto;


// useMemo, useEffect, useCallback은 두번째 인자가 있음, 해당 인자가 바뀌면 다시 실행됨
// useMemo : 복잡한 함수 결과값을 기억함 (함수 실행 결과값 저장)
// useRef : 일반 값을 기억함
// useCallback 사용시 state 를 두번째 인자로 넣어주자, 그렇지 않으면 처음 set된 데이터를 계속 기억하는 이슈 발생함
// 자식 컴포넌트에 props로 함수를 넘길때는 useCallback을 사용하자, 안그러면 매번 새로운 함수가 생성되며 자식 컴포넌트는 매번 props가 바뀐줄 알고 매번 새로 렌더링을 한다
// hooks에서는 useMemo, useEffect, useCallback의 순서가 매우 중요해서 순서가 바뀌면 안된다
// 조건문 안에서는 사용하지 말아라, 반복문 안에서도 웬만하면 사용하지 말것, hooks 들은 최상위로 빼서 실행 순서가 같게 끔 할 것
// useEffect를 여러번 사용해도 된다 (ex. 로또 숫자를 생성합니다) (class에서 componentDidUpdate 안에는 조건문으로 다 포함 시킴)
// componentDidMount에서만 ajax 호출하기
