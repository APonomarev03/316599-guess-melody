import {assert} from 'chai';
import {INITIAL_STATE, countScorePlayer, showingPlayerResult, playerLivesManagement, changeLevel, createTimer} from '../modules/game-state';

describe(`player scoring`, () => {
  it(`Player answered less than 10 questions`, () => {
    assert.equal(countScorePlayer(INITIAL_STATE, [
      {currentAnswer: true, time: 30},
      {currentAnswer: true, time: 60},
      {currentAnswer: true, time: 10},
      {currentAnswer: false, time: 5},
      {currentAnswer: false, time: 120},
    ]), -1);
    assert.equal(countScorePlayer(INITIAL_STATE, [
      {currentAnswer: true, time: 30},
      {currentAnswer: true, time: 60},
      {currentAnswer: true, time: 10},
      {currentAnswer: false, time: 5},
      {currentAnswer: false, time: 120},
    ]), -1);
  });
  it(`All answers are correct`, () => {
    assert.equal(countScorePlayer(INITIAL_STATE, [
      {currentAnswer: true, time: 30},
      {currentAnswer: true, time: 60},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 50},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 30},
      {currentAnswer: true, time: 30},
    ]), 10);
  });
  it(`Number of scores there player`, () => {
    assert.equal(countScorePlayer(INITIAL_STATE, [
      {currentAnswer: true, time: 30},
      {currentAnswer: true, time: 60},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 50},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 30},
      {currentAnswer: false, time: 30},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 30},
      {currentAnswer: false, time: 30},
    ]).scores, 8);
    assert.equal(countScorePlayer(INITIAL_STATE, [
      {currentAnswer: true, time: 30},
      {currentAnswer: true, time: 60},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 50},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 30},
      {currentAnswer: false, time: 30},
      {currentAnswer: true, time: 40},
    ]).scores, 9);
    assert.equal(countScorePlayer(INITIAL_STATE, [
      {currentAnswer: true, time: 30},
      {currentAnswer: true, time: 60},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 50},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 30},
      {currentAnswer: false, time: 30},
      {currentAnswer: true, time: 40},
      {currentAnswer: true, time: 30},
      {currentAnswer: true, time: 30},
    ]).scores, 11);
  });
});

describe(`Showing player results`, () => {
  it(`Should playersStatistics not allow set non Array value`, () => {
    assert.throws(() => showingPlayerResult(1, {}), /PlayersStatistics should be of type Array/);
    assert.throws(() => showingPlayerResult(`string`, {}), /PlayersStatistics should be of type Array/);
    assert.throws(() => showingPlayerResult(undefined, {}), /PlayersStatistics should be of type Array/);
  });
  it(`player won`, () => {
    assert.equal(showingPlayerResult([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], {
      notes: 3,
      time: 60,
      scores: 10
    }), `Вы заняли 1 место из 10 игроков. Это лучше, чем у 90% игроков`);
  });
  it(`player lost - run out of time`, () => {
    assert.equal(showingPlayerResult([], {
      notes: 3,
      time: 0,
      scores: 8
    }), `Время вышло! Вы не успели отгадать все мелодии`);
  });
  it(`player lost - ran out of effort`, () => {
    assert.equal(showingPlayerResult([], {
      notes: 0,
      time: 30,
      scores: 5
    }), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
  });
});

describe(`Player lives management`, () => {
  it(`update lives count`, () => {
    assert.equal(playerLivesManagement(1).notes, 2);
    assert.equal(playerLivesManagement(2).notes, 1);
    assert.equal(playerLivesManagement(3).notes, 0);
  });
  it(`should not allow set non number value`, () => {
    assert.throws(() => playerLivesManagement([]).notes, /mistakes should be of type number/);
    assert.throws(() => playerLivesManagement({}).notes, /mistakes should be of type number/);
    assert.throws(() => playerLivesManagement(undefined).notes, /mistakes should be of type number/);
  });
});

describe(`Check level changer`, () => {
  it(`should update level of the game`, () => {
    assert.equal(changeLevel(INITIAL_STATE, 1).level.currentLevel, 1);
    assert.equal(changeLevel(INITIAL_STATE, 5).level.currentLevel, 5);
    assert.equal(changeLevel(INITIAL_STATE, 7).level.currentLevel, 7);
  });
  it(`should not allow set non number value`, () => {
    assert.throws(() => changeLevel([]), /level should be of type number/);
    assert.throws(() => changeLevel({}), /level should be of type number/);
    assert.throws(() => changeLevel(undefined), /level should be of type number/);
  });
});

describe(`Check timer changer`, () => {
  it(`should tickCallback timer and getter time`, () => {
    let tickCalls = 0;
    const timer = createTimer(10, () => tickCalls++, () => () => {});
    timer.tick();
    timer.tick();
    timer.tick();
    assert.equal(timer.time, 7);
    assert.equal(tickCalls, 3);
  });
  it(`should endCallback timer and getter time`, () => {
    let endCalls = 0;
    const timer = createTimer(0, () => {}, () => endCalls++);
    timer.tick();
    timer.tick();
    timer.tick();
    assert.equal(timer.time, 0);
    assert.equal(endCalls, 0);
  });
});
