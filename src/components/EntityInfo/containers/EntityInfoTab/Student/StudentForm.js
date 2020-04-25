import React, {Component} from 'react';
import { withNamespaces } from 'react-i18next';
import Field from '../../../../Form/components/Field';
import Button from '@material-ui/core/Button';


class StudentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            __student: this.props.student
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.student && (nextProps.student !== this.props.student)) {
            this.state.__student = nextProps.student;
        }
    }
    handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        this.setState( prevState => {
                return {
                    __student : {
                        ...prevState.__student, [name]: value
                    }
                }
            }, () => console.log(this.state.__student)
        )
    }

    updateStudent = () => {
        if(this.isFormValid() == false){
            return;
        }
        this.props.updateStudent(this.state.__student);
    };

    isFormValid = () => {
        if(this.state.__student.name.trim() === ''){
            return false;
        }
        return true;
    };


    render() {

        const { t,student,classes , user } = this.props;

        let studentT = this.state.__student;
        if(!studentT){
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
                                    value={studentT.name}
                                    classes = {classes}
                                    onChange = {this.handleChange}
                                    editable = {true} />
                            </div>
                            <div className={classes.rightColumn}>
                            </div>
                        </div>
                    </div>
                </div>


                <Button  onClick={this.updateStudent} variant="contained" color="primary"  className={classes.btnSave}>
                    {t('buttons.save')}
                </Button>
            </div>
        );
    }
}

export default withNamespaces('translation')(StudentForm);