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

// instance of EventEmitter without params
customEventEmitter.on('response', () =>{
    console.log('data received');
})

// instance of EventEmitter with params
customEventEmitter.on('order', (passedInfo) =>{
    console.log(`order object: ${passedInfo}`);
    const { orderInfo } = passedInfo;
    console.log(`order info: ${orderInfo}`);
})

customEventEmitter.emit('response');
customEventEmitter.emit('order', {
    orderId: 2,
    orderType: 'food',
    foodType: 'fast food',
    foodCategory: 'burgers',
    orderFood: 'naga mexican',
    orderComplimentary: function(drinks){
        this.drinks = "Soda";
        console.log(this.drinks);
    },
    quantity: 2,
    price: (priceMoney) => {
        return this.quantity * priceMoney; 
    }
});