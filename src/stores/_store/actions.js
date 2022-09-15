export const SET_KEY = "SET_KEY";
export const GET_KEY = "GET_KEY";
export const REMOVE_KEY = "REMOVE_KEY";

export function setKey (key, value) {
    return {
        type: SET_KEY,
        payload: {
            key: key,
            value: value
        }
    }
}

export function setStringifiedKey(key, value) {
    return {
        type: SET_KEY,
        payload: {
            key: key,
            value: value
        }
    }
}

export function getKey (key) {
    return {
        type: GET_KEY,
        payload: key
    }
}

export function removeKey (key) {
    return {
        type: REMOVE_KEY,
        payload: key
    }
}