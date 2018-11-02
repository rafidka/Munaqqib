export enum LAYOUT_ACTION_TYPE {
  TOGGLE_NAV_MENU = "TOGGLE_NAV_MENU"
}

export interface ILayoutAction {
  type: LAYOUT_ACTION_TYPE;
}

export function toggleNavMenu(): ILayoutAction {
  return {
    type: LAYOUT_ACTION_TYPE.TOGGLE_NAV_MENU
  };
}
