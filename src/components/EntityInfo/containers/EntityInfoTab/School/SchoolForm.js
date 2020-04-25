import React, {Component} from 'react';
import { withNamespaces } from 'react-i18next';
import Field from '../../../../Form/components/Field';
import Button from '@material-ui/core/Button';


class SchoolForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            __school: this.props.school
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.school && (nextProps.school !== this.props.school)) {
            this.state.__school = nextProps.school;
        }
    }
    handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        this.setState( prevState => {
                return {
                    __school : {
                        ...prevState.__school, [name]: value
                    }
                }
            }, () => console.log(this.state.__school)
        )
    }

    updateSchool = () => {
        if(this.isFormValid() == false){
            return;
        }
        this.props.updateSchool(this.state.__school);
    };

    isFormValid = () => {
        if(this.state.__school.name.trim() === ''){
            return false;
        }
        return true;
    };


    render() {

        const { t,school,classes , user } = this.props;

        var schoolT = this.state.__school;
        if(!schoolT){
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
                                    value={schoolT.name}
                                    classes = {classes}
                                    onChange = {this.handleChange}
                                    editable = {true} />
                            </div>
                            <div className={classes.rightColumn}>
                                <Field
                                    name="address"
                                    required={false}
                                    type="text"
                                    label={t('infoPanel.Address')}
                                    value={schoolT.address}
                                    classes = {classes}
                                    onChange = {this.handleChange}
                                    editable = {true} />

                            </div>
                        </div>

                        <div className={classes.divRow}>
                            <div className={classes.leftColumn}>
                                <Field
                                    name="code"
                                    required={true}
                                    type="text"
                                    label={t('infoPanel.Code')}
                                    value={schoolT.code}
                                    classes = {classes}
                                    onChange = {this.handleChange}
                                    editable = {true} />
                            </div>
                            <div className={classes.rightColumn}>

                            </div>
                        </div>
                    </div>
                </div>


                <Button  onClick={this.updateSchool} variant="contained" color="primary"  className={classes.btnSave}>
                    {t('buttons.save')}
                </Button>
            </div>
        );
    }
}

export default withNamespaces('translation')(SchoolForm);