import React, {Component} from 'react';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';

export default class SelectField extends Component {
    render(){
        const { name, label, value, required,defaultValue,options, classes,editable} = this.props;

        return (
            <div className={classes.divRow}>
                <div className={classes.label}>{label}</div>
                {(editable) && (
                    <Select
                        native
                        required={required}
                        name={name}
                        value={value ? value : defaultValue}
                        className={classes.value}
                        fullWidth={true}
                        onChange={this.props.onChange}>

                        {options.map((option)=>{
                            return (
                                <option value={option.value} key={option.value}>{option.label}</option>
                            );
                        })}
                    </Select>
                )}


                {(!editable) && (
                    <Input
                        required={required}
                        readOnly={!editable}
                        name={name}
                        value={value ? value : defaultValue}
                        className={classes.value}
                        fullWidth={true} />
                )}


            </div>
        );
    };
}