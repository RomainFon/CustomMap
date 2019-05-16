export const UPDATE_PLACES = 'UPDATE_PLACES';
export const UPDATE_NAME = 'UPDATE_NAME';
export const ADD_POINT = 'ADD_POINT';
export const UPDATE_CURRENTID = 'UPDATE_CURRENTID';

export const updatePlaces = (places) => ({
    type: UPDATE_PLACES,
    places
});

export const addPoint = (places, id) => ({
    type: ADD_POINT,
    places,
    id
});

export const updateName = (id, name) => ({
    type: UPDATE_NAME,
    id,
    name
});

export const updateCurentId = (id) => ({
    type: UPDATE_CURRENTID,
    id
});

export const fetchPlaces = () => dispatch => {
    return fetch('/json/places.json')
        .then(response => response.json())
        .then(json => {
            dispatch(updatePlaces(json))
        })
};