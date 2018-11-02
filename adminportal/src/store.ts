import { createStore } from "redux";
import { combineReducers } from "redux";
import layoutReducer from "./Containers/Layout/reducer";
import { IAppState } from "./state";

const rootReducer = combineReducers<IAppState>({ layout: layoutReducer });
export default createStore(rootReducer);
