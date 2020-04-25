import React, {Component} from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export default class BinaryMapConfField extends Component {
    renderCheckbox =(value,index) =>{
        const { classes} = this.props;
        value = parseInt(value);
        return (
            <Checkbox
                key={index}
                disabled={true}
                checked={value}
                value="checkedB"
                color="primary"
                className={classes.binaryCheckBox}
            />
        );
    }
    render(){
        const { name, label, value, classes} = this.props;

        let binary = parseInt(value).toString(2);
         while(binary.length < 12){
             binary='0' + binary;
         }
        return (
            <div className={classes.divRow}>
                <div className={classes.confLabel}>{label}</div>
                <div
                    name={name}
                    className={classes.value}>

                    {
                        binary.split('').map((character, index) => this.renderCheckbox(character,index))
                    }

                </div>

            </div>
        );
    };
}