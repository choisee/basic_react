import React, {useReducer, useMemo, createContext, useEffect} from 'react';
import Table from './Table'
import Form from './Form'

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, // 0 이상이면 opened 
}

export const TableContext = createContext({
    tableData: [],
    halted : true,
    dispatch: () => {},
});

const initialState = {
    tableData: [],
    timer: 0,
    result: '',
    halted: true, // 지뢰 클릭시 게임중단
    openedCount : 0,
    data: {
        row: 0,
        cell: 0,
        mine: 0,
    }
}

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);

    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });
    const shuffle = [];
    // 0~99가지 중 
    while (candidate.length > row * cell - mine) {
        // 랜덤으로 지뢰를 뽑아 놓고 
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        // 자리를 기억해둠
        shuffle.push(chosen);
    }

    const data = [];
    for(let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for(let j= 0; j < cell; j++){
            rowData.push(CODE.NORMAL);
        }
    }

    for(let k = 0; k < shuffle.length; k++){
        const ver = Math.floor(shuffle[k] / cell);
        const hor= shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    console.log(data);
    return data;

}

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTTION_CELL = 'QUESTTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state, action) => {
    switch(action.type) {
        case START_GAME: {
            return {
                ...state,
                data: {
                  row: action.row,
                  cell: action.cell,
                  mine: action.mine,
                },
                openedCount: 0,
                tableData: plantMine(action.row, action.cell, action.mine),
                halted: false,
                timer: 0,
            }
        }
        case OPEN_CELL: {
            const tableData = [...state.tableData];
            tableData.forEach((row, i) => {
                tableData[i] = [...row];
            });
            const checked = [];
            let openedCount = 0;

            console.log(tableData.length, tableData[0].length);
            const checkAround = (row, cell) => {
                console.log(row, cell);
                // 상하좌우 없는칸은 안 열기
                if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {
                    return;
                }
                // 닫힌 칸만 열기
                if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
                    return;
                }
                // 한 번 연칸은 무시하기
                if (checked.includes(row + '/' + cell)) {
                    return;
                } else {
                    checked.push(row + '/' + cell);
                }

                // 클릭기준으로 주변 지뢰갯수를 세어 표출하기 위한 로직
                let around = [
                    tableData[row][cell - 1], tableData[row][cell + 1],
                ];
                if (tableData[row - 1]) {
                    around = around.concat([tableData[row - 1][cell - 1], tableData[row - 1][cell], tableData[row - 1][cell + 1]]);
                }
                if (tableData[row + 1]) {
                    around = around.concat([tableData[row + 1][cell - 1], tableData[row + 1][cell], tableData[row + 1][cell + 1]]);
                }
                const count = around.filter(function (v) {
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                }).length;

                // 지뢰가 없는 주변 칸을 열기위해 재귀함수를 구현함 (Maximum call stack size exceeded 주의)
                if (count === 0) {
                    if (row > -1) {
                        const near = [];

                        // 제일위 클륵하면 그 위는 없음
                        if (row - 1 > -1) {
                            near.push([row -1, cell - 1]);
                            near.push([row -1, cell]);
                            near.push([row -1, cell + 1]);
                        }
                        near.push([row, cell - 1]);
                        near.push([row, cell + 1]);

                        // 제일아래 클륵하면 그 아래는 없음
                        if (row + 1 < tableData.length) {
                            near.push([row + 1, cell - 1]);
                            near.push([row + 1, cell]);
                            near.push([row + 1, cell + 1]);
                        }
                        near.forEach((n) => {
                            if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                                checkAround(n[0], n[1]);
                            }
                        })
                    }
                }
                if (tableData[row][cell] === CODE.NORMAL) { // 내 칸이 닫힌 칸이면 카운트 증가
                    openedCount += 1;
                }
                tableData[row][cell] = count;
            };
            checkAround(action.row, action.cell);
            let halted = false;
            let result = '';
            console.log(state.data.row * state.data.cell - state.data.mine, state.openedCount, openedCount);
            // 승리체크
            if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
                halted = true; // 승리
                result = `${state.timer}초만에 승리하셨습니다`;
            }
            return {
                ...state,
                tableData,
                openedCount: state.openedCount + openedCount,
                halted,
                result,
            };
        }
        case CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted: true,
            }
        }

        // 우클릭
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.MINE){
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData,
            }
        }
        case QUESTTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.FLAG_MINE){
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData,
            }
        }
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.QUESTION_MINE){
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData,
            }
        }
        case INCREMENT_TIMER: {
            return {
                ...state,
                timer: state.timer + 1,
            }
        }
        default:
            return state;
    }
};

const MineSearch = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, halted } = state;

// tableData: state.
    const value = useMemo( () => ({ tableData, halted, dispatch }), [tableData] ); // dispatch는 바뀌지 않기 때문에, [] 안에 추가하지 않아도 됨

    useEffect(() => {
        let timer;
        if(halted === false){
            timer = setInterval(() => {
                dispatch({ type: INCREMENT_TIMER });
            }, 1000);
        }
        return() => {
            clearInterval(timer);
        }
    }, [halted]);

    return (
        <TableContext.Provider value = { value } > {/* 데이터 캐싱 */}
        {/* <TableContext.Provider value = {{tableData: state.tableData, dispatch}} > */} {/* 자식에서 사용할 값을들 value 에 넣어주면 됨 */}
            <Form />
            <div>{state.timer}</div>
            <Table />
            <div>{state.result}</div>
        </TableContext.Provider>
    );
}

export default MineSearch;

// 복습
// useReducer
// dispatch, action
// redux(sync) vs useReducer(async)

// contextApi : 부모 > ... > 자식 다층관계일 경우 사용
// contextApi 사용방법 : createContext(...) 사용 후 TableContext.Provider 사용
// value 들은 캐싱 해주기 : const value = useMemo(...)
// contextApi는 최적화하기 어려움, 값을 value = {{tableData: state.tableData, dispatch}} 이렇게 내려주면 안되고 useMemo로 캐싱을 해줘야함

// contextApi는 최적화를 위해 부모부터 자식 컴포넌트 까지 memo를 적용함 & render되는 컴포넌트를 아예 빼서 memo 적용