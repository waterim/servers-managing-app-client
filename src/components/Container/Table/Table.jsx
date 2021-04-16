import React from 'react';
import './Table.scss';

import TableRow from './TableRow/TableRow';

const Table = ({ servers, handleTurnOnOffClick }) => {
    return (
        <table className='tableOfServers'>
            <colgroup>
                <col style={{ width: '35%' }} />
                <col style={{ width: '45%' }} />
                <col style={{ width: '20%' }} />
            </colgroup>
            <thead className='tableHead'>
                <tr className='tableHeadRow'>
                    <td>Name</td>
                    <td>Status</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {servers &&
                    servers.map((server) => {
                        return (
                            <TableRow
                                key={server.id}
                                server={server}
                                handleTurnOnOffClick={handleTurnOnOffClick}
                            />
                        );
                    })}
            </tbody>
        </table>
    );
};

export default Table;
