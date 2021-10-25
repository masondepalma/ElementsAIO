const fs = require('fs');
const axios = require('axios');
const ipc = window.require("electron").ipcRenderer;
const readline = require('readline');
const { Webhook, MessageBuilder } = require('discord-webhook-node');

// load key info for side menu 

var keyLoad = ""
fs.readFile('./public/assets/data/key.json', (err, data) => {
  if (err) throw err;
  var keyLoad = JSON.parse(data);
  console.log(keyLoad.key);
  if (keyLoad.key == null){
    console.log('Error');
    ipc.send('redirect1');
  } else {
    document.getElementById("username").innerHTML = (keyLoad.user + keyLoad.descrimator);
    document.getElementById("avatar").setAttribute("src", keyLoad.image); 
  }
});


// Settings Page Functions
console.log("Loaded Settings Fucntions")

  //load Key
var keyLoad = ""
fs.readFile('./public/assets/data/key.json', (err, data) => {
    if (err) throw err;
    var keyLoad = JSON.parse(data);
    if (keyLoad.key == null){
      console.log('Error');
      ipc.send('redirect1');
    } else {
      document.getElementById("usernameBox").innerHTML = (keyLoad.user + keyLoad.descrimator);
      document.getElementById("avatarBox").setAttribute("src", keyLoad.image); 
      document.getElementById("keyBox").innerHTML = (keyLoad.key + ' | ' + keyLoad.plan);
    }
});
  

    // load webhook from json
var webhookLoad = ""
fs.readFile('./public/assets/data/webhook.json', (err, data) => {
    if (err) throw err;
    var webhookLoad = JSON.parse(data);
    if (webhookLoad.webhook == null){
      console.log('no webhook saved');
    } else {
      document.getElementById("webhook-input").value = (webhookLoad.webhook);
    }
  });
  
    // Save webhook to json
document.getElementById("save-webhook").addEventListener("click", function (e) {
    var webhookFromText = document.getElementById("webhook-input").value;
    let dataDump = { 
      webhook: webhookFromText
    };
    let data = JSON.stringify(dataDump);
    fs.writeFileSync('./public/assets/data/webhook.json', data);
}); 
  
    //test webhook
document.getElementById("test-webhook").addEventListener("click", function (e) {
    console.log('Testing Webhook...');
    var webhookTestLoad = ""
    fs.readFile('./public/assets/data/webhook.json', (err, data) => {
      if (err) throw err;
      var webhookTestLoad = JSON.parse(data);
      if (webhookTestLoad.webhook == null){
        console.log('no webhook saved');
      } else {
        const hook = new Webhook(webhookTestLoad.webhook);
        
        const embed = new MessageBuilder()
        .setAuthor('ElementsAIO', 'https://cdn.discordapp.com/attachments/842204123146223636/847276692271530004/image0.jpg')
        .setColor('#00b0f4')
        .setDescription('This is a test webhook')
        .setFooter('ElementsAIO', 'https://cdn.discordapp.com/attachments/842204123146223636/847276692271530004/image0.jpg')
        .setTimestamp();
        
        hook.send(embed);
      }
    });
});

    //Deactiviate key
document.getElementById("deactivate-user").addEventListener("click", function (e) {
    let dataDump = { 
      key: null,
      user: null,
      descrimator: null
    };
    let data = JSON.stringify(dataDump);
    fs.writeFileSync('./public/assets/data/key.json', data);
    ipc.send('redirect1');
}); 

//Api Keys
    // Saving API Keys
    // Save apiKeys to json
document.getElementById("save-apiKeys").addEventListener("click", function (e) {
    var twocaptcha = document.getElementById("twocaptcha").value;
    var capmonster = document.getElementById("capmonster").value;
    let dataDump = { 
      twocaptcha: twocaptcha,
      capmonster: capmonster
    };
    let data = JSON.stringify(dataDump);
    fs.writeFileSync('./public/assets/data/apikeys.json', data);
}); 
  
    // load apiKey from json
var apiKeysLoad = ""
fs.readFile('./public/assets/data/apikeys.json', (err, data) => {
    if (err) throw err;
    var apiKeysLoad = JSON.parse(data);
    if (apiKeysLoad.twocaptcha == null){
      console.log('no twocaptcha saved');
    } else {
      document.getElementById("twocaptcha").value = (apiKeysLoad.twocaptcha);
    }
    if (apiKeysLoad.capmonster == null){
      console.log('no capmonster saved');
    } else {
      document.getElementById("capmonster").value = (apiKeysLoad.capmonster);
    }
});
