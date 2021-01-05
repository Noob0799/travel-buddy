import React, { Component, Fragment } from 'react';
import citiesStore from '../../reducer/citiesReducer';
import './Cities.css';
class Cities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCities: []
        };
    }

    componentDidMount() {
        citiesStore.subscribe(() => this.handleStateChange(citiesStore));
    }

    handleStateChange = (store) => {
        this.setState({
            selectedCities: store.getState().selectedCities
        });
    }

    render() {
        let displayData = [];
        if(this.state.selectedCities.length>0) {
            displayData = [...this.state.selectedCities];
        }
        return (
            <Fragment>
                <div className="cities-container" id="cities-container">
                    {
                        displayData.map(obj => {
                            return (
                                <div key={obj.id} id={obj.id} className="cities-items">{obj.name}</div>
                            );
                        })
                    }
                </div>
            </Fragment>
        )
    }
}

export default Cities;
