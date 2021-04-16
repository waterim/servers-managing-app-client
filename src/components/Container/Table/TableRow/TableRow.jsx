import React, { useState } from 'react';
import './TableRow.scss';

import DropDown from './DropDown/DropDown';

const TableRow = ({ server: { id, name, status }, handleTurnOnOffClick }) => {
    const [isOpen, setIsOpen] = useState();
    return (
        <>
            <tr className='tableRow'>
                <td>{name}</td>
                <td>
                    <button
                        title='statusButton'
                        className='statusButton'
                        disabled={status === 'REBOOTING' && true}
                        onClick={() => setIsOpen(!isOpen)}
                        style={
                            status === 'REBOOTING'
                                ? { color: '#A9AEC1', marginLeft: '-11px' }
                                : status === 'ONLINE'
                                ? { color: '#65bdbd' }
                                : { color: 'black' }
                        }
                    >
                        {status === 'REBOOTING' ? (
                            `${status}...`
                        ) : status === 'ONLINE' ? (
                            <React.Fragment>
                                <i className='fas fa-circle'></i> {status}
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <i className='fas fa-times'></i> {status}
                            </React.Fragment>
                        )}
                    </button>
                </td>
                <td className='infoButton'>
                    <DropDown
                        handleTurnOnOffClick={handleTurnOnOffClick}
                        id={id}
                        status={status}
                        open={isOpen}
                        setOpen={setIsOpen}
                    />
                </td>
            </tr>
        </>
    );
};

export default TableRow;
