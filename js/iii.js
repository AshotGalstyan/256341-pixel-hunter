// import IntroView from './intro-view.js';
// import renderScreen from '../../utilites.js';
// import greeting from '../greeting/greeting.js';

const intro = () => {

  const render = (template) => {
    const wrapper = document.createElement(`div`);
    wrapper.innerHTML = template.trim();
    return wrapper;
  };

  const mainElement = document.querySelector(`#main`);
  mainElement.innerHTML = ``;

  mainElement.appendChild(render(`<h1>Ara</h1>`));
  /*
  const intro = new IntroView();

  intro.onClick = () => {
    intro.unbind();
    // renderScreen(greeting);
  };
  */
  // renderScreen(intro);
};

export {intro};
