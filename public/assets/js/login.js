const axios = require('axios');
const {BrowserWindow} = require('electron').remote;
const { getHWID } = require('hwid');
const { join } = require('path');
const ipc = window.require("electron").ipcRenderer;
const fs = require('fs');

// login function
//check for saved key
var keyLoad = ""
fs.readFile('./public/assets/data/key.json', (err, data) => {
  if (err) throw err;
  var keyLoad = JSON.parse(data);
  console.log(keyLoad.key);
  if (keyLoad.key == null){
    console.log('no Key saved');
  } else {
    async function login() {
        const hwid = await getHWID();
        // then do things
        console.log("Grabbing Key...");
        var key = keyLoad.key;
        var apiKey = "pk_eHqR0MJ0maq269l1304MxYAhYMxfX0or	"
        axios({
            method: 'GET',
            url: `https://api.hyper.co/v4/licenses/${key}`,
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
        })
        .then(function (response) {
            console.log(response.data.plan);
            var activeHWID = response.data.metadata.hwid;
            var discriminator = `#${response.data.user.discord.discriminator}`
            var user = response.data.user.discord.username
            var plan = response.data.plan.name
            var image = response.data.user.photo_url
            console.log(activeHWID);
            if (activeHWID == null) {
                axios({
                    method: 'PATCH',
                    url: `https://api.hyper.co/v4/licenses/${key}`,
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        metadata : {
                            'hwid':hwid
                        }
                    }
                })
                .then((res) => {
                    document.getElementById("login-message").innerHTML = ('');
                    document.getElementById("success-message").innerHTML = ('');
                    document.getElementById("error-message").innerHTML = ('');
                    document.getElementById("success-message").innerHTML = ('Success!');
                    console.log('Set HWID')
                    let dataDump = { 
                        key: key,
                        user: user,
                        descrimator: discriminator,
                        plan: plan,
                        image: image
                    };
                    let data = JSON.stringify(dataDump);
                    fs.writeFileSync('./public/assets/data/key.json', data);
                    ipc.send('redirect')
                })
            } else if (activeHWID == hwid) {
                document.getElementById("login-message").innerHTML = ('');
                document.getElementById("success-message").innerHTML = ('');
                document.getElementById("error-message").innerHTML = ('');
                document.getElementById("success-message").innerHTML = ('Success!');
                console.log("Valid Key!");
                let dataDump = { 
                    key: key,
                    user: user,
                    descrimator: discriminator,
                    plan: plan,
                    image: image
                };
                let data = JSON.stringify(dataDump);
                fs.writeFileSync('./public/assets/data/key.json', data);
                ipc.send('redirect')
            } else if (activeHWID != hwid) {
                document.getElementById("login-message").innerHTML = ('');
                document.getElementById("success-message").innerHTML = ('');
                document.getElementById("error-message").innerHTML = ('');
                document.getElementById("error-message").innerHTML = ('Reset Key.');
                console.log("Reset Key!");
            }
        })
        .catch(function (error) {
            console.log(error);
            document.getElementById("login-message").innerHTML = ('');
            document.getElementById("success-message").innerHTML = ('');
            document.getElementById("error-message").innerHTML = ('');
            document.getElementById("error-message").innerHTML = ('Invalid Key.');
            console.log("Invalid Key!");
        })
    };
    (async () => await login())()
  }
});

//hyper api 
document.getElementById("login").addEventListener("click",function (e){
    async function login() {
        const hwid = await getHWID();
        // then do things
        console.log("Grabbing Key...");
        var key = document.getElementById("license-key").value;

        var apiKey = "pk_eHqR0MJ0maq269l1304MxYAhYMxfX0or	"
        axios({
            method: 'GET',
            url: `https://api.hyper.co/v4/licenses/${key}`,
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
        })
        .then(function (response) {
            console.log(response.data)
            var activeHWID = response.data.metadata.hwid;
            var discriminator = `#${response.data.user.discord.discriminator}`
            var user = response.data.user.discord.username
            var plan = response.data.plan.name
            var image = response.data.user.photo_url
            console.log(activeHWID);
            if (activeHWID == null) {
                axios({
                    method: 'PATCH',
                    url: `https://api.hyper.co/v4/licenses/${key}`,
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        metadata : {
                            'hwid':hwid
                        }
                    }
                })
                .then((res) => {
                    document.getElementById("login-message").innerHTML = ('');
                    document.getElementById("success-message").innerHTML = ('');
                    document.getElementById("error-message").innerHTML = ('');
                    document.getElementById("success-message").innerHTML = ('Success!');
                    console.log('Set HWID')
                    let dataDump = { 
                        key: key,
                        user: user,
                        descrimator: discriminator,
                        plan: plan,
                        image: image
                    };
                    let data = JSON.stringify(dataDump);
                    fs.writeFileSync('./public/assets/data/key.json', data);
                    ipc.send('redirect')
                })
            } else if (activeHWID == hwid) {
                document.getElementById("login-message").innerHTML = ('');
                document.getElementById("success-message").innerHTML = ('');
                document.getElementById("error-message").innerHTML = ('');
                document.getElementById("success-message").innerHTML = ('Success!');
                console.log("Valid Key!");
                let dataDump = { 
                    key: key,
                    user: user,
                    descrimator: discriminator,
                    plan: plan,
                    image: image
                };
                let data = JSON.stringify(dataDump);
                fs.writeFileSync('./public/assets/data/key.json', data);
                ipc.send('redirect')
            } else if (activeHWID != hwid) {
                document.getElementById("login-message").innerHTML = ('');
                document.getElementById("success-message").innerHTML = ('');
                document.getElementById("error-message").innerHTML = ('');
                document.getElementById("error-message").innerHTML = ('Reset Key.');
                console.log("Reset Key!");
            }
        })
        .catch(function (error) {
            console.log(error);
            document.getElementById("login-message").innerHTML = ('');
            document.getElementById("success-message").innerHTML = ('');
            document.getElementById("error-message").innerHTML = ('');
            document.getElementById("error-message").innerHTML = ('Invalid Key.');
            console.log("Invalid Key!");
        })
    };
    (async () => await login())()
})