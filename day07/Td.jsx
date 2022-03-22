import React, { useCallback, useRef, useEffect, memo } from 'react';
import { CLICK_CELL } from './TicTacToe'
// import { CLICK_CELL, CHANGE_TURN } from './TicTacToe'

const Td = memo(({dispatch, rowIndex, cellIndex, cellData}) => {
    console.log('td rendered');

    const ref = useRef([]);
    useEffect(() => {
        console.log(dispatch === ref.current[0], rowIndex === ref.current[1], cellIndex === ref.current[2], cellData === ref.current[3]);
        console.log('data change?? ' + cellData + ' / '+ ref.current[3]);

        ref.current = [dispatch, rowIndex, cellIndex, cellData];
    }, [dispatch, rowIndex, cellIndex, cellData]);

    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);
        // 한번 클릭한 셀은 더이상 클릭할 수 없게 방어 코드 
        if(cellData) {
            return;
        }
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex }); // 칸을 클릭하고
        // dispatch({ type: CHANGE_TURN }); // 턴을 바꿈 (턴을 다른 사람에게 전달 O -> X) // TicTacToe 로 위치 변경함 
    }, [cellData]);

    return (
        <td onClick={onClickTd}>{cellData}</td>
    );
});

export default Td;
