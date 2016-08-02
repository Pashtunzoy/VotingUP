import * as types from './actionTypes';

export function loadAllPollsSuccess(polls) {
  return { type: types.LOAD_POLLS_SUCCESS, polls};
}

export function loadAllPollsFailure(err) {
  return { type: types.LOAD_POLLS_FAILURE, err};
}

export function loadAllPolls() {
  return (dispatch, getState) => {
    return fetch(types.API_ENDPOINT)
      .then(res => {
        if (res.status >= 400) {
            throw new Error("Bad response from server");
        }
        return res.json()
      })
      .then(polls => {
        dispatch(loadAllPollsSuccess(polls));
      }).catch((err) => {
        dispatch(loadAllPollsFailure(err));
        console.log('Got error while getting comments: ', err);
      });
  }
}
