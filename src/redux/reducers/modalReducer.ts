import { OPEN_MODAL, CLOSE_MODAL} from '../actions/modalActions';
import Immutable from 'immutable';

export const initialState = new Immutable.Map({
  modalType: '',
  modalOpen: false,
  modalObject: {message: 'this is a message'},
});

const modalReducer = (state = initialState, action) => {
  let payload = action.payload;
  switch (action.type) {
    case OPEN_MODAL:
      return state.set('modalType', payload.type)
                  .set('modalObject', payload.modalObject)
                  .set('modalOpen', true);
    case CLOSE_MODAL:
      return state.set('modalType', null)
                  .set('modalObject', null)
                  .set('modalOpen', false);
    default:
      break
  }
  return state;
}

export default modalReducer