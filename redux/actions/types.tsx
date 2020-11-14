export const INCREMENT_COUNT = 'INCREMENT_COUNT';
export const DECREMENT_COUNT = 'DECREMENT_COUNT';

// Profile //
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export interface ProfileState {
    firstName: string
    lastName: string
    email: string
    gender: string
    address: string
    phoneNumber: string
    bio: string
    imageProfil: string
}

interface UpdateProfileAction {
    type: typeof UPDATE_PROFILE
    payload: ProfileState
}

export type ProfileActionsTypes = UpdateProfileAction;

// Mémo //