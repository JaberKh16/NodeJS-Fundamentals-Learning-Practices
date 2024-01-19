/*
    NodeJS Module Concept - 'event' Module
    ======================================
    NodeJS provides a module to work with the events on
    the serverside as well.

    Methods Of 'event' Module
    -------------------------
    on() --> listen for the event
    emit() --> emit the event

*/

const EventEmitter = require('events');
const customEventEmitter = new EventEmitter();

customEventEmitter.on('response', () =>{
    console.log('data received');
})

customEventEmitter.emit('response');