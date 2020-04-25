import React, {Component} from 'react';
import {ProgressCircle} from '../../Progress';
import { withNamespaces } from 'react-i18next';
import {isWorkClass, isStudent} from '../../../consts/entityTypes';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PostAssignmentBtn from '../../Assignment/containers/PostAssignmentContainer'

class EntityActions extends Component {

    renderNewAssignmentButton = () => {
        const {t} = this.props;
        const isWorkClassEntity = isWorkClass(this.props.selectedEntity.type);
        const isStudentEntity = isStudent(this.props.selectedEntity.type);
        if (!isWorkClassEntity && !isStudentEntity) {
            return;
        }
        return (
            <Grid item>
                <PostAssignmentBtn />
            </Grid>
        );
    }

    renderMeetNowLink = () => {
        const {t} = this.props;
        const isWorkClassEntity = isWorkClass(this.props.selectedEntity.type);

        if (!isWorkClassEntity){
            return (<div></div>);
        }

        return (
            <Grid item>
                <Button variant="outlined" color="primary" href="https://meet.gigaclass.com" target="_blank">
                    {t('buttons.meetNow')}
                </Button>
            </Grid>
        );
    }
    render() {
        if (!this.props.selectedEntity) {
            return (
                (<ProgressCircle isShown={true}/>)
            );
        }
        return (
                <div>
                    <Grid container spacing={1}>
                        {this.renderNewAssignmentButton()}
                        {this.renderMeetNowLink()}
                    </Grid>
                </div>
        );

    }
}

export default withNamespaces('translation')(EntityActions);