import { OPEN_MODAL, CLOSE_MODAL} from '../actions/modalActions';
import { Map } from 'immutable';

interface ModalState {
  modalType: string,
  modalOpen: boolean,
  modalObject: {message: string},
}

export const initialState = new (Map as any)({
  modalType: '',
  modalOpen: false,
  modalObject: {message: 'this is a message'},
});

// @ts-ignore
const modalReducer = (state: Map = initialState, action) => {
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