import { ProfileState, UPDATE_PROFILE, ProfileActionsTypes } from './types';

export default function updateProfile(newProfile: ProfileState): ProfileActionsTypes {
  return {
    type: UPDATE_PROFILE,
    payload: newProfile,
  };
}
