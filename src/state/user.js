const initialState = {
  data: {
    access_token: undefined,
    userId: undefined
  }
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'UPDATE':
      state = {
        ...state,
        test: 'gg'
      }
      break;
    default:
  }
  return state;
}


export default reducer;
