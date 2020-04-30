import React, {Component} from 'react';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ResourceListComponent from './ResourceListComponent';
import ResourceCreate from './ResourceCreate';
import {toggleResourceCardExpansion} from '../store/actions';
import {connect} from 'react-redux';
import FormComponent from './EditResourceCollapseForm';


const styles = (theme) => ({
    root: {
        padding: 20,
    },
    card: {
        padding: 10
    },
    header: {
        borderBottom: 'solid 1px coral'
    }
});

const mapStateToProps = (state) => ({
    expanded: state.material.resourceCardExpansion
})



class ResourceListContainer extends Component {
    constructor(props) {
        super(props);

        // Methods
        this.getCardActionIcon = () => {
            return (this.props.expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />);
        }
    }


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardHeader className={classes.header} title="List" />
                    <CardContent className={classes.content}>
                        <ResourceListComponent />
                    </CardContent>
                    <CardActionArea onClick={() => this.props.toggleResourceCardExpansion()}>
                        <IconButton>
                            {this.getCardActionIcon()}
                        </IconButton>
                        <Typography variant="label">New Resource</Typography>
                    </CardActionArea>
                    <Collapse in={this.props.expanded}>
                        <CardHeader className={classes.header} title="Create New Item" />
                        <CardContent className={classes.content}>
                            <FormComponent />
                        </CardContent>
                    </Collapse>
                </Card>
            </div>
        );
    }
}


export default connect(
    mapStateToProps,
    { toggleResourceCardExpansion }
)(withStyles(styles, {withTheme: true})(ResourceListContainer));