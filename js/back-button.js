export const handleBackButton = (element, backButtonRender) => {
  const button = element.querySelector(`.back`);

  button.addEventListener(`click`, handleClick);

  function handleClick() {
    backButtonRender();
  }
};
