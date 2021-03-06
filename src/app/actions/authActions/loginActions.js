import * as types from '../actionTypes';

export function loginRequest() {
  return { type: types.LOGIN_REQUEST };
}

export function loginSuccess(user) {
  return { type: types.LOGIN_SUCCESS, user: user };
}

export function loginFailure(err) {
  return { type: types.LOGIN_FAILURE, err };
}

export function loginUser(creds) {
  let config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  };
  return (dispatch, getState) => {
    dispatch(loginRequest());
    return fetch(`${types.AUTH_ENDPOINT}/authenticate`, config)
    .then(res => res.json() )
    .then(user => {
      if(!user.success) {
        dispatch(loginFailure(user.message));
      } else {
        localStorage.setItem('JWT', user.token);
        localStorage.setItem('user_id', user.data._id);
        dispatch(loginSuccess(user));
      }
    })
    .catch(err => {
      console.log('Error occured');
      dispatch(loginFailure(err));
    });
  }
}
