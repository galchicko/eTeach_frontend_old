import React, { Component } from 'react';
import './MaterialResorceContainer.scss';
import MaterialResourceList from "../MaterialResourcesList/MaterialResourcesList";


class MaterialResourceContainer extends Component {
    constructor(props) {
        super(props);

        this.printJSXToPrintArea = props.printJSXToPrintArea
    }

    render() {
        return (
            <div className="TabContentContainer">
                <div className="EntityInfoTab-pageContainer-154">
                    <div className="EntityInfoTab-outerContainer-155">
                        <div className="EntityInfoTab-infoContainer-166">

                            <div className="EntityInfoTab-infoTitleContainer-540">
                                <div className="EntityInfoTab-infoTitle-539">Resources</div>
                            </div>

                            <MaterialResourceList />

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default MaterialResourceContainer;