var express = require('express');
var r = express.Router();

// load pre-trained model
const model = require('./sdk/model.js'); //predict 


// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '5057562264:AAHLUz5s6G-8vDMtapgD6l1Y4Z2i5su7OlM'
const bot = new TelegramBot(token, {polling: true});

state=0;
// main menu bot
bot.onText(/\/start/, (msg) => { 
    console.log(msg)
    bot.sendMessage(
        msg.chat.id,
        `hello ${msg.chat.first_name}, welcome...\n
        click /predict`
    );  
});

// input I dan r
bot.onText(/\/predict/, (msg) => { 
    bot.sendMessage(
        msg.chat.id,
        `masukan nilai x1|x2|x3 contoh 9|9|3`
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
