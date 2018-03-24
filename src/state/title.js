const initialState = 'Smart City Platform';

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'UPDATE':
      state = action.payload + ' | Smart City Platform'
      break;
    default:
  }
  return state;
}


export default reducer;
