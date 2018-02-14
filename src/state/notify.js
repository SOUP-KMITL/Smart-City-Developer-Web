const initialState = () => {};

const notifyReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'INIT':
      state = action.payload
      break;
    default:
  }
  return state;
}


export default notifyReducer;
