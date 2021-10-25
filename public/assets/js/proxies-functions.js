const fs = require('fs');
const axios = require('axios');
const ipc = window.require("electron").ipcRenderer;
const readline = require('readline');

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


//LOADING PROXY FILES
ProxyArray = []
const proxyFolder = './public/assets/data/proxies';
fs.readdirSync(proxyFolder).forEach(file => {
  GroupName = file.split(".")[0];
  ProxyArray.push(GroupName);
});
document.getElementById("total-lists").innerHTML = `${ProxyArray.length} Proxy Lists`
ProxyArray.forEach(async(fileName) => {
  var file = `./public/assets/data/proxies/${fileName}.txt`;
  let ProxyAmount = (await fs.promises.readFile(file)).toString().split("\n").length;

  var item = `
    <div onclick="ChangeActiveProxyGroup()" id="${fileName}" class="proxy-item">
        <h4>${fileName}</h4>
        <button>${ProxyAmount}</button>
    </div>`
  // Plus whatever you fixed here
  document.getElementsByClassName('proxy-search-result')[0].insertAdjacentHTML('beforeend',item);
});

function ChangeActiveProxyGroup () {
    const proxyFolder = './public/assets/data/proxies';
    fs.readdirSync(proxyFolder).forEach(file => {
        GroupName = file.split(".")[0];
        document.getElementById(GroupName).setAttribute("class", "proxy-item"); 
        console.log("reset all groupps");
    });
    let elementId = event.srcElement.id;
    document.getElementById(elementId).setAttribute("class", "proxy-item selected"); 
    console.log("Set Active Group");
    //loading proxies into divs
    const container = document.getElementById("active-proxies")
    removeAllChildNodes(container);
    var array = fs.readFileSync(`./public/assets/data/proxies/${elementId}.txt`).toString().split("\n");
    document.getElementById("group-name").innerHTML = `${elementId}`;
    document.getElementById("import-active-group").innerHTML = `${elementId}`;
    for(i in array) {
      var item = `
        <tr id="${array[i]}" >
            <th class="tb-btn" scope="row">
                <div class="status-btn">
                    <span id="status-${array[i]}">Idle</span>
                </div>
            </th>
            <td>
                <p>${array[i]}</p>
            </td>
            <td>
                <div class="boom-action">
                    <a onclick="deleteProxy()"><i class="far fa-trash"></i></a>
                    <a onclick="testProxy()"><i class="fas fa-play"></i></a>
                </div>
            </td>
        </tr>`
      // Plus whatever you fixed here
      document.getElementById('active-proxies').insertAdjacentHTML('beforeend',item)
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function deleteProxy () {
    let proxyValue = event.srcElement.parentNode.parentNode.parentNode.parentNode.id
    let activeElementList = document.getElementsByClassName("proxy-item selected")[0];
    let activeList = activeElementList.id
    document.getElementById(proxyValue).remove();
    fs.readFile(`./public/assets/data/proxies/${activeList}.txt`, "utf8", (err, data) => {
      if(!err){
          var proxies = data.split('\n')
          proxies.splice(proxies.indexOf(proxyValue), 1)
          document.getElementById(activeElementList.id).childNodes[3].innerHTML = `${proxies.length}`
          console.log(proxyValue);
          // rewrite file
          console.log("Deletting Proxy")
          fs.writeFile(`./public/assets/data/proxies/${activeList}.txt`, proxies.join("\n"), function(err){
          })
      }
      console.log(err);
    })
}

function DeleteProxyGroup () {
    try {
      let GroupName = document.getElementsByClassName("proxy-item selected")[0].id
      fs.unlinkSync(`./public/assets/data/proxies/${GroupName}.txt`)
      //file removed
      document.getElementsByClassName("proxy-item selected")[0].remove()
      const container = document.getElementById("active-proxies")
      removeAllChildNodes(container);
      document.getElementById("group-name").innerHTML = ``;
      document.getElementById("group-total").innerHTML = ``
    } catch(err) {
      console.error(err)
    }

}


document.getElementById("save-proxy-list").addEventListener("click", function (e) {
    let ListContent = document.getElementById("new-proxies").value;
    let activeElementList = document.getElementsByClassName("proxy-item selected")[0].id;
    var array = ListContent.toString().split("\n");
    document.getElementById("group-total").innerHTML = `${array.length} Total Proxies`
    document.getElementById(`${activeElementList}`).childNodes[3].innerHTML = `${array.length}`
    for(i in array) {
      var item = `
        <tr id="${array[i]}" >
            <th class="tb-btn" scope="row">
                <div class="status-btn">
                    <span id="status-${array[i]}">Idle</span>
                </div>
            </th>
            <td>
                <p>${array[i]}</p>
            </td>
            <td>
                <div class="boom-action">
                    <a onclick="deleteProxy()"deleteProxy><i class="far fa-trash"></i></a>
                    <a onclick="testProxy()"><i class="fas fa-play"></i></a>
                </div>
            </td>
        </tr>`
      // Plus whatever you fixed here
      document.getElementById('active-proxies').insertAdjacentHTML('beforeend',item)
    }
    fs.appendFile(`./public/assets/data/proxies/${activeElementList}.txt`, ListContent, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");

    }); 
});

function testProxy () {
    let proxy = event.srcElement.parentNode.parentNode.parentNode.parentNode.id
    let proxyPieces = proxy.split(":");
    const start = Date.now();
    console.log("Testing URL");
    axios({
        method: 'GET',
        url: "https://www.google.com",
        proxy: {
            protocol: 'http',
            host: proxyPieces[0],
            port: proxyPieces[1],
            auth: {
            username: proxyPieces[2],
            password: proxyPieces[3]
            }
        },
    })
    .then((res) => {
        document.getElementById(`status-${proxy}`).innerHTML = `${Date.now() - start}ms`
    })
}

function CreateProxyGroup () {
    let fileName = document.getElementById("name-input").value
    var item = `
        <div onclick="ChangeActiveProxyGroup()" id="${fileName}" class="proxy-item">
            <h4>${fileName}</h4>
            <button>0</button>
        </div>`
    // Plus whatever you fixed here
    document.getElementsByClassName('proxy-search-result')[0].insertAdjacentHTML('beforeend',item);
    console.log("The file was saved!");
    fs.writeFile(`./public/assets/data/proxies/${fileName}.txt`, "", function(err) {
      if(err) {
          return console.log(err);
      }
    }); 
}

// Search
document.getElementById("search-input").addEventListener("keyup", function (e) {
  fs.readdirSync('./public/assets/data/proxies').forEach(file => {
      GroupName = file.split(".")[0]
      GroupNameL = file.split(".")[0].toLowerCase();
      str = document.getElementById("search-input").value.toLowerCase();
      if (GroupNameL.includes(str) == true){
        document.getElementById(GroupName).style.display = "flex";
      } else if (GroupNameL.includes(str) == false){
        document.getElementById(GroupName).style.display = "none";
      }
  });
})
