import { LtcActionTypes } from '../types';

const initialState = {
    list: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LtcActionTypes.GET_DATA:
            return {
                ...state,
                list: action.list
            };
        default:
            return state;
    }
};
