import {ADD_POINT, UPDATE_PLACES, UPDATE_NAME, UPDATE_CURRENTID} from "../actions/place";

const initialPlace = {items : [], currentId : ''};

const place = (state = initialPlace, action) => {
    switch (action.type) {
        case UPDATE_PLACES :
            return {
                ...state,
                items : [...action.places]
            };
        case UPDATE_CURRENTID :
            return {
                ...state,
                currentId : action.id
            };
        case ADD_POINT :
            console.log(action.places);
            return {
                ...state,
                currentId : action.id,
                items : [...state.items, action.places]
            };
        case UPDATE_NAME :
            return {
                ...state,
                items: state.items.map(item =>{
                    if(item.id === action.id){
                        item.name = action.name
                    }
                    return item;
                })
            };
        default:
            return state
    }
};

export const getPlaces = state => state.place.items;
export const getCurentId = state => state.place.currentId;

export {place}