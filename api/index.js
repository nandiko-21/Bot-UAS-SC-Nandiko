var express = require('express');
var r = express.Router();

// load pre-trained model
const model = require('./sdk/model.js'); //predict 


// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '5076048315:AAHYZgT4yR6_OiCiQB62e9z5--HXhnUkmNQ'
const bot = new TelegramBot(token, {polling: true});

state=0;
// Main Menu Bot
bot.onText(/\/start/, (msg) => { 
    console.log(msg)
    bot.sendMessage(
        msg.chat.id,
        `Hello ${msg.chat.first_name}, Welcome to Bot-UAS-SC-Nandiko...\n
        click /predict`
    );  
});

// input requires x1, x2, and x3
bot.onText(/\/predict/, (msg) => { 
    bot.sendMessage(
        msg.chat.id,
        `Masukkan nilai x1|x2|x3 , contohnya 27|91|153`
    );   
    state = 1;
});

bot.on('message',(msg) =>{
    if(state == 1){
    s= msg.text.split("|");
    x1 = s[0]
    x2 = s[1]
    x3 = s[2]  
     model.predict(
[
    parseFloat(s[0]), // string to float
    parseFloat(s[1]),
    parseFloat(s[2])
]
).then((jres)=>{
    bot.sendMessage(
         msg.chat.id,
         `nilai x1 yang diprediksi adalah ${jres[0]} x1`
            );
    bot.sendMessage(
         msg.chat.id,
          `nilai x2 yang diprediksi adalah ${jres[1]} x2`
            );
     bot.sendMessage(
         msg.chat.id,
         `nilai x3 yang diprediksi adalah ${jres[2]} x3`
            );
   })
}else{
state = 0;
    }
})

module.exports = r;
