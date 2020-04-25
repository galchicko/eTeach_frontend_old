import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import MaterialResourceList from "../MaterialResourcesList/MaterialResourcesList";
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';


class MaterialResourceCardContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {expanded: false};

        this.handleExpandClick = () => {
            this.setState({expanded: !this.state.expanded});
            console.log(this.state.expanded);
        };
    }

    render() {
        return (
            <Card>
                <CardHeader
                    action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
                    title="Resources"
                />
                <CardContent>
                    <MaterialResourceList printJSXToPrintArea={this.props.printJSXToPrintArea} />
                </CardContent>
                <CardActions disableSpacing>
                    <Typography>New Resource</Typography>
                    <IconButton onClick={this.handleExpandClick} edge="end">
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        New Resource Form Here
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}


export default MaterialResourceCardContainer;