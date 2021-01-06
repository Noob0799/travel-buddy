import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import './Activities.css';

export default class Activities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activitiesData: [],
            setNumber: 9,
            scrollPos: null,
            pageNumber: 0
        };
    }

    componentDidMount() {
        this.getData(this.state.setNumber);
    }

    sortData = (data) => {
        return data.sort((a,b) => Number(a.id) - Number(b.id));
    }

    handleScroll = () => {
        const currentScrollPos = document.getElementById((this.state.setNumber*10+1).toString()).getBoundingClientRect().top;
        console.log(currentScrollPos);
        if(!this.state.scrollPos) {
            this.setState({
                scrollPos: currentScrollPos
            });
        } else {
            if(currentScrollPos > this.state.scrollPos && this.state.setNumber>0) {
                this.getData(this.state.setNumber-1);
            }
        }
    }

    getData = (set) => {
        console.log(set);
        const page = Math.floor(set/3)+1;
        if(this.state.pageNumber !== page) {
            Axios.get(`https://my-json-server.typicode.com/rivitest001/task0${page}/posts`)
            .then(response => {
                this.setState({
                    activitiesData: [...response.data,...this.state.activitiesData],
                    setNumber: set,
                    pageNumber: page
                });
            })
            .catch(error => {
                console.log({error});
            })
        } else {
            this.setState({
                setNumber: set
            });
        }
    }

    render() {
        let displayData = [];
        if(this.state.activitiesData.length>0) {
            this.state.activitiesData.forEach(obj => {
                if(Number(obj.id)>=this.state.setNumber*10+1) {
                    displayData.push(obj);
                }
            })
        }
        console.log(displayData.length);
        return (
            <Fragment>
                <div className="activities-container" id="activities-container" onScroll={this.handleScroll}>
                {
                    displayData.map(obj => {
                        return (
                            <div key={obj.id} id={obj.id} className="activities-items">{obj.activity}</div>
                        );
                    })
                }
                </div>
            </Fragment>
        )
    }
}
