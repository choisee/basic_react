import React, { PureComponent } from 'react';
// import React, { Component } from 'react';

class Test extends PureComponent {
    state = {
        counter: 0,
        string: 'hello',
        number: 1,
        boolean: true,
        object: { a: '1', b: '2' },     // PureComponent 가 변경여부 판단을 어려워 함
        array: [ 5, 3, 6 ],             // PureComponent 가 변경여부 판단을 어려워 함 
        // array: [{ inside: [3] }],  // 이런 데이터구조 지양
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if(this.state.counter !== nextState.counter){
    //         return true;
    //     }
    //     return false;
    // }

    onClick = () => {
        // 렌더링 다시 되지 않음 
        // const array = this.state.array;
        // array.push(5);
        // this.setState({
        //     array: array,
        // });
        
        this.setState({
            array: [...this.state.array, 1],
        });
    };


    render() {
        console.log('렌더링', this.state);
        return (
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        )
    }
}

export default Test;