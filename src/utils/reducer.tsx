export const SHOWS_STATES = {
  RELEASE_ORDER: "release-order",
  BOX_OFFICE: "box_office",
  PHASE: "phase",
  RESET: "reset",
};

// initial Show State
export const initialState = null;

// A Method for updating show state
export const reducerFunc = (showState, action) => {
  switch (action) {
    case SHOWS_STATES.RELEASE_ORDER:
      return (showState = SHOWS_STATES.RELEASE_ORDER);

    case SHOWS_STATES.BOX_OFFICE:
      return (showState = SHOWS_STATES.BOX_OFFICE);

    case SHOWS_STATES.PHASE:
      return (showState = SHOWS_STATES.PHASE);

    case SHOWS_STATES.RESET:
      return (showState = SHOWS_STATES.RESET);
    default:
      return showState;
  }
};
