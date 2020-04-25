import React, { Component } from 'react';
import './MaterialResorceContainer.scss';
import MaterialResourceList from "../MaterialResourcesList/MaterialResourcesList";


class MaterialResourceContainer extends Component {
    constructor(props) {
        super(props);

        this.printJSXToPrintArea = this.printJSXToPrintArea.bind(this);

        this.state = {printAreaData: ''}
    }

    printJSXToPrintArea (outputData) {
        this.setState({printAreaData: outputData})
    }

    render() {
        return (
            <div className="TabContentContainer">
                <div className="EntityInfoTab-pageContainer-154">
                    <div className="EntityInfoTab-outerContainer-155">
                        <div className="EntityInfoTab-infoContainer-166">

                            <div className="EntityInfoTab-infoTitleContainer-540">
                                <div className="EntityInfoTab-infoTitle-539"><h2>Resources</h2></div>
                            </div>

                            <div className="EntityInfoTab-infoTable-169">
                                <MaterialResourceList printJSXToPrintArea={this.printJSXToPrintArea} />
                            </div>
                        </div>

                        <div className="EntityInfoTab-infoContainer-166">
                            <div className="EntityInfoTab-infoTitleContainer-540">
                                <div className="EntityInfoTab-infoTitle-539"><h2>Print Area</h2></div>
                            </div>
                            <div className="EntityInfoTab-infoTable-169">
                                {this.state.printAreaData}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default MaterialResourceContainer;