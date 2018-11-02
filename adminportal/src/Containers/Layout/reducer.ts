import { ILayoutAction, LAYOUT_ACTION_TYPE } from "./actions";
import { ILayoutState } from "./state";

const INIT_STATE: ILayoutState = {
  isNavMenuVisible: false
};

export default function(state = INIT_STATE, action: ILayoutAction) {
  switch (action.type) {
    case LAYOUT_ACTION_TYPE.TOGGLE_NAV_MENU:
      return {
        ...state,
        isNavMenuVisible: !state.isNavMenuVisible
      };

    default:
      return state;
  }
}
