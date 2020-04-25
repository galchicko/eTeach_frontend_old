import React, {Component} from 'react';
import { withNamespaces } from 'react-i18next';
import Field from '../../../../Form/components/Field';
import Button from '@material-ui/core/Button';


class WorkClassForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            __workclass: this.props.workclass
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.workclass && (nextProps.workclass !== this.props.workclass)) {
            this.state.__workclass = nextProps.workclass;
        }
    }
    handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        this.setState( prevState => {
                return {
                    __workclass : {
                        ...prevState.__workclass, [name]: value
                    }
                }
            }, () => console.log(this.state.__workclass)
        )
    }

    updateWorkClass = () => {
        if(this.isFormValid() == false){
            return;
        }
        this.props.updateWorkClass(this.state.__workclass);
    };

    isFormValid = () => {
        if(this.state.__workclass.name.trim() === ''){
            return false;
        }
        return true;
    };


    render() {

        const { t,workclass,classes , user } = this.props;

        let workclassT = this.state.__workclass;
        if(!workclassT){
            return '';
        }

        return (
            <div>
                <div className={classes.infoContainer}>
                    <div className={classes.infoTitleContainer}>
                        <div className={classes.infoTitle}>{t('infoPanel.Information')}</div>
                    </div>
                    <div className={classes.infoTable}>
                        <div className={classes.divRow}>
                            <div className={classes.leftColumn}>
                                <Field
                                    name="name"
                                    required={true}
                                    type="text"
                                    label={t('infoPanel.Name')}
                                    value={workclassT.name}
                                    classes = {classes}
                                    onChange = {this.handleChange}
                                    editable = {true} />
                            </div>
                        </div>


                    </div>
                </div>


                <Button  onClick={this.updateWorkClass} variant="contained" color="primary"  className={classes.btnSave}>
                    {t('buttons.save')}
                </Button>
            </div>
        );
    }
}

export default withNamespaces('translation')(WorkClassForm);