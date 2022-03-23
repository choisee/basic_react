import React, { useContext, useCallback, memo, useMemo } from 'react';
import {TableContext, CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTTION_CELL, NORMALIZE_CELL} from './MineSearch'

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL :
        case CODE.MINE :
            return {
                background: '#444'
            }
        case CODE.OPENED :
        case CODE.CLICKED_MINE :
            return {
                background: 'white'
            }
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return {
                background: 'yellow',
            }
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return {
                background: 'red',
            }
        default :
            return {
                background: 'white'
            }
    }
};

const getTdText = (code) => {
    console.log('getTdText'); // useMemo로 실제 리렌더링 안되는건지 확인
    switch (code) {
        case CODE.NORMAL :
            return '';
        case CODE.MINE :
            return 'X';
        case CODE.CLICKED_MINE :
            return '펑';
        case CODE.FLAG :
        case CODE.FLAG_MINE :
            return '!';
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return '?';
        default :
            return code || '';
    }
};

const Td = memo(({rowIndex, cellIndex}) => {
    const {tableData, dispatch, halted} = useContext(TableContext);

    const onClickTd = useCallback(() => {
        if(halted){
            return;
        }
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                dispatch({type: OPEN_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.NORMAL:
                dispatch({type: OPEN_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.MINE:
                dispatch({type: CLICK_MINE, row: rowIndex, cell: cellIndex});
                return;

        }

    }, [tableData[rowIndex][cellIndex], halted]);

    const onRightClickTd = useCallback((e) => {
        e.preventDefault(); // 우클릭 메뉴가 뜨지 않도록 처리
        if(halted){
            return;
        }
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({type: FLAG_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.FLAG:
            case CODE.FLAG_MINE:
                dispatch({type: QUESTTION_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                dispatch({type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex});
                return;
            default:
                return;
        }


    }, [tableData[rowIndex][cellIndex], halted]);

    console.log('td rendered');

    return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]} />;

    // return useMemo(() => (
    //     <td
    //         onClick={onClickTd}
    //         onContextMenu={onRightClickTd}
    //         style={getTdStyle(tableData[rowIndex][cellIndex])}>
    //         {getTdText(tableData[rowIndex][cellIndex])}
    //     </td>
    // ), [tableData[rowIndex][cellIndex]]);
});

const RealTd = memo(({onClickTd, onRightClickTd, data}) => {
    console.log('RealTd Rendered');
    return (
        <td
            onClick={onClickTd}
            onContextMenu={onRightClickTd}
            style={getTdStyle(data)}>
            {getTdText(data)}
        </td>
    );
});

export default Td;

// {/* <td>{tableData[rowIndex][cellIndex]}</td> */}