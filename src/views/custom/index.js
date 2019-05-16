import React, {Component} from 'react';

import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {getPlaces} from "../../store/reducers/place";
import { updateCurentId} from "../../store/actions/place";


class Custom extends Component{

    rendererPlaces(){
        const {dispatch} = this.props;
        let places = this.props.places.map(item =>
            <div key={item.id} className={"Custom__item"} onClick={ () => dispatch(updateCurentId(item.id))}>
                <h2>{item.name}</h2>
                <h4>{item.posX + " - " + item.posY}</h4>
            </div>
        );
        return places;
    }

    render(){
        return(
            <div className="Custom">
                <h1>CustomMap</h1>
                { this.rendererPlaces() }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    places: getPlaces(state),
});

const enhance = compose(connect(mapStateToProps));

export default enhance(Custom);

