import React from 'react';
import PropTypes from 'prop-types';
import {database} from './Database';
import Plan from './Plan';

class Plans extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            plans: [],
            filteredPlans: []
        };
    }
    componentDidMount() {
        let plans = []; 
        database.ref("/Plans/").once("value").then((snapshot) => {
            snapshot.val().forEach(element => 
            { plans.push(Object.values(element));
            });
            this.setState({plans: plans, filteredPlans: plans});
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.level !== prevProps.level || this.props.type !== prevProps.type) {
            const updatedPlans = [];
            this.state.plans.forEach(plan => {
                if ((parseInt(plan[5]) == this.props.level || this.props.level == 0) &&
                    (plan[4] == this.props.type || this.props.type == ""))
                {
                    updatedPlans.push(plan);
                }
            });
            this.setState({filteredPlans: updatedPlans});
        }
    }

    render() {
        return (
            <div className="plans__list">
                {this.state.filteredPlans.map((plan, index) => 
                    <Plan key={index} name={plan[1]} level={plan[5]} type={plan[4]} />
                )}
            </div>
        );
    }
}

Plans.propTypes = {
    level: PropTypes.number,
    type: PropTypes.string
};

export default Plans;