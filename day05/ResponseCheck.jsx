import React, {Component} from 'react';

class ResponseCheck extends Component {

    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요',
        result: [],
    };

    timeout;
    startTime; // 데이터가 바뀌어도 렌더링 일어나지 않음
    endTime;

    onClickScreen = () => {
        const { state, message, result } = this.state;
        if(state === 'waiting'){
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요'
            });
            this.timeout = setTimeout(() => {
                this.setState({
                   state: 'now',
                   message: '지금 클릭',
                });
                this.startTime = new Date();
            }, Math.floor(Math.random() * 1000) + 2000) // 2~3초 할당
        } else if(state === 'ready'){
            // 성급하게 클릭
            clearTimeout(this.timeout);
            this.setState({
                state: 'waiting',
                message: '성급하시네요. 초록색일 때 클릭하세요'
            })

        } else if(state === 'now'){
            // 반응속도 체크
            this.endTime = new Date();

            this.setState((prevState) => {
                return {
                    state: 'waiting',
                    message: '클릭해서 다시 시작하세요',
                    result: [...prevState.result, this.endTime - this.startTime],
                };
            })
        }
    }

    onReset = () => {
        this.setState({
            result: [],
        })
    }

    renderAverage = () => {
        const result = this.state.result;
        return result.length === 0
            ? null
            : <>
                <div>평균 시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={this.onReset}>리셋</button>
            </>
    }

    render() {
        const {state, message} = this.state;
        return (
            <>
            <div id="screen" className={state} onClick={this.onClickScreen}>
                {message}
            </div>

            {this.renderAverage()}
            {/*{this.state.result.length === 0
             ? null
             : <div>평균 시간 : {this.state.result.reduce((a,c) => a+c) / this.state.result.length}ms</div>
             }*/}
            {/*{this.state.result.length !== 0
             && <div>평균 시간 : {this.state.result.reduce((a,c) => a+c) / this.state.result.length}ms</div>
             }*/}
            </>
        );
    }

}

export default ResponseCheck;

// 리액트는 render JSX(return) 안에서는 보통 for, if 대신 다른방식 사용함
// if 대신 삼항연산자 혹은 && 연산자 사용
// JSX 에서 null 은 태그가 없음을 의미함
// renderAverage 이런 함수보다는 새로운 컴포넌트로 빼는게 더 좋긴 함. 대신 result는 props로 내려주기.

