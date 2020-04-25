import React, {Component} from 'react';
import { withNamespaces } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Field from '../../Form/components/Field';
import TextArea from '../../Form/components/TextArea';
import DateField from '../../Form/components/DateField';
import FullScreenDialog from '../../Dialog/FullScreenDialog';
import {isWorkClass, isStudent} from '../../../consts/entityTypes';
import {parseEntityPath} from '../../EntityList/helpers'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

    root: {
        flexGrow: 1,
        height: "100%",
        padding: 25
    },
    rightPanel: {
        borderLeft: "solid 1px #CCCCCC",
        paddingLeft: "35px !important",
        marginLeft: 35
    },

    textField: {
        marginTop: 0
    },

    label: {
        display: 'table-cell',
        minWidth:100

    },

    value: {
        display: 'table-cell',
        fontSize: 12
    },

    additionalInformationInput: {
        fontSize: 12,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottom: 'none'
    },
    additionalInformation: {
        backgroundColor: '#FFFFFF',
        width:'100%',
        borderBottom: 'none'

    },
    nameErrorInfoTab: {
        marginTop: '-3px !important',
        marginLeft: '10px !important'
    }

});


class PostAssignmentBtn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            __assignment: {
                "title":"",
                "topic": "",
                "points": 100,
                "instructions":"",
                "dueDate":null
            }
        }
    }

    handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        this.setState( prevState => {
                return {
                    __assignment : {
                        ...prevState.__assignment, [name]: value
                    }
                }
            }
        )
    }
    handleDateChange = (name,value) => {
        this.setState( prevState => {
                return {
                    __assignment : {
                        ...prevState.__assignment, [name]: value
                    }
                }
            }
        )
    }

    createAndPostAssignment = () => {
        if(this.isFormValid() === false){
            return;
        }
        const isWorkClassEntity = isWorkClass(this.props.selectedEntity.type);
        const isStudentEntity = isStudent(this.props.selectedEntity.type);

        if(isWorkClassEntity){
            this.props.createAndPostToWorkClassAssignment(this.state.__assignment,this.props.selectedEntity.id);
        }else if(isStudentEntity){
            let workclassId = parseEntityPath(this.props.selectedEntity.path).workclassId;
            this.props.createAndPostToStudentAssignment(this.state.__assignment,workclassId,this.props.selectedEntity.id);
        }

    };

    isFormValid = () => {
        if(this.state.__assignment.title.trim() === ''){
            return false;
        }
        return true;
    };
    onSave = ()=>{
        this.createAndPostAssignment();
    }

    onCancel = ()=>{
    }

    renderForm=()=>{
        const { t, classes,selectedEntity} = this.props;

        if(!selectedEntity){
            return;
        }
        let assignment = this.state.__assignment;
        return (
            <Grid className={classes.root} container  spacing={2}>
                <Grid key="leftItem" item xs>
                    <Field
                        name="title"
                        required={true}
                        type="text"
                        label={t('assignment.form.title')}
                        value={assignment.title}
                        classes = {classes}
                        onChange = {this.handleChange}
                        editable = {true}
                        fullWidth ={true} />

                    <Field
                        name="topic"
                        required={false}
                        type="text"
                        label={t('assignment.form.topic')}
                        value={assignment.topic}
                        classes = {classes}
                        onChange = {this.handleChange}
                        editable = {true}
                        fullWidth ={true}/>

                    <TextArea
                        name="instructions"
                        label={t('assignment.form.instructions')}
                        value={assignment.instructions}
                        onChange={this.handleChange}
                        classes = {classes}
                        rows = "5"
                        editable = {true}
                        fullWidth ={true}/>
                </Grid>
                <Grid key="rightItem" item className={classes.rightPanel} xs={3}>
                    <Field
                        name="for"
                        required={true}
                        type="text"
                        label={t('assignment.form.for')}
                        value={selectedEntity.name}
                        classes = {classes}
                        editable = {false}
                        fullWidth ={true} />
                    <DateField
                        name="dueDate"
                        required={false}
                        label={t('assignment.form.due')}
                        value={assignment.dueDate}
                        onChange={this.handleDateChange}
                        classes = {classes}
                        editable = {true} />
                </Grid>
            </Grid>
        );
    }

    render() {
        const { t, classes, btnLabel, wTitle, children  } = this.props;

        return (
            <FullScreenDialog
                btnLabel={t('assignment.postBtn')}
                wTitle={t('assignment.postAssignmentWindowTitle')}
                onSave={this.onSave}
                onCancel={this.onCancel}
                >
                {this.renderForm()}
            </FullScreenDialog>
        );
    }
}

export default withNamespaces('translation')(withStyles(styles)(PostAssignmentBtn));
