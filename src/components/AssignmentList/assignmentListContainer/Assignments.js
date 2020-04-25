import React, {Component} from 'react';
import AssignmentList from '../assignmentList/AssignmentListContainer';
import {ProgressCircle} from '../../Progress';
import './AssignmentsContainer.scss';
import AssignmentListFilter from '../assignmentListFilter/AssignmentListFilter';
import { withStyles } from '@material-ui/core/styles';
import xlsIcon from '../../../assets/xls-icon.svg';
import refreshIcon from '../../../assets/refresh.svg';
import CircleButtonComponent from '../../Button/CircleButtonComponent';


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

class Assignments extends Component {

    componentDidMount(){
        if (this.props.selectedEntity) {
            this.props.fetchAssignmentList(this.props.selectedEntity);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedEntity && this.props.selectedEntity !== nextProps.selectedEntity) {
            this.props.fetchAssignmentList(nextProps.selectedEntity);
        }
    }

    handleChangeRowsPerPage = (event) => {
        this.props.handleChangePerPage(event.target.value);
        this.props.fetchAssignmentList(this.props.selectedEntity);
    };

    handleChangePage = (event, page) => {
        this.props.handleChangePage(page);
        this.props.fetchAssignmentList(this.props.selectedEntity);
    };

    handleStatusChange = (newStatus, eventId) => {
        this.props.editAssignmentStatus(newStatus, eventId, this.props.selectedEntity);
    };

    handleSorting = (searchBy) => {
        const {sort} = this.props.filter;
        let sortDirection ='ascending';

        if(sort.sortedField === searchBy){
            sortDirection = this.changeDirection(sort.sortDirection);
        }

        this.props.handleChangeSortedField(searchBy, sortDirection);
        this.props.fetchAssignmentList(this.props.selectedEntity);
    };

    handleApplyFilter = (filter) => {
        const {date, search, status} = filter;
        this.props.handleChangeFilter(date, search, status);
        this.props.fetchAssignmentList(this.props.selectedEntity);
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
        this.props.downloadAssignments(this.props.selectedEntity);
    }
    render() {
        const {classes } = this.props;
        const { pagination, sort, search, status, date} = this.props.filter;
        const currentPage = pagination.offset / pagination.resultsPerPage;

        if (!this.props.assignments || this.props.isLoading) {
            return (
                <ProgressCircle isShown={true}/>
            );
        }
        const assignments = this.props.assignments;

        return (
            <div className="EventWrapper">
                <div className={classes.headerContainer}>
                    <div className={classes.headerContainerLeft}>
                        <AssignmentListFilter
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
                <AssignmentList
                    assignments={assignments}
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

export default withStyles(styles)(Assignments);
