import {connectRouter} from "connected-react-router";
import {combineReducers} from 'redux'
import {text} from './text';
import {place} from './place';

export default (history) => combineReducers({
    text,
    place,
    router: connectRouter(history)
})