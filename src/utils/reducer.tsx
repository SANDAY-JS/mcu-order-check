export const SHOWS_STATES = {
  RELEASE_ORDER: "release-order",
  RESET: "reset",
};

// initial Show State
export const initialState = null;

// A Method for updating show state
export const reducerFunc = (showState, action) => {
  switch (action) {
    case SHOWS_STATES.RELEASE_ORDER:
      return (showState = SHOWS_STATES.RELEASE_ORDER);

    case SHOWS_STATES.RESET:
      return (showState = SHOWS_STATES.RESET);
    default:
      return showState;
  }
};
