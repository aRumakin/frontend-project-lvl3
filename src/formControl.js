const formControl = {
  disable: (input, button) => {
    input.setAttribute('readonly', true);
    button.setAttribute('disabled', true);
  },
  enable: (input, button) => {
    input.removeAttribute('readonly');
    button.removeAttribute('disabled');
  },
};

export default formControl;
