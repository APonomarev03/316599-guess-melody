export const getArtists = (answers) => {
  const template = `
  <div class="artist">
     <input class="artist__input visually-hidden" type="radio" name="answer">
     <label class="artist__block" for="answer-1">
       <img class="artist__picture" src="http://placehold.it/134x134" alt="Пелагея">
       <span class="artist__name"></span>
     </label>
  </div>`;
  const fragment = document.createDocumentFragment();
  answers.forEach((answer) => {
    const element = document.createElement(`template`);
    element.innerHTML = template;
    element.content.querySelector(`.artist__picture`).src = answer.image;
    element.content.querySelector(`.artist__name`).textContent = answer.artist;
    element.content.querySelector(`.artist__input`).value = answer.artist;
    fragment.appendChild(element.content);
  });
  return fragment;
};
