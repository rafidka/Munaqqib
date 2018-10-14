const initialState = {
  services: [],
  isLoading: false
};

enum SERVICES_PAGE_ACTIONS {
  LOAD_SERVICES_REQUEST
}

export default function(state = initialState, action: SERVICES_PAGE_ACTIONS) {
  switch (action) {
    case SERVICES_PAGE_ACTIONS.LOAD_SERVICES_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    default:
      return state;
  }
}
