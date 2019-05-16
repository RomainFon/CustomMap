import React, {Component} from 'react';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {Application, Graphics, Sprite} from "pixi.js";
import {getCurentId, getPlaces} from "../../store/reducers/place";
import Popup from "../popup/popup";
import {addPoint} from "../../store/actions/place";


class Preview extends Component{

    componentDidMount() {
        this.app = new Application({ backgroundColor: 0x1099bb})
        this.refs.container.appendChild(this.app.view);
        window.addEventListener('resize', this.onResize.bind(this));

        this.map = new Sprite.from('assets/map.png');
        this.map.anchor.set(0.5, 0.5);
        this.app.stage.addChild(this.map);

        this.onResize();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {currentId} = this.props;
        this.app.stage.children.map(item => {
            if(item._placeId === currentId){
                item.clear();
                item.beginFill(0x0000FF);
                item.drawCircle(0, 0, 20);

            }
        });

    }


    onResize() {
        const {offsetWidth : w, offsetHeight : h} = this.refs.container;
        this.app.renderer.resize(w, h);

        this.map.x = w/2;
        this.map.y = h/2;
    }

    rendererPlaces(){
        this.props.places.map(item => {
            let shape = new Graphics();
            shape.beginFill(0xFF0000);
            shape.drawCircle(0, 0, 20);
            shape.x = item.posX;
            shape.y = item.posY;
            shape._placeId = item.id;
            this.app.stage.addChild(shape);
            }
        );
    }

    createPlace(e) {
        let widthMenuCustom = document.querySelector('.Custom').offsetWidth;
        let places = {
            id: Date.now(),
            name: '',
            posX: e.pageX-widthMenuCustom,
            posY: e.pageY,
            active: true
        };
        let id = places.id;
        const { dispatch } = this.props;
        this.downTimer = setTimeout(function() {
            dispatch(addPoint(places, id));
            document.querySelector('.Popup').classList.add('Popup-active');
        }, 1000);
    }

    stopCreatedPlace(){
        clearTimeout(this.downTimer);
    }

    render(){
        this.rendererPlaces();
        return(
            <div className="Preview" ref={"container"} onMouseDown={(e) => this.createPlace(e)} onMouseUp={() => this.stopCreatedPlace()}>
                <Popup/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    places: getPlaces(state),
    currentId: getCurentId(state)
});

const enhance = compose(connect(mapStateToProps));

export default enhance(Preview);

