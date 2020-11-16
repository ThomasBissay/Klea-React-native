import {ProfileState, UPDATE_PROFILE, ProfileActionsTypes} from '../actions/types';

const initialState: ProfileState = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    gender: '',
    phoneNumber: '',
    bio: '',
    imageProfil: '',
};

export default function profileReducer(state= initialState, action: ProfileActionsTypes): ProfileState {
    switch (action.type) {
        case UPDATE_PROFILE:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
}