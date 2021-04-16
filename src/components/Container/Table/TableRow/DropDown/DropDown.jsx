import React from 'react';
import './DropDown.scss';

import DropDownMenu from './DropDownMenu/DropDownMenu';

const DropDown = ({status, open, setOpen, id, handleTurnOnOffClick}) => {

    return (
        <div className='Dropdown'>
            <button title="infoButton" className="dropdownButton" disabled={status === 'REBOOTING' && true} onClick={() => setOpen(!open)}>
                <i className='fas fa-ellipsis-h'></i>
            </button>
            {open && <DropDownMenu status={status} id={id} handleTurnOnOffClick={handleTurnOnOffClick} setOpen={setOpen}/>}
        </div>
    );
};

export default DropDown;
