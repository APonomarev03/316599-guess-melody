const main = document.querySelector(`.app`);

export const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};


