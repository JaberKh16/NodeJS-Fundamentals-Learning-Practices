// working with process global object
process.stdin.on('data', (data) => {
    process.stdout.write(`Writtten: ${data}\n`);
    process.on('exit', () => {
        process.exit();
        console.log('Exited');
    })
})

// excercise-1
const num = Math.floor(Math.random() * 10) + 1;
process.stdout.write('Guess a number 1-10?\n');
process.stdin.on('data', data => {
  let guess = data;
  process.stdout.write(`Your guess was ${guess}`);
  if (guess == num) {
    process.stdout.write(`Correct you guessed ${num}\n`);
    process.exit();
  }
  else {
    process.stdout.write(`Wrong Guess of ${guess}`);
  }
});