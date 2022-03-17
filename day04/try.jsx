import React, { PureComponent, memo, useState } from 'react';


class Try extends PureComponent {

    constructor(props){
        super(props);

        // 기본 객체 외 필터 수정이 필요할 경우 함수를 사용함 
        let result = props.tryInfo.result;

        if(props.tryInfo.try.length !== 4){
            console.log(props.tryInfo.try);
            result = '4자리수여야 합니다'
        }

        this.state = {
            result: props.result,
            try: props.try,
            childResult:result,
        }
    }

    // state = {
    //     result: this.props.result,
    //     try: this.props.try
    // }

    render(){
        const { tryInfo }  = this.props;
        return (
            <li>
                <div>{tryInfo.try}</div>
                <div>{this.state.childResult}</div>
            </li>
        );
    }
}

// const Try = memo(({ tryInfo }) => {
//     // // tryInfo.try = 'hello'; // props는 자식이 바꾸면 안됨. 부모가 바꿔야함 // 왜냐하면 부모에 영향을 미침
//     // // 실무에서 바꿔야할 경우...
//     // const [result, setResult] = useState(tryInfo.result);
//     // const onClick = () => {
//     //     setResult('1');
//     // };
//
//     return (
//         <li>
//             <div>{tryInfo.try}</div>
//             <div>{tryInfo.result}</div>
//             {/*<div onClick={onClick}>{result}>>>클릭</div>*/}
//         </li>
//     )
// });


// const Try = ({ tryInfo }) => {
//     return (
//         <li>
//             <div>{tryInfo.try}</div>
//             <div>{tryInfo.result}</div>
//         </li>
//     )
// };

// class Try extends Component {
//     render(){
//         const { tryInfo }  = this.props;
//         return (
//             <li>
//                 <div>{tryInfo.try}</div>
//                 <div>{tryInfo.result}</div>
//             </li>
//         );
//     }
// }

export default Try;

// (props) -> ({ tryInfo }) 보통 구조분해로 처리함

