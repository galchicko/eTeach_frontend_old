import React, {Component} from 'react';
import './MaterialResourceTowerItem.scss';


class MaterialResourceTowerItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            href: props.href
        }
    }

    render() {
        return (
            <div className="tower-container">
                <div className="tower-title selected">
                    <div className="status" />
                    {this.state.title}
                    <div className="arrow-container">
                        <span className="not-collapsible collapse-arrow arrow-up">&gt;</span>
                    </div>
                </div>
            </div>
        );
    }
}


export default MaterialResourceTowerItem;