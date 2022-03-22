import React, { useEffect, useReducer, useCallback } from 'react';
import Table from './Table'

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['','',''], ['','',''], ['','','']],
    recentCell: [-1, -1],
};

// export붙여서 모듈로 만들어버림, 해당 액션을 Td.jsx에서 사용할꺼니까.
export const SET_WINNER = 'SET_WINNER'; 
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
    // action을 dispatch 할떄마다 실행됨 
    switch(action.type) {
        case SET_WINNER:
            // state.winner = action.winner 이렇게 하면 안됨
            return {
                ...state, // 스프레드 문법, 새로운 state를 만들어서 바뀌는 부분만 바꿔주는것, 얕은 복사를 이용
                winner: action.winner
            };
        case CLICK_CELL: {
            // 불변성을 지키며 복사해야함
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 문제 해결 가능 (지금은 얕은 복사로 객체 복사필요)
            tableData[action.row][action.cell] = state.turn;

            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell], // 최근 클릭한 셀 기억
            };    
        }
        case CHANGE_TURN: {
            return {
                ...state, 
                turn: state.turn === 'O' ? 'X' : 'O',
            };
        }
        case RESET_GAME: {
            return {
                ...state, 
                turn: 'O',
                tableData: [['','',''], ['','',''], ['','','']],
                recentCell: [-1, -1],
            };
        }
        default: {
            return state;
        }

    }
};

const TicTacToe = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, recentCell } = state;

    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('0');
    // const [tableData, setTableData] = useState([['','',''], ['','',''], ['','','']]);

    const onClickTable = useCallback(() => {
        // action
        dispatch({ type: SET_WINNER, winner: '0'}); //dispath 안에 action 객체 
    }, []); 

    useEffect(() => {
        const [row, cell] = recentCell;

        // 최초에는 승자 체크를 하지 않음 (초기값 = -1)
        if(row < 0){
            return;
        }

        let win = false;
        // 가로줄 검사
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        }
        // 세로줄 검사
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        }
        // 대각선 검사
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        }
        // 반대 대각선 검사
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true;
        }

        console.log(tableData, cell, row, win, turn);

        if(win) {
            // 승리시
            dispatch({ type: SET_WINNER, winner: turn });
            dispatch({ type: RESET_GAME });
        } else {
            // 무승부 검사
            let all = true; // 무승부라는 뜻
            tableData.forEach((row) => {
                row.forEach((cell) => {
                    if(!cell){
                        // 하나라도 안찬 칸이 있다면 무승부
                        all = false;
                    }
                });
            });

            if(all) {
                // 무승부
                dispatch({ type: RESET_GAME });
            } else {
                dispatch({ type: CHANGE_TURN }); // 턴을 바꿈 (턴을 다른 사람에게 전달 O -> X) // Td.jsx에서 이쪽으로 위치 변경함
                // Td.jsx에서 수행을 할 경우 dispatch({ type: CLICK_CELL.. 을 수행하면서 비동기로 CHANGE_TURN의 state 변경되어 useEffect에서 turn이 이미 넘거가 버리는 이슈가 발생하여 위치 변경함
            }

        }

    }, [recentCell])

    return (
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
            { winner && <div>{winner}님의 승리</div>}
        </>
        );
}

export default TicTacToe;

// state는 TicTacToe에서 관리하는데, 실제 핸들링은 Td에서 함 
// TicTacToe > Table > Tr > Td 거쳐서 전달해야할때 context api를 사용함
// 또한 다수의 state를 관리 해야할때 useReducer를 사용하여 하나의 state, 하나의 setState로 관리함

// redux
// 기존에 state를 두고, 이벤트가 발생하면, state를 직접 수정할 수 없으니, action을 만들고 action을 dispatch하여 state를 변경함
// action을 어떻게 처리할지는 reducer에서 관리함 (state를 어떻게 바꿀지 기록함)

// action의 type은 SET_WINNER 이런 변수로 빼둘것

// 리액트에서 state 변경시 반드시 불변성을 지켜야함 (immer라는 라이브러리로 코드 가독성 높임)
// const a = {b:1, c:2}
// const b=a;
// const c = {...a};
// c === a // false
// b === a // true

// dispatch : TicTacToe > Table > Tr > Td 거쳐서 전달 해야함, 그래서 나중에 context api를 사용함

// redux는 동기적으로 바뀌고, useReducer는 state가 비동기적으로 바뀜
// react도 state가 비동기적으로 변경됨
// 비동기 처리를 할 때는 useEffect를 사용한다 

// 여러 state 변수들 및 setState 들을 하나로 관리하기 위해 useReducer, dispatch 사용

// 렌더링 성능 최적화에 useRef, useEffect 사용
// useMemo / memo 를 사용하여 컴포넌트를 기억하여 리렌더링 되지 않게 함
// 자식 하나가 리렌더링 되면 부모로 리렌더링이 퍼져 나감, 따라서 table, tictactoe는 memo를 적용해도 의미가 없음. 반복문에 적용하면 개선됨.
// useMemo vs memo : memo를 적용했는데도 리렌더링이 될 경우 useMemo를 사용하여 컴포넌트 자체를 기억하게 함
// 디버그툴에서 빨간색으로 리렌더링이 일어나면 최적화 필요
