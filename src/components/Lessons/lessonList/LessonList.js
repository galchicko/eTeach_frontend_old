import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import './LessonList.scss';
import './LessonBox.scss';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import TablePaginationActionsWrapped from '../pagination/Pagination';
import TableBody from '@material-ui/core/TableBody';
import DownArrow from '@material-ui/icons/ArrowDropDown';
import UpArrow from '@material-ui/icons/ArrowDropUp';
import {formatDateForEvents} from '../../../helpers/dateHelper';
import {lessonStatuses,getLabelForLessonStatus} from '../../../consts/lessonStatuses';
import { withNamespaces } from 'react-i18next';
import TimelineComponent from '../../Timeline/TimelineComponent';
import { Collapse, Typography } from '@material-ui/core';
import {isWorkClass, isStudent} from '../../../consts/entityTypes';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 2,
        overflowX: 'auto'

    },
    table: {
        minWidth: 500
    },
    tableWrapper: {
        overflowX: 'auto'
    },
    statusFormControl: {
        border: '1px solid #E2E2E2',
        borderRadius: 20,
        padding: '0 10px',
        height: 27,
        marginLeft: -10
    },
    selectStatus: {
        fontSize: 12,
        '&:focus': {
            backgroundColor: 'transparent'
        }
    },
    selectStatusIcon: {
        fontSize: 20,
        color: '#CDCDCD',
        marginTop: 2
    },
    selectStatusMenu: {
        fontSize: 12,
        padding: '5px 10px'
    },
    fullDescription: {
        borderBottom: '1px solid rgba(224, 224, 224, 1)',
        padding: 24,
        textAlign: 'left',
        fontSize: 13,
        color: 'black'
    }
});

const getTableHeader = (t) =>{
    return [
        {name: t('lesson.form.startTime'), prop: 'startTime'},
        {name: t('lesson.form.title'), prop: 'title'},
        {name: t('lesson.form.subject'), prop: 'subject'}
    ];
};

class LessonList extends Component {

    componentWillReceiveProps (nextProps) {
        if (nextProps.lessons && nextProps.lessonToExpand && !nextProps.isLoading) {
            this.props.expandLessonFromAlerts(nextProps.lessonToExpand);
        }
    }

    renderHeader = () => getTableHeader(this.props.t).map((elem, index) => (
        <TableCell key={`${index}${elem.name}`}>
            <div className="row-wrap" onClick={() => this.props.handleSorting(elem.name)}>
                <span>{elem.name}</span>

                {this.props.sortedField === elem.name
                    ? (this.props.sortDirection === 'ascending' ?  <UpArrow/> : <DownArrow/>)
                    :  <DownArrow/>}
            </div>
        </TableCell>
    ));

    handleStatusChange = (value, id) => {
        this.props.handleStatusChange(value, id);
    };

    handleStatusClick = (e) => {
        e.stopPropagation();
    }
    
    renderStatusSelectMenu = (statuses) => {
        return statuses.map((status) => ( 
            <MenuItem classes={{ root: this.props.classes.selectStatusMenu }}
                key={status}
                value={status}>
                {getLabelForLessonStatus(status)}
            </MenuItem>)
        );
    };
    

    renderWorkClassAttended = (lesson) => {
        const {classes, user,t } = this.props;
        return (<span className={`textAttended`}>{lesson.attendedStudentsNumber}/{lesson.expectedStudentsNumber} {t('lesson.statuses.attended')} </span>);
    };
    renderStudentAttended = (lesson) => {
        const {classes, user,t } = this.props;
        return (<span className={`textAttended`}>{this.getStudentLessonStatus(lesson)} </span>);
    };

    onClick= (id) => {

    };

    getStudentLessonStatus = (lesson) => {
        const {t} = this.props;
        if(lesson.startTime && lesson.endTime){
            return lesson.attended ? t('lesson.statuses.attended') : t('lesson.statuses.missed');
        }
        return '';
    };
    getLessonStatus = (lesson) => {
        if(lesson.startTime){
            if(lesson.endTime){
                return lessonStatuses.ENDED;
            }
            return lessonStatuses.ACTIVE;
        }
        return lessonStatuses.SCHEDULED;
    };

    renderBody=()=>{
        const {lessons, classes, t,selectedEntity} = this.props;
        const isWorkClassEntity = isWorkClass(selectedEntity.type);
        const isStudentEntity = isStudent(selectedEntity.type);

        return lessons.map(lesson => {
            return(
                <TableBody key={lesson.id}>
                    <TableRow className="eventRow" onClick={() => this.onClick(lesson.id)}>
                        <TableCell component="th" scope="row" className="DeviceRow">
                            <div className="DeviceComponent">
                                {(isWorkClassEntity) && (this.renderBodyForWorkClass(lesson))}
                                {(isStudentEntity) && (this.renderBodyForStudent(lesson))}
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            );
            });
    }

    renderBodyForWorkClass = (lesson) =>  {
        const {lessons, classes, t} = this.props;
        return (
            <div className="DeviceComponent">
                <TimelineComponent
                    startAt={lesson.startTime}
                    endAt={lesson.endTime}
                    status={this.getLessonStatus(lesson)}/>
                <a className='DeviceComponent__device-info' onClick={() => this.onClick(lesson.id)}>
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                {formatDateForEvents(lesson.startTime)}
                            </Grid>
                            <Grid item xs={6}>{lesson.title}</Grid>
                            <Grid item xs={3}>{this.renderWorkClassAttended(lesson)}</Grid>
                        </Grid>
                </a>
            </div>
            );
    }

    renderBodyForStudent = (lesson) =>  {
        const {lessons, classes, t} = this.props;
        return (
            <div className="DeviceComponent">
                <TimelineComponent
                    startAt={lesson.startTime}
                    endAt={lesson.endTime}
                    attandanceIntervals={lesson.attendanceIntervals}/>
                <a className='DeviceComponent__device-info' onClick={() => this.onClick(lesson.id)}>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            {formatDateForEvents(lesson.startTime)}
                        </Grid>
                        <Grid item xs>{lesson.title}</Grid>
                        <Grid item xs={3}>{this.getStudentLessonStatus(lesson)}</Grid>
                    </Grid>
                </a>
            </div>
        );
    }

    render () {
        const {classes, count, perPage, currentPage, handleChangePage, handleChangeRowsPerPage,selectedEntity} = this.props;

        return (
            <Paper className="eventListContainer" classes={{root: classes.root}} elevation={2}>
                <Table className={classes.table}>
                    {this.renderBody()}
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={3}
                                count={count}
                                rowsPerPage={perPage}
                                page={currentPage}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActionsWrapped}/>
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
        );
    }

    componentWillUnmount () {
        this.props.collapseAllLessons();
    }
};

export default withStyles(styles)(withNamespaces('translation')(LessonList));