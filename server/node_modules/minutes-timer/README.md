[![Build Status](https://travis-ci.org/mblenton/minutes-timer.svg?branch=master)](https://travis-ci.org/mblenton/minutes-timer)
[![codecov](https://codecov.io/gh/mblenton/minutes-timer/branch/master/graph/badge.svg)](https://codecov.io/gh/mblenton/minutes-timer)
# minutes-timer
small minutes and seconds timer, works on javascript client and server side

## Install

Install with npm:

```bash
npm install minutes-timer
```

Install with yarn:

```bash
yarn add minutes-timer
```

## Usage

```javascript
// import MinutesTimer from 'minutes-timer';
const MinutesTimer = require('minutes-timer');

// Initalize timer with start time (seconds)
// const minutesTimer = new MinutesTimer(2600);

// Initalize timer with start time (string)
// const minutesTimer = new MinutesTimer('05:45');

// Initalize timer with negative start time (string)
// const minutesTimer = new MinutesTimer('-01:05');

// Initalize timer with start time 00:00
const minutesTimer = new MinutesTimer();

// Start timer
minutesTimer.start();

setTimeout(() => {
  console.log(minutesTimer.display);
}, 5000);
  

// Add seconds (positive or negative)
minutesTimer.addSeconds(4);

console.log(minutesTimer.display);

// Pause timer
minutesTimer.pause();

// Resume timer
minutesTimer.resume();

console.log(minutesTimer.display);

// Stop timer and chage time
minutesTimer.stopAndChangeTime(2700);
```
See the `test/` folder for more examples.