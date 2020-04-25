import React, {Component} from "react";
import './MaterialCentralComponent.scss';
import MaterialResourceContainer from '../MaterialResourceContainer/MaterialResourceContainer';


class MaterialCentralComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="CentralComponent">
                <div className="CentralComponentHeader">
                    <div className="BreadcrumbComponent">Materials</div>
                </div>
                <div className="CentralComponent--ListView">
                    <MaterialResourceContainer />
                </div>
            </div>

        );
    }
}

export default MaterialCentralComponent;