import React, { Component } from 'react';


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

class RSP extends Component {

    state = {
        result: '',
        imgCoord: '0',
        score: 0
    }
    
    interval;
    
    componentDidMount() { // 컴포넌트가 첫 렌더링 된 후, 여기에 비동기 요청을 많이 함

        // const { imgCoord } = this.state; // changeHand 안의 (비동기) 함수 내부로 이동 - 클로저 이슈 해결
        this.interval = setInterval(this.changeHand, 100);
    }

    componentDidUpdate() { // 컴포넌트 리렌더링 후에 실행
        
    }
    
    componentWillUnmount() { // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 함
        clearInterval(this.interval);
    }

    changeHand = () => {
        const { imgCoord } = this.state;

        console.log('이미지 슉슉', imgCoord)

        if(imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위
            });
        } else if(imgCoord === rspCoords.가위) {
            this.setState({
                imgCoord: rspCoords.보
            });
        } else if(imgCoord === rspCoords.보) {
            this.setState({
                imgCoord: rspCoords.바위
            });
        }
    }

    onClickBtn = (choice) => (e) => {
        const { imgCoord } = this.state;

        clearInterval(this.interval);

        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if(diff === 0){
            this.setState({
                result: '비겼습니다',
            });
        } else if([-1, 2].includes(diff)){
            this.setState((prevState) => {
                return {
                    result: '이겼습니다!',
                    score: prevState.score + 1
                }
            })
        } else {
            this.setState((prevState) => {
                return {
                    result: '졌습니다!',
                    score: prevState.score - 1
                }
            })
        }

        setTimeout(() => {
           this.interval = setInterval(this.changeHand, 100);
        }, 2000);
    }
    
    render() {
        const { result, score, imgCoord} = this.state;

        return (
            <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
            <div>
                <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;


// 클래스의 경우 -> constructor -> render -> ref -> componentDidMount 
// (setState/props 바뀔때) -> shouldComponentUpdate(true) -> render -> componentDidUpdate
// 부모가 나를 없앨때 -> componentWillUnmount -> 소멸

//onClick={this.onClickBtn(...) -> onClickBtn = (choice) => (e) => 로 변경 : 리액트 패턴, 고차함수(high order function)