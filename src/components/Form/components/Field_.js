import React, {Component} from 'react';
import Input from '@material-ui/core/Input';

export default class Field extends Component {
    render(){
        const { name, type, label, value, required, classes,editable} = this.props;
        let _value=value;
        if(!_value){
            if(type === 'date'){
                _value=0;
            }else{
                _value='';
            }
        }
        return (
            <div className={classes.divRow}>
                <div className={classes.label}>{label}</div>
                <Input
                    required={required}
                    readOnly={!editable}
                    name={name}
                    value={_value}
                    className={classes.value}
                    type={type}
                    fullWidth={true}
                    onChange={this.props.onChange}/>

                <div className={classes.units}>{this.props.units}</div>
            </div>
        );
    };
}