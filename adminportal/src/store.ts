import { createStore } from "redux";
import { combineReducers } from "redux";
import layoutReducer from "./Containers/Layout/reducer";
import { ILayoutState } from "./Containers/Layout/reducer";

export interface IMunaqqibState {
  layout: ILayoutState;
}

const initialState: IMunaqqibState = {
  layout: {
    isNavMenuVisible: false
  }
};

const rootReducer = combineReducers<IMunaqqibState>({ layout: layoutReducer });
export default createStore(rootReducer, initialState);
