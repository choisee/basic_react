import React, { useRef, useEffect, useMemo, memo } from 'react';
import Td from './Td'

const Tr = memo(({rowData, rowIndex, dispatch}) => {
    console.log('tr rendered');

    const ref = useRef([]);
    useEffect(() => {
        console.log(rowData === ref.current[0], rowIndex === ref.current[1], dispatch === ref.current[2],);
        console.log('data change?? ' + rowData + ' / '+ ref.current[0]);

        ref.current = [rowData, rowIndex, dispatch];
    }, [rowData, rowIndex, dispatch]);

    return (
        <tr>
            {Array(rowData.length).fill().map((td, i) => ( 
                // <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>
                // 컴포넌트 자체를 기억하고 rowData[i]가 바뀌었을데 리렌더링
                useMemo(
                    () => <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>,
                    [rowData[i]]
                )
            ))}
        </tr>
    );
});

export default Tr;
