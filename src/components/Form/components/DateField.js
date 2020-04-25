import React, {Component} from 'react';
import 'date-fns';
import {KeyboardDatePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export default class DateField extends Component {
    render(){
        const { name, label, value,  classes} = this.props;

        let _value=value;
        if(!_value){
            _value=null;
        }else{
            const year = new Date(value).getFullYear();
            if(year < 1971){
                _value = null;
            }
        }
        return (
            <div className={classes.divRow}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        autoOk={true}
                        okLabel={null}
                        cancelLabel='CLOSE'
                        clearable
                        format="MM/dd/yyyy"
                        margin="normal"
                        id={name}
                        className={classes.dateField}
                        name={name}
                        label={label}
                        value={_value}
                        InputProps={{
                            classes: {
                                input: classes.dateField
                            }
                        }}
                        InputLabelProps={{
                            classes: {
                                root: classes.formTextLabel
                            }
                        }}
                        KeyboardButtonProps={{
                            classes: {
                                root: classes.dateAdornement
                            }
                        }}
                        onChange={(dateStr)=>this.props.onChange(name,dateStr)}
                        onClear={()=> this.props.onChange(name,null)}/>

                </MuiPickersUtilsProvider>
            </div>
        );
    };
}