import React, {Component} from 'react';
import {EntityTypes, isSchool, isStudent, isWorkClass} from '../../../../consts/entityTypes';
import SchoolFormContainer from './School';
import WorkClassFormContainer from './WorkClass';
import StudentFormContainer from './Student';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    btnSave: {
        marginBottom: 20,
        textTransform: 'none',
        width: 200,
        float: 'left'
    },
    pageContainer: {
        backgroundColor: '#F8F8F8',
        width: '100%'

    },

    outerContainer: {
        padding: 20
    },
    dateAdornement: {
        padding:0
    },
    adornement:{
        marginLeft: -20
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        paddingLeft: 2,
        marginTop: 0,
        minWidth: 225
    },
    locationTable:{
        display: 'table',
        width: 'fit-content'
    },
    locationField: {
        display: 'table-cell',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        paddingLeft: 2,
        maxWidth: 100
    },
    locationFieldSep: {
        display: 'table-cell',
        width: 8,
        maxWidth: 8,
        fontSize: 21,
        paddingTop:10
    },
    dateField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        paddingLeft: 2,
        minWidth: 185
    },
    formTextLabel: {
      fontSize:  14,
       paddingLeft: 15
    },
    dense: {
        marginTop: 16,
    },
    binaryCheckBox: {
        padding: 0
    },
    infoContainer: {
        boxSizing: 'border-box',
        border: '1px solid #D4D4D4',
        backgroundColor: '#FFFFFF',
        position: 'relative',
        paddingLeft: 30,
        paddingTop: 75,
        fontSize: 12,
        textAlign: 'left',
        marginBottom:20
    },
    infoTitle: {
        fontSize: 13,
        paddingTop: 15,
        paddingLeft: 15
    },
    infoTitleContainer:{
        borderBottom: '2px solid #D6D6D6',
        height: 44,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 13
    },
    infoTable: {
        display: 'table',
        width: '100%'
    },

    divRow: {
        display: 'table-row'
    },
    divCell: {
        display: 'table-cell',
        paddingBottom: 25
    },
    leftColumn: {
        display: 'table-cell',
        paddingBottom: 25,
        paddingRight: 50,
        width: '50%',
        verticalAlign: 'top',
        minWidth: 438
    },
    rightColumn: {
        display: 'table-cell',
        paddingBottom: 25,
        paddingLeft: 50,
        width: '50%'
    },
    label: {
        display: 'table-cell',
        minWidth:100

    },
    confLabel: {
        display: 'table-cell',
        minWidth:150,
      color: '#838383'
    },

    value: {
        display: 'table-cell',
        fontSize: 12
    },

    units: {
        display: 'table-cell'
    },


    additionalInformationLabel: {

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
    },
    refreshBtnContainer: {
        float: 'right',
        top: '-25px',
        right: '-25px',
        position: 'relative'
    }

});

class EntityInfoTab extends Component {
    render() {
        if (!this.props.selectedEntity) {
            return '';
        }
        const { classes } = this.props;

        return (
            <div className={classes.pageContainer}>
                <div className={classes.outerContainer}>
                    {(isSchool(this.props.selectedEntity.type)) && (
                        <SchoolFormContainer classes={classes}/>
                    )}
                    {(isWorkClass(this.props.selectedEntity.type)) && (
                        <WorkClassFormContainer classes={classes}/>
                    )}
                    {(isStudent(this.props.selectedEntity.type)) && (
                        <StudentFormContainer classes={classes}/>
                    )}

                </div>

            </div>
        );

    }
}

export default withStyles(styles)(EntityInfoTab);