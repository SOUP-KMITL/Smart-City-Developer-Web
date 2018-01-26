const initialState = {
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'UPDATE':
      state = action.payload
      break;
    default:
  }
  return state;
}


export default reducer;
