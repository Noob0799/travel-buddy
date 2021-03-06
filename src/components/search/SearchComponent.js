import React, { Component, Fragment } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from "@material-ui/core/styles";
import data from './city.json';
import './SearchComponent.css';
import citiesStore from '../../reducer/citiesReducer';


const useStyles = (theme) => ({
    root: {
        backgroundColor: "white",
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: '5px solid lightgrey',
              borderRadius: "0",
              boxShadow: "5px 5px 10px grey"
            },
            '&:hover fieldset': {
                border: '5px solid lightgrey',
                borderRadius: "0",
              },
            '&.Mui-focused fieldset': {
              border: '5px solid lightgrey',
              borderRadius: "0",
            },
        },
    },
    popupIndicator: {
        paddingLeft: "5px",
        paddingTop: "0",
        color: "black"
    },
    clearIndicator: {
        paddingTop: "0",
        color: "black"
    },
    popupIndicatorOpen: {
        transform: "scaleX(1)"
    },
    paper: {
        marginTop: "0",
        border: "5px solid lightgrey",
        backgroundColor: "lightgrey",
        borderRadius: "0",
    },
    option: {
        borderBottom: "1px solid white",
        padding: "10px"
    },
    tag: {
        borderRadius: "0",
        color: "grey",
        fontWeight: "500",
        fontSize: "15px",
        '& .MuiSvgIcon-root': {
            color: "black"
        }
    }
});

const svg = () => {
    return (
        <SvgIcon fontSize="large">
            <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
        </SvgIcon>
    );
}

//Component to search for cities
class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            citiesData: [],
            selectedCities: []
        };
    } 

    componentDidMount() {
        this.unsubscribe = citiesStore.subscribe(() => this.handleStateChange(citiesStore)); //subscription to store
        this.setState({
            citiesData: data.cities,
            selectedCities: citiesStore.getState().selectedCities
        })
    }

    //callback to handle change in redux store
    handleStateChange = (store) => {
        this.setState({
            selectedCities: store.getState().selectedCities
        });
    }

    //function to update selected cities in redux store
    handleChange = (event,selectedCities) => {
        citiesStore.dispatch({type: 'UPDATE_CITIES', cities: selectedCities});
    }

    render() {
        let optionsData = [];
        if(this.state.citiesData.length>0) {
            optionsData = [...this.state.citiesData];
        }
        const {classes} = this.props;
        return (
            <Fragment>
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={optionsData}
                    value={this.state.selectedCities}
                    getOptionSelected={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => option.name}
                    filterSelectedOptions
                    classes={{
                        popupIndicator: classes.popupIndicator,
                        clearIndicator: classes.clearIndicator,
                        popupIndicatorOpen: classes.popupIndicatorOpen,
                        listbox: classes.listbox,
                        paper: classes.paper,
                        option: classes.option,
                        tag: classes.tag
                    }}
                    popupIcon={svg()}
                    onChange={(event,value) => {
                        this.handleChange(event,value);
                    }}
                    renderInput={(params) => {
                        return <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Cities"
                            classes={{
                                root: classes.root,
                                notchedOutline: classes.notchedOutline,
                                focused: classes.focused,
                            }}
                        />
                    }}
                />
            </Fragment>
        )
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
}

export default withStyles(useStyles)(SearchComponent);