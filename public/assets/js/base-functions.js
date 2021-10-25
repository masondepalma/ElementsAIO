const DiscordRPC = require('discord-rpc');
//const ipc = window.require("electron").ipcRenderer;

// Set this to your Client ID.
const clientId = '847272938725441578';

// Only needed if you want to use spectate, join, or ask to join
DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

async function setActivity() {

  // You'll need to have snek_large and snek_small assets uploaded to
  // https://discord.com/developers/applications/<application_id>/rich-presence/assets
  rpc.setActivity({
    details: `Developer Copy`,
    largeImageKey: 'image0',
    largeImageText: 'Version 0.0.1',
    smallImageKey: 'image0',
    startTimestamp,
    instance: false,
  });
}

rpc.on('ready', () => {
  setActivity();

  // activity can only be set every 15 seconds
  setInterval(() => {
    setActivity();
  }, 15e3);
});

rpc.login({ clientId }).catch(console.error);


// Functions of changing pages
/*
document.getElementById("profilepage-button").addEventListener("cick",function(e){
  for (i in document.getElementsByTagName("page")){
    i.setAttribute("class", "d-none");
  }
  document.getElementsByName("profilepage")[0].setAttribute("class","")
})
*/

function changepageProfile(){
  var element = event.srcElement
  //console.log(document.getElementsByName(element.id.toString().split("-")[0].toString()))
  document.querySelectorAll('[type="page"]').forEach(element => {
    element.setAttribute("class", "d-none");
  });
  document.getElementsByName("profilepage")[0].setAttribute("class","")
}

function changepageHome(){
  var element = event.srcElement
  //console.log(document.getElementsByName(element.id.toString().split("-")[0].toString()))
  document.querySelectorAll('[type="page"]').forEach(element => {
    element.setAttribute("class", "d-none");
  });
  document.getElementsByName("homepage")[0].setAttribute("class","home-section")
}

function changepageTask(){
  var element = event.srcElement
  //console.log(document.getElementsByName(element.id.toString().split("-")[0].toString()))
  document.querySelectorAll('[type="page"]').forEach(element => {
    element.setAttribute("class", "d-none");
  });
  document.getElementsByName("taskpage")[0].setAttribute("class","task-section")
}