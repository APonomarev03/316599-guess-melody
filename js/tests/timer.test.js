// import {assert} from "chai";
//
// describe(`Check timer changer`, () => {
//   it(`should call tickCallback three times`, () => {
//     let tickCalls = 0;
//     const timer = createTimer(10, () => tickCalls++, () => () => {});
//     timer.tick();
//     timer.tick();
//     timer.tick();
//     assert.equal(timer.time, 7);
//     assert.equal(tickCalls, 3);
//   });
//   it(`should call endCallback`, () => {
//     let endCalls = 0;
//     const timer = createTimer(3, () => {}, () => endCalls++);
//     timer.tick();
//     timer.tick();
//     timer.tick();
//     assert.equal(timer.time, 0);
//     assert.equal(endCalls, 1);
//   });
// });
