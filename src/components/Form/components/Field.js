import React, {Component} from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

export default class Field extends Component {
    render(){
        const { name, type, label, value, required, classes,editable,error,fullWidth} = this.props;
        let _value=value;
        if(!_value){
            if(type === 'date'){
                _value=0;
            }else{
                _value='';
            }
        }

        const adornement = (this.props.units !== '' && this.props.units !== undefined ) ?
            <InputAdornment position="end" className={classes.adornement}>{this.props.units}</InputAdornment> : '';
        return (
            <div className={classes.divRow}>
                <TextField
                    id={name}
                    name={name}
                    label={label}
                    fullWidth={fullWidth}
                    className={classes.textField}
                    InputProps={{
                        endAdornment: adornement,
                        classes: {
                            input: classes.textField
                        },
                        disableUnderline: !editable
                    }}
                    InputLabelProps={{
                        classes: {
                            root: classes.formTextLabel
                        }
                    }}
                    value={_value}
                    onChange={this.props.onChange}
                    margin="normal"
                    error={error !== undefined}/>
                {(error !== undefined) && (
                    <FormHelperText id="component-error-text"
                                    className="nameErrorInfoTab"
                                    error="true">
                        {error}
                    </FormHelperText>)
                }
            </div>
        );
    };
}