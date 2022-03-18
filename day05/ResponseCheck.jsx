import React, { useState, useRef } from 'react';
// import React, {Component} from 'react';


const ResponseCheck = () => {

    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]);

    const timeout = useRef(null);
    const startTime = useRef(0);
    const endTime = useRef(0);

    const onClickScreen = () => {
        if(state === 'waiting'){
            setState('ready');
            setMessage('초록색이 되면 클릭하세요');

            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');

                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000) // 2~3초 할당
        } else if(state === 'ready'){
            // 성급하게 클릭
            clearTimeout(timeout.current);

            setState('waiting');
            setMessage('성급하시네요. 초록색일 때 클릭하세요');

        } else if(state === 'now'){
            // 반응속도 체크
            endTime.current = new Date();

            setState('waiting');
            setMessage('클릭해서 다시 시작하세요');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current]
            });
        }

    }
    const onReset = () => {
        setResult([]);
    }

    const renderAverage = () => {
        // const result = result;
        return result.length === 0
            ? null
            : <>
        <div>평균 시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
        </>
    }

    // 배열로 돔 바로 리턴하기(거의 안씀, 이런 방법이 있구나 정도만 기억할 것)
    // return [
    //   <div key="사과">사과</div>,
    //   <div key="배">배</div>,
    //   <div key="귤">귤</div>,
    // ];
    
    return (
        <>
        <div id="screen" className={state} onClick={onClickScreen}>
            {message}
        </div>
        {(() => {
            if(result.length == 0){
                return null;
            } else {
                return <>
                <div>평균 시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={onReset}>리셋</button>
                </>
            }
        })()}

        {/*{renderAverage()}*/}
        </>
    );
}


// class ResponseCheck extends Component {
//
//     state = {
//         state: 'waiting',
//         message: '클릭해서 시작하세요',
//         result: [],
//     };
//
//     timeout;
//     startTime; // 데이터가 바뀌어도 렌더링 일어나지 않음
//     endTime;
//
//     onClickScreen = () => {
//         const { state, message, result } = this.state;
//         if(state === 'waiting'){
//             this.setState({
//                 state: 'ready',
//                 message: '초록색이 되면 클릭하세요'
//             });
//             this.timeout = setTimeout(() => {
//                 this.setState({
//                    state: 'now',
//                    message: '지금 클릭',
//                 });
//                 this.startTime = new Date();
//             }, Math.floor(Math.random() * 1000) + 2000) // 2~3초 할당
//         } else if(state === 'ready'){
//             // 성급하게 클릭
//             clearTimeout(this.timeout);
//             this.setState({
//                 state: 'waiting',
//                 message: '성급하시네요. 초록색일 때 클릭하세요'
//             })
//
//         } else if(state === 'now'){
//             // 반응속도 체크
//             this.endTime = new Date();
//
//             this.setState((prevState) => {
//                 return {
//                     state: 'waiting',
//                     message: '클릭해서 다시 시작하세요',
//                     result: [...prevState.result, this.endTime - this.startTime],
//                 };
//             })
//         }
//     }
//
//     onReset = () => {
//         this.setState({
//             result: [],
//         })
//     }
//
//     renderAverage = () => {
//         const result = this.state.result;
//         return result.length === 0
//             ? null
//             : <>
//                 <div>평균 시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>
//                 <button onClick={this.onReset}>리셋</button>
//             </>
//     }
//
//     render() {
//         const {state, message} = this.state;
//         return (
//             <>
//             <div id="screen" className={state} onClick={this.onClickScreen}>
//                 {message}
//             </div>
//
//             {this.renderAverage()}
//             {/*{this.state.result.length === 0
//              ? null
//              : <div>평균 시간 : {this.state.result.reduce((a,c) => a+c) / this.state.result.length}ms</div>
//              }*/}
//             {/*{this.state.result.length !== 0
//              && <div>평균 시간 : {this.state.result.reduce((a,c) => a+c) / this.state.result.length}ms</div>
//              }*/}
//             </>
//         );
//     }
// }

export default ResponseCheck;

// 리액트는 render JSX(return) 안에서는 보통 for, if 대신 다른방식 사용함
// if 대신 삼항연산자 혹은 && 연산자 사용
// JSX 에서 null 은 태그가 없음을 의미함
// renderAverage 이런 함수보다는 새로운 컴포넌트로 빼는게 더 좋긴 함. 대신 result는 props로 내려주기.

// Hooks에서는 ref가 this의 역할을 함
// state 는 return이 재실행, ref는 return 재실행 안함. 즉 값이 바뀌기는 하지만 화면에 영향을 미치지 않는 값은 ref 활용함

// render JSX 안에서 for, if 사용하기 - render 내에 {} 영역 만들고 즉시실행함수를 만들어 사용함
