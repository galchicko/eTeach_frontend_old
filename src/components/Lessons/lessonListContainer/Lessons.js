import React, {Component} from 'react';
import LessonList from '../lessonList/LessonListContainer';
import {ProgressCircle} from '../../Progress';
import './LessonsContainer.scss';
import LessonsListFilter from '../lessonListFilter/LessonListFilter';
import { withStyles } from '@material-ui/core/styles';
import {parseEntityPath} from '../../EntityList/helpers'
import xlsIcon from '../../../assets/xls-icon.svg';
import refreshIcon from '../../../assets/refresh.svg';
import CircleButtonComponent from '../../Button/CircleButtonComponent';
import {isWorkClass, isStudent} from '../../../consts/entityTypes';


const styles = theme => ({
    headerContainer: {
        display: 'flow-root'
    },
    headerContainerLeft: {
        display: 'inline-block',
        float:'left'
    },
    headerContainerRight: {
        display: 'inline-block',
        float:'right',
        marginTop: 8
    },
    rightPanel: {
        justifyContent: 'flex-end',
        display: 'flex',
        marginRight: 20
    }
});

class Lessons extends Component {

    componentDidMount(){
        if (this.props.selectedEntity) {
            this.fetchLessonList(this.props.selectedEntity);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedEntity && this.props.selectedEntity !== nextProps.selectedEntity) {
            this.fetchLessonList(nextProps.selectedEntity);
        }
    }

    fetchLessonList(entity){
        const isWorkClassEntity = isWorkClass(entity.type);
        const isStudentEntity = isStudent(entity.type);

        if(isWorkClassEntity){
            this.props.fetchWorkClassLessonList(entity.id);
        }else if(isStudentEntity){
            let workclassId = parseEntityPath(entity.path).workclassId;
            this.props.fetchStudentLessonList(workclassId,entity.id);
        }
    }

    handleChangeRowsPerPage = (event) => {
        this.props.handleChangePerPage(event.target.value);
        this.fetchLessonList(this.props.selectedEntity);
    };

    handleChangePage = (event, page) => {
        this.props.handleChangePage(page);
        this.fetchLessonList(this.props.selectedEntity);
    };

    handleStatusChange = (newStatus, eventId) => {
        this.props.editLessonStatus(newStatus, eventId, this.props.selectedEntity);
    };

    handleSorting = (searchBy) => {
        const {sort} = this.props.filter;
        let sortDirection ='ascending';

        if(sort.sortedField === searchBy){
            sortDirection = this.changeDirection(sort.sortDirection);
        }

        this.props.handleChangeSortedField(searchBy, sortDirection);
        this.fetchLessonList(this.props.selectedEntity);
    };

    handleApplyFilter = (filter) => {
        const {date, search, status} = filter;
        this.props.handleChangeFilter(date, search, status);
        this.fetchLessonList(this.props.selectedEntity);
    };

    handleRefresh = () => {
        this.handleApplyFilter(this.props.filter);
    };
    changeDirection = (direction) => {
        const invertDirection = {
            ascending: 'descending',
            descending: 'ascending'
        };

        return invertDirection[direction];
    };
    handleSave = (e) => {
        this.props.downloadLessons(this.props.selectedEntity);
    }
    render() {
        const {classes } = this.props;
        const { pagination, sort, search, status, date} = this.props.filter;
        const currentPage = pagination.offset / pagination.resultsPerPage;

        if (!this.props.lessons || this.props.isLoading) {
            return (
                <ProgressCircle isShown={true}/>
            );
        }
        const lessons = this.props.lessons;

        return (
            <div className="EventWrapper">
                <div className={classes.headerContainer}>
                    <div className={classes.headerContainerLeft}>
                        <LessonsListFilter
                            search={search}
                            date={date}
                            status={status}
                            handleApplyFilter={this.handleApplyFilter}/>
                    </div>
                    <div className={classes.headerContainerRight}>
                        <CircleButtonComponent  alt="save-csv" icon={xlsIcon} onClick={this.handleSave} />
                        <CircleButtonComponent  alt="refresh" icon={refreshIcon} onClick={this.handleRefresh} />
                    </div>
                </div>
                <LessonList
                    lessons={lessons}
                    perPage={pagination.resultsPerPage}
                    count={this.props.count}
                    currentPage={currentPage}
                    sortedField={sort.sortedField}
                    sortDirection={sort.sortDirection}
                    handleSorting={this.handleSorting}
                    handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                    handleChangePage={this.handleChangePage}
                    handleStatusChange={this.handleStatusChange}/>
            </div>
        );
    }
}

export default withStyles(styles)(Lessons);
