import {createStore, applyMiddleware} from "redux";
import {thunk} from "redux-thunk";
import rootReducer from "./reducer"


// const compos = composed(window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk))
const store = createStore(rootReducer,applyMiddleware(thunk));

export default store;