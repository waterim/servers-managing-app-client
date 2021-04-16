import React from 'react';
import './DropDownMenu.scss';

const DropDownMenu = ({ status, id, handleTurnOnOffClick, setOpen }) => {
    const action = status === 'ONLINE' ? 'off' : 'on';
    return (
        <div className='DropdownMenu'>
            <button onClick={() => handleTurnOnOffClick(id, action)}>
                {status === 'ONLINE' ? 'Turn off' : 'Turn on'}
            </button>
            {status === 'ONLINE' && (
                <button
                    title="rebootButton"
                    onClick={() => {
                        handleTurnOnOffClick(id, 'reboot');
                        setOpen(false)
                    }}
                >
                    Reboot
                </button>
            )}
        </div>
    );
};

export default DropDownMenu;
