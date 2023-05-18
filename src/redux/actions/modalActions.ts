export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export function showModal(value, modalElement = null) {
  return {
    type: OPEN_MODAL,
    payload: {
      type: value,
      modalObject: modalElement,
    }
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  };
}
