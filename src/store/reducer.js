

import { SET_KEY, GET_KEY, REMOVE_KEY } from './actions';
import keys from "./keys";

const initialState = {};
for (const [key, value] of Object.entries(keys)) {
    initialState[value] = false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_KEY:
            return {
                ...state,
                [action.payload.key]: action.payload.value
            };

        case GET_KEY:
            return {
                ...state
            };

        case REMOVE_KEY:
            return {
                ...state,
                [action.payload]: false
            }

        default:
            return state;
    }
}

export default reducer;