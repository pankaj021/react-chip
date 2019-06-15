import * as actions from './actionTypes';

export function initializeStoreWithData(data) {
    return {
        type: actions.INITIALIZE_STORE,
        payload: data
    }
}

export function addItem(id) {
    return {
        type: actions.ADD_ITEM,
        payload: id
    }
}

export function deleteItem(id) {
    return {
        type: actions.DELETE_ITEM,
        payload: id
    }
}

export function filterSearch(text) {
    return {
        type: actions.FILTER_SEARCH,
        payload: text
    }
}
