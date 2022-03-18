import React, { useRef, useState, memo } from 'react';
// import React, { Component, createRef } from 'react';
import Try from './try';


// 숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
function getNumbers(){
    console.log('getNumbers'); // 계속 불리는 이슈
    
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];

    for(let i = 0; i < 4; i++){
        const chosen = candidate.splice(Math.floor(Math.random() * (9-i)), 1)[0];
        array.push(chosen);
    }
    return array;
};

const NumberBaseball = memo(() => {

    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);

    const inputRef = useRef(null);

    const onSubmitForm = (e) => {

        e.preventDefault();

        if(value === answer.join('')){
            // 정답
            setResult('홈런');
            setTries((prevTries) => {
                return [...prevTries, {try: value, result:'홈런!'}]
            });
            alert('게임을 다시 시작합니다');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
            inputRef.current.focus();
            // this.inputRef.current.focus();

        } else {
            // 땡
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;

            if(tries.length >= 9){ // 10번 이상 실패
                
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')} 였습니다`);
                alert('게임을 다시 시작합니다');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
                inputRef.current.focus();
                // this.inputRef.current.focus();

            } else {
                for(let i = 0; i < 4; i++){
                    if(answerArray[i] === answer[i]){
                        strike += 1;
                    } else if(answer.includes(answerArray[i])){
                        ball += 1;
                    }
                }
                
                setResult('홈런');
                setTries((prevTries) => {
                    return [...prevTries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}]
                })
                setValue('');
                setResult('땡');
                inputRef.current.focus();
                // this.inputRef.current.focus();

            }
        }
    };

    const onChangeInput = (e) => {
        console.log(answer);
        setValue(e.target.value)
    };

    // inputRef = createRef();

    // onInputRef = (c) => {
    //     console.log('do ref');
    //     this.inputRef = c;
    // }

    return(
        <>
        <h1>{result}</h1>
        <form onSubmit={onSubmitForm}>
            <input ref={inputRef} maxLength={4} value={value} onChange={onChangeInput}/>
        </form>
        <div>시도 : {tries.length}</div>
        <ul>
            {/* 즉시실행함수를 활용하여 for문을 작성함 */}
            {(() => {
                const array = [];
                for(let i = 0; i < tries.length; i++){
                    array.push(<Try key={`${i + 1}차 시도 :`} tryInfo={tries[i]} />);
                    
                }
                return array;
            })()}
            
            
            
            {/*
            {tries.map((v, i) => {
                return (
                    <Try key={`${i + 1}차 시도 :`} tryInfo={v} />
                );
            })}
            */}
        </ul>
        </>
    );
});


// class component 의 경우
// class NumberBaseball extends Component {
//
//     constructor(props){
//         super(props);
//         this.state = {
//             result:'',
//             value: '',
//             answer: getNumbers(), // ex. [1,3,5,7]
//             tries:[],
//         }
//         this.onChangeInput = this.onChangeInput.bind(this);
//     }
//
//     onSubmitForm = (e) => {
//         const {answer, value, tries} = this.state;
//
//         e.preventDefault();
//
//         if(value === answer.join('')){
//             // 정답
//             this.setState((prevState) => {
//                return {
//                    result: '홈런',
//                    tries: [...prevState.tries, {try: value, result:'홈런!'}]
//                }
//             });
//             alert('게임을 다시 시작합니다');
//             this.setState({
//                 value: '',
//                 answer: getNumbers(),
//                 tries: [],
//             });
//         } else {
//             // 땡
//             const answerArray = value.split('').map((v) => parseInt(v));
//             let strike = 0;
//             let ball = 0;
//            
//             if(tries.length >= 9){ // 10번 이상 실패
//                 // this.setState({
//                 //     result:`10번 넘게 틀려서 실패! 답은 ${answer.join(',')} 였습니다`,
//                 // })
//                 this.setState((prevState) => {
//                     return {
//                         result:`10번 넘게 틀려서 실패! 답은 ${prevState.answer.join(',')} 였습니다`,
//                     }
//                 });
//                 alert('게임을 다시 시작합니다');
//                 this.setState({
//                     value: '',
//                     answer: getNumbers(),
//                     tries: [],
//                     result: '힘내요',
//                 })    
//             } else {
//                 for(let i = 0; i < 4; i++){
//                     if(answerArray[i] === answer[i]){
//                         strike += 1;
//                     } else if(answer.includes(answerArray[i])){
//                         ball += 1;
//                     }
//                 }
//                 // this.setState({
//                 //     tries: [...tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}],
//                 //     value: '',
//                 //     result: '땡',
//                 // });
//
//                 this.setState((prevState) => {
//                     return {
//                         result: '홈런',
//                         tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}],
//                         value: '',
//                         result: '땡',
//                     }
//                 });
//             }
//            
//         }
//     };
//
//     onChangeInput(e){
//
//         console.log(this)
//         console.log(this.state.answer);
//        
//         this.setState({
//             value: e.target.value,
//         });
//        
//     };
//
//     // fruits = [
//     //     { fruit: '사과', taste: '맛있다'},
//     //     { fruit: '바나나', taste: '달다'},
//     //     { fruit: '포도', taste: '시다'},
//     //     { fruit: '귤', taste: '떫다'},
//     //     { fruit: '감', taste: '쓰다'},
//     //     { fruit: '사과', taste: '쓰다'},
//     // ];
//    
//     render(){
//       const {result, value, tries} = this.state;
//       // render 안에서는 setState 쓰면 무한 렌더링되므로 금지
//       return(
//           <>
//               <h1>{result}</h1>
//               <form onSubmit={this.onSubmitForm}>
//                   <input maxLength={4} value={value} onChange={this.onChangeInput}/>
//               </form>
//               <div>시도 : {tries.length}</div>
//               <ul>
//                   {/* this.state.tries = { try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다`} */}
//                   {tries.map((v, i) => {
//                       return (
//                           <Try key={`${i + 1}차 시도 :`} tryInfo={v} />
//                       );
//                   })}
//               </ul>
//               {/*JSX 주석*/}
//           </>
//       );  
//     };
// }

