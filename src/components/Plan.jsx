import React from 'react';
import PropTypes from 'prop-types';

const Plan = (props) => (
    <div className='plan'>
        <h3>{props.name}</h3>
        <span>Type: {props.type}</span>
        <span>Level: {props.level}</span>
    </div>
);

Plan.propTypes = {
    name: PropTypes.string,
    level: PropTypes.string,
    type: PropTypes.string
};

export default Plan;