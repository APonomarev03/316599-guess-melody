const main = document.querySelector(`.app`);
export const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};

export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};
