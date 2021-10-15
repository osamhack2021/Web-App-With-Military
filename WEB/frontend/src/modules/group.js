const CREATE = 'group/create';

const initialState = {
  members: 0,
  tags: 0,
  rank: 0,
  info: '',
};

// Reducer
export default function reducer(state = {}, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case CREATE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}

// Action Creators
export function createGroup(group) {
  return { type: CREATE, payload: group };
}
