export interface ILayoutState {
  isNavMenuVisible: boolean;
}

const initialState: ILayoutState = {
  isNavMenuVisible: false
};

export enum LAYOUT_ACTION {
  HIDE_NAV_MENU = "HIDE_NAV_MENU",
  SHOW_NAV_MENU = "SHOW_NAV_MENU",
  TOGGLE_NAV_MENU = "TOGGLE_NAV_MENU"
}

export default function(state = initialState, action: { type: LAYOUT_ACTION }) {
  switch (action.type) {
    case LAYOUT_ACTION.HIDE_NAV_MENU:
      return {
        ...state,
        isNavMenuVisible: false
      };

    case LAYOUT_ACTION.SHOW_NAV_MENU:
      return {
        ...state,
        isNavMenuVisible: true
      };

    case LAYOUT_ACTION.TOGGLE_NAV_MENU:
      return {
        ...state,
        isNavMenuVisible: !state.isNavMenuVisible
      };

    default:
      return state;
  }
}
