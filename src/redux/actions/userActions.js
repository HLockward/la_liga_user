import * as types from "./actionTypes";
import * as userApi from "../../api/userApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadUserSuccess(users) {
  return { type: types.LOAD_COURSES_SUCCESS, users };
}

export function createUserSuccess(user) {
  return { type: types.CREATE_COURSE_SUCCESS, user };
}

export function updateUserSuccess(user) {
  return { type: types.UPDATE_COURSE_SUCCESS, user };
}

export function deleteUserOptimistic(user) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, user };
}

export function loadUsers() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return userApi
      .getUsers()
      .then(users => {
        console.log(users)
        dispatch(loadUserSuccess(users.data));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveUser(user) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return userApi
      .saveUser(user)
      .then(savedUser => {
        user.id
          ? dispatch(updateUserSuccess(savedUser))
          : dispatch(createUserSuccess(savedUser));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteUser(user) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteUserOptimistic(user));
    return userApi.deleteUser(user.id);
  };
}
