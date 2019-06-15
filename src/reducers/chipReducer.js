import * as actions from '../actions/actionTypes';

const initialState = {
    filteredList: [],
    selectedList: [],
    data: [],
}

export function chipReducer(state = initialState, action) {
    switch (action.type) {
        case actions.INITIALIZE_STORE : 
            return { ...state, filteredList: action.payload, data: action.payload};
        case actions.ADD_ITEM : 
            return reArrangeAfterAdding(state, action.payload);
        case actions.DELETE_ITEM :
            return reArrangeAfterDeleting(state, action.payload);
        case actions.FILTER_SEARCH : 
            return filterBasedOnUserInput(state, action.payload);
        default:
            return state;
    }
}

function reArrangeAfterAdding(state, id) {
    let selectedList = [...state.selectedList];
    let filteredList = getDifferenceList(state).filter( item => {
        if(item.id === id) {
            selectedList.push(item);
            return false;
        }
        return true;
    })
    return {...state, selectedList, filteredList};
}

function reArrangeAfterDeleting(state, id) {
    let filteredList = [...state.filteredList];
    let selectedList = state.selectedList.filter( item => {
        if(item.id === id) {
            filteredList.push(item);
            return false;
        }
        return true;
    })
    return {...state, selectedList, filteredList};
}

function getDifferenceList(state) {
    return state.data.filter( item => {
        for (let index = 0; index < state.selectedList.length; index++) {
            const selectedItem = state.selectedList[index];
            if(item.id === selectedItem.id) return false;
        }
        return true;
    });
}

function filterBasedOnUserInput(state, text) {
    let diffrenceList = getDifferenceList(state);
    if(!text) return {
        ...state,
        filteredList: diffrenceList,
    };
    return {
        ...state,
        filteredList: diffrenceList.filter( item => item.name.toUpperCase().includes(text.toUpperCase()))
    }
}