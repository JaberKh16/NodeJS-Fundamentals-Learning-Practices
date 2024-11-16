/*
    Event Loop
    ==========
    The Event Loop is the mechanism that allows Node.js to perform non-blocking I/O.
    It continuously checks if there's work to do and processes it phase by phase.

    6 Event Loop Phases (in order):
    ===============================

    Phase 1: Timers — setTimeout() and setInterval() callbacks
    Phase 2: Pending I/O — I/O callbacks deferred from previous loop iteration
    Phase 3: Idle/Prepare — internal Node.js use only
    Phase 4: Poll — retrieve new I/O events; execute I/O callbacks
    (block here if no other work pending)
    Phase 5: Check — setImmediate() callbacks
    Phase 6: Close Callbacks — close events (socket.on('close', ...))


    Between EVERY phase:
    - process.nextTick queue is fully drained first
    - Then Promise microtask queue is fully drained
    - THEN the next phase begins

    Note: This exact output order question is asked in EVERY Node.js senior interview. 
        Memorize: sync → nextTick → Promise → setImmediate → setTimeout(0). 
    And remember: process.nextTick inside a Promise runs AFTER all current promises but BEFORE the next event loop phase.
    
*/

console.log('=== SYNC START ===');

// Macrotasks (Timers phase)
setTimeout(() => console.log('7: setTimeout(0)'), 0);
setTimeout(() => console.log('8: setTimeout(100)'), 100);

// Check phase
setImmediate(() => console.log('6: setImmediate'));

// Microtasks
Promise.resolve().then(() => {
    console.log('3: Promise.then')
    // Adding nextTick INSIDE promise:
    process.nextTick(() => console.log('4: nextTick inside promise'))
});

// process.nextTick — HIGHEST priority async
process.nextTick(() => {
    console.log('2: process.nextTick 1')
    process.nextTick(() => console.log('5: nextTick inside nextTick'))
});


// OUTPUT ORDER:
// === SYNC START ===    (synchronous)
// === SYNC END ===      (synchronous)
// 2: process.nextTick 1 (nextTick queue)
// 3: Promise.then       (microtask queue)
// 4: nextTick inside promise (nextTick inserted in microtask - runs after ALL current microtasks)
// 5: nextTick inside nextTick (nextTick from nextTick - runs immediately)
// 6: setImmediate    (Check phase)
// 7: setTimeout(0)   (Timers phase)
// 8: setTimeout(100) (next Timers phase)