import React, { Component } from 'react';
import './MaterialResorceContainer.scss';
import MaterialResourceCardContainer from '../MaterialResourceCardContainer/MaterialResourceCardContainer';
import MaterialPrintAreaCardContainer from '../MaterialPrintAreaCardContainer/MaterialPrintAreaCardContainer';


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

                        <MaterialResourceCardContainer printJSXToPrintArea={this.printJSXToPrintArea} />

                        <MaterialPrintAreaCardContainer printAreaData={this.state.printAreaData} />
                    </div>
                </div>
            </div>
        );
    }
}


export default MaterialResourceContainer;