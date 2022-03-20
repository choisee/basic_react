import React, { memo } from 'react';
// import React, { useState, useEffect  } from 'react';
// import React, { PureComponent } from 'react';

// 그냥 함수 컴포넌트, 훅스는 useState, useEffect 써야함
const Ball = memo(({ number }) => {
    let background;
    if (number <= 10) {
        background = 'red';
    } else if (number <= 20) {
        background = 'orange';
    } else if (number <= 30) {
        background = 'yellow';
    } else if (number <= 40) {
        background = 'blue';
    } else {
        background = 'green';
    }

    return (
        <div className="ball" style={{ background }}>{number}</div>
    )
});

// class Ball extends PureComponent {
//
//     render() {
//         let background;
//         if (number <= 10) {
//             background = 'red';
//         } else if (number <= 20) {
//             background = 'orange';
//         } else if (number <= 30) {
//             background = 'yellow';
//         } else if (number <= 40) {
//             background = 'blue';
//         } else {
//             background = 'green';
//         }
//         return (
//             <div className = "ball" style={{ background }}>{number}</div>
//         );
//     }
// }

export default Ball;



// 그냥 함수 컴포넌트, 훅스는 useState, useEffect 써야함
// memo 는 high order component, HOC