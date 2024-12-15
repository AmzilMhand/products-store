import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import productReducer from './Config/reducer';

const store = createStore(productReducer, compose(applyMiddleware(thunk)));

export default store;

