import React, { useState } from 'react';
import { database, FirebaseContext } from './Database';
import Plans from './Plans';

const PlansContainer = () => {
    const [selectByLevel, setSelectByLevel] = useState(0);
    const [selectByType, setSelectByType] = useState('');
    return (
        <div className="plans__container">
            <div className="plans__dropdown-container">
                <select className="plans__select" onChange={(e) => setSelectByLevel(parseInt(e.target.value))}>
                    <option className="plans__option" value='0'>Filter by level</option>
                    <option className="plans__option">1</option>
                    <option className="plans__option">2</option>
                    <option className="plans__option">3</option>
                    <option className="plans__option">4</option>
                    <option className="plans__option">5</option>
                </select>
                <select className="plans__select" onChange={(e) => setSelectByType(e.target.value)}>
                    <option className="plans__option" value=''>Filter by type</option>
                    <option className="plans__option">CARDIO</option>
                    <option className="plans__option">CORE</option>
                    <option className="plans__option">FULL BODY</option>
                    <option className="plans__option">LOWER BODY</option>
                    <option className="plans__option">UPPER BODY</option>
                </select>
            </div>
            <FirebaseContext.Provider value={database}>
                <Plans level={selectByLevel} type={selectByType}/>
            </FirebaseContext.Provider>
        </div>
    );
};

export default PlansContainer;