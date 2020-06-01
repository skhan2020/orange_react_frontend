import { OPEN_MODAL, CLOSE_MODAL} from '../actions/modalAction';

export const initialState = () => ({
  modalType: null,
  modalOpen: false,
})

const modalReducer = (state = initialState(), action) => {
  let payload = action.payload;
  switch (action.type) {
    case OPEN_MODAL:
      state = {
        ...state,
        modalType: payload.type,
        modalOpen: true,
      }
      break;
      case CLOSE_MODAL:
        state = {
          ...state,
          modalType: null,
          modalOpen: false,
        }
      break;
    default:
      break
  }
  return state;
}

export default modalReducer