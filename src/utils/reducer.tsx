export const SHOWS_STATES = {
  RELEASE_ORDER: "release-order",
  BOX_OFFICE: "box_office",
  CHRONOLOGY: "chronology",
  DURATION: "duration",
  PHASE: "phase",
  SEARCH: "search",
  RESET: "reset",
};

// initial Show State
export const initialState = null;

// A Method for updating show state
export const reducerFunc = (showState, action) => {
  switch (action) {
    case SHOWS_STATES.RELEASE_ORDER:
      return (showState = SHOWS_STATES.RELEASE_ORDER);

    case SHOWS_STATES.CHRONOLOGY:
      return (showState = SHOWS_STATES.CHRONOLOGY);

    case SHOWS_STATES.BOX_OFFICE:
      return (showState = SHOWS_STATES.BOX_OFFICE);

    case SHOWS_STATES.DURATION:
      return (showState = SHOWS_STATES.DURATION);

    case SHOWS_STATES.PHASE:
      return (showState = SHOWS_STATES.PHASE);

    case SHOWS_STATES.SEARCH:
      return (showState = SHOWS_STATES.SEARCH);

    case SHOWS_STATES.RESET:
      return (showState = SHOWS_STATES.RESET);
    default:
      return showState;
  }
};
