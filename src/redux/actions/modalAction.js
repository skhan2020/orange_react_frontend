export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export function showModal(value) {
  return {
    type: OPEN_MODAL,
    payload: {
      type: value,
    }
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  };
}
