export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

// @ts-ignore
export function showModal(value, modalElement: { message: string; } | null = null) {
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
