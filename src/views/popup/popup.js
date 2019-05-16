import React, {Component} from 'react';

import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {getCurentId} from "../../store/reducers/place";
import {updateName} from "../../store/actions/place";


class Popup extends Component{

    savePlace(){
        const {dispatch, currentId} = this.props;
        let name = document.querySelector(".input-popup-name").value;
        dispatch(updateName(currentId, name));
        document.querySelector('.Popup').classList.remove('Popup-active');
    }

    render(){
        return(
            <div className="Popup">
                <div className="Popup__header">
                    <h2>Ajouter un lieu</h2>
                </div>
                <div className="Popup__content">
                    <input className={"input-popup-name"} type={"text"} />
                    <button onClick={() => this.savePlace()}>Valider</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentId: getCurentId(state),
});

const enhance = compose(connect(mapStateToProps));

export default enhance(Popup);

