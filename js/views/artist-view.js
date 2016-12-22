import AbstractView from './abstract-view';
import GamePresenter from '../game-presenter';
import player from './../player';

class ArtistView extends AbstractView {

  constructor(inputData) {
    super(inputData);
  }

  renderOption(index, data) {
    return `<div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="${index}" />
          <label class="main-answer" for="answer-${index}">
            <img class="main-answer-preview" src="${data.image.url} width="${data.image.width}" height="${data.image.height}">
            ${data.title}
          </label>
        </div>`;
  }

  getMarkup() {
    return `<section class="main main--level main--level-artist">
    <div class="main-wrap">
      <div class="main-timer"></div>

      <h2 class="title main-title">${this.inputData.question}</h2>
      <div class="player-wrapper"></div>
      <form class="main-list">
        ${this.inputData.answers
            .map((item, idx) => this.renderOption(idx, item))
            .join('')}
      </form>
      </div>
    </section>`;
  }


  bindHandlers() {
    const answerList = this.element.querySelector('.main-list');
    const element = this.element.querySelector('.player-wrapper');
    const del = player(element, this.inputData.src, true, true);

    answerList.addEventListener('change', (evt) => {
      const choice = evt.target;
      if (!choice.classList.contains('main-answer-r')) {
        return;
      }
      const qResult = this.inputData.answers[choice.value].isCorrect;
      del();
      GamePresenter.questionRouter(qResult);
    });
  }
}

export default (data) => new ArtistView(data);