export default NumberBaseball; // import NumberBaseball;


// export const hello = 'hello'; // import { hello }
// export const bye = 'hello'; // import { hello, bye }

// node module (module.exports), es2015 module (export default)
// node = require, react = import/export


// 배열에 담기
// {[
//     ['사과', '맛있다'],
//     ['바나나', '달다'],
//     ['포도', '시다'],
//     ['귤', '떫다'],
//     ['감', '쓰다']
// ].map((v) => {
//     return (
//         <li><b>{v[0]}</b> - {v[1]}</li>
//     );
// })}


// 리액트가 key를 보고 컴포넌트 인지 아닌지 판단함
// 그래서 반복문 돌릴때는 key를 반드시 고유하게 만들어주어야 함


// map 내의 return 생략
// {[
//     { fruit: '사과', taste: '맛있다'},
//     { fruit: '바나나', taste: '달다'},
//     { fruit: '포도', taste: '시다'},
//     { fruit: '귤', taste: '떫다'},
//     { fruit: '감', taste: '쓰다'},
//     { fruit: '사과', taste: '쓰다'},
// ].map((v) => (
//     <li key={v.fruit+v.taste}><b>{v.fruit}</b> - {v.taste}</li>
// ))}

// key에 i 만 쓰면 성능최적화에 옳지 않음. 쓰지 말것. 무엇이 수정된건지 리액트가 알기 어려워짐.
// 리액트에서는 key를 기준으로 element를 추가/수정/삭제 하기 때문에 배열의 순서가 바뀌면 문제가 생김
// <li key={i}><b>{v.fruit}</b> - {v.taste} - {i}</li>

// Component 분리 - 재사용성, 가독성, 성능최적화

// html = attribute, react = props 기
// (ex. <Try value={v} index={i} />, 받는 Try 안에서는 this.props.value로 받음)
// 부모 컴포넌트가 자식 컴포넌트에게 props를 물려줌

// 분리 먼저 하지 말고 한 컴포넌트에 다 적고 분리
// 보통 반복문 단위로 분리 함 (탑다)운

// context, redux, mobex 등이 props를 고조 > ... > 손자 에게 물려줄때 문제를 해결함

// 화살표 함수가 아닌 함수로 정의할 경우, constructor 정의와 그 내부에서 bind(this) 해줘야 함 - 오래된 소스 해석할때 만..

// 리액트 불변성
// 리액트에서는 배열에 push를 하면 안됨, 리액트가 push하면 변경된 사항을 감지 하지 못함
// 이떄는 새로운 배열을 만들어서 기존 배열을 복사하고 새로운걸 넣어주면됨
// const array = [];
// array.push(1);
// const array2 = [...array, 1];
// 리액트는 렌더링 기준은  예전 state랑 현재 state가 바뀌어야 함. 참조가 바뀌어야함. array === array2 가 false 가 되어야함

// 구조분해로 소스 간결화
// this.state.tries 번거로움 -> const {result, value, tries} = this.state; 선언하고 Hooks 처럼 tries만 사용
// 한번에 바꾸기 단축키 ctrl+g (macOs)

// map 기본 개념은 1:1로 짝지어 바꾸기
// ex. [1,2,3] -> [2,4,6]
// [1,2,3].map((v) => v * 2)

// getNumbers() 처럼 함수를 class 외부로 빼놓으면 Hooks 로 바꿀때에도 독립적은 함수라 수정하지 않아도 되어 편리함

// context, redux : A가 C에게 바로 props를 줄 때 필요함 (A -> B -> C)


// 함수 컴포넌트에서 <input 에 value 가 바뀌면 내부 통째로 갱신되어 input 입력할때마다 실행되는 이슈 나중에 useEffect 배우고 수정 가능함

// 즉시실행함수를 활용하여 for문을 작성함