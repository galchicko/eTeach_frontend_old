import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';

export default class TextArea extends Component {
    render(){
        const { name, type, label, value, required, classes,rows,editable} = this.props;
        return (
            <div>
                <TextField
                    id={name}
                    name={name}
                    label={label}
                    value={value}
                    fullWidth={true}
                    disabled={!editable}
                    onChange={this.props.onChange}
                    className={classes.additionalInformation}
                    InputProps={{
                        classes: {
                            input: classes.additionalInformationInput
                        },
                        disableUnderline: true
                    }}
                    InputLabelProps={{
                        classes: {
                            root: classes.formTextLabel
                        }
                    }}
                    required={required}
                    rows={rows}
                    multiline={true}
                    margin="normal"/>

            </div>

        );
    };
}