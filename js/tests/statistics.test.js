import {assert} from "chai";
import {countScorePlayer, showPlayerResult, managePlayerLives, changeLevel} from "../modules/statistics";

describe(`player scoring`, () => {
  it(`should exceed the time limit`, () => {
    assert.equal(countScorePlayer([
      {currentAnswer: false, time: 30},
      {currentAnswer: false, time: 30},
      {currentAnswer: false, time: 30},
      {currentAnswer: false, time: 30},
    ]), -1);
  });
  it(`should make three mistakes`, () => {
    assert.equal(countScorePlayer([
      {currentAnswer: true, time: 310},
    ]), -1);
  });
  it(`all answers are correct and are currect time`, () => {
    assert.equal(countScorePlayer([
      {currentAnswer: true, time: 30},
      {currentAnswer: true, time: 30},
      {currentAnswer: true, time: 30},
      {currentAnswer: true, time: 30},
      {currentAnswer: true, time: 30},
      {currentAnswer: true, time: 30},
      {currentAnswer: true, time: 30},
      {currentAnswer: true, time: 30},
      {currentAnswer: true, time: 30},
      {currentAnswer: true, time: 30}
    ]), 10);
  });
});

describe(`show player results`, () => {
  it(`should playersStatistics not allow set non Array value`, () => {
    assert.throws(() => showPlayerResult(1, {}), /PlayersStatistics should be of type Array/);
    assert.throws(() => showPlayerResult(`string`, {}), /PlayersStatistics should be of type Array/);
    assert.throws(() => showPlayerResult(undefined, {}), /PlayersStatistics should be of type Array/);
  });
  it(`player won`, () => {
    assert.equal(showPlayerResult([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], {
      notes: 3,
      time: 60,
      scores: 10
    }), `Вы заняли 1 место из 10 игроков. Это лучше, чем у 90% игроков`);
  });
  it(`player lost - run out of time`, () => {
    assert.equal(showPlayerResult([], {
      notes: 3,
      time: 0,
      scores: 8
    }), `Время вышло! Вы не успели отгадать все мелодии`);
  });
  it(`player lost - ran out of effort`, () => {
    assert.equal(showPlayerResult([], {
      notes: 0,
      time: 30,
      scores: 5
    }), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
  });
});

describe(`manage player lives`, () => {
  it(`update lives count`, () => {
    assert.equal(managePlayerLives(2), 1);
    assert.equal(managePlayerLives(3), 2);
    assert.equal(managePlayerLives(1), 0);
  });
  it(`should not allow set non number value`, () => {
    assert.throws(() => managePlayerLives([]), /mistakes should be of type number/);
    assert.throws(() => managePlayerLives({}), /mistakes should be of type number/);
    assert.throws(() => managePlayerLives(undefined), /mistakes should be of type number/);
  });
});

describe(`check level changer`, () => {
  it(`should update level of the game`, () => {
    assert.equal(changeLevel(1), 2);
    assert.equal(changeLevel(5), 6);
    assert.equal(changeLevel(7), 8);
  });
  it(`not should update level negative value`, () => {
    assert.throws(() => changeLevel(-1), /level cannot be less than zero/);
    assert.throws(() => changeLevel(11), /the level can not be more than ten/);
  });
  it(`should not allow set non number value`, () => {
    assert.throws(() => changeLevel([]), /level should be of type number/);
    assert.throws(() => changeLevel({}), /level should be of type number/);
    assert.throws(() => changeLevel(undefined), /level should be of type number/);
  });
});
