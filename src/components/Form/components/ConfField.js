import React, {Component} from 'react';

export default class ConfField extends Component {
    render(){
        const { name, label, value, classes} = this.props;
        return (
            <div className={classes.divRow}>
                <div className={classes.confLabel}>{label}</div>
                <div
                    name={name}
                    className={classes.value}
                >{value}</div>

                <div className={classes.units}>{this.props.units}</div>
            </div>
        );
    };
}