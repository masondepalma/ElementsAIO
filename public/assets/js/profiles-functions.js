const axios = require('axios');
const readline = require('readline');
const { profile } = require('console');
// load key info for side bar
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

// Profiles Page Functions
  //Load Profiles
var profileLoad = ""
fs.readFile('./public/assets/data/profiles.json', (err, data) => {
  if (err) throw err;
  var profileLoad = JSON.parse(data);
  let ProfileArray = profileLoad.profiles
  ProfileArray.forEach(async(fileName) => {
    console.log(fileName);
    var item = `
      <div class="col-lg-4 col-md-6" id="${fileName.profilename}">
        <div class="create-card">
          <div class="edit-option">
            <ul>
              <li><a onclick="editEach()" data-toggle="modal" data-target="#popupOne"><i id="${fileName.profilename}-edit" class="fas fa-pencil-alt"></i></a></li>
              <li><a onclick="deleteProfile()"><i id="${fileName.profilename}-delete" class="far fa-trash"></i></a></li>
            </ul>
          </div>
          <div class="card-txt">
            <h3>${fileName.profilename}</h3>
            <p>....  ....  ....  ${fileName.billing.cc.slice(15, 19)}</p>

            <h4>${fileName.billing.xm}/${fileName.billing.xy.slice(2,4)}</h4>
          </div>
          <img class="card-shp" src="../assets/img/card-shp.svg" alt="">
        </div>
      </div>`
    // Plus whatever you fixed here
    document.getElementById('profileLists').insertAdjacentHTML('beforeend',item)
  });
  // Load profile number
  if (document.getElementById('profileAmount') != null) {
    document.getElementById('profileAmount').innerHTML = `Profiles (${ProfileArray.length})`
  } else {
    console.log("Not on profiles page")
  }
});
  // Setting edit or create
function MakingNew() {
  console.log('Setting Mode')
  if (document.getElementById('editProfile') != null){
    document.getElementById('profileName').value = null
    document.getElementById('email').value = null
    document.getElementById('phone').value = null
    document.getElementById('firstName').value = null
    document.getElementById('lastName').value = null
    document.getElementById('address1').value = null
    document.getElementById('address2').value = null
    document.getElementById('city').value = null
    document.getElementById('zipcode').value = null
    document.getElementById('state').value = null
    document.getElementById('country').value = null
    document.getElementById('baddress1').value = null
    document.getElementById('baddress2').value = null
    document.getElementById('bcity').value = null
    document.getElementById('bzipcode').value = null
    document.getElementById('bstate').value = null
    document.getElementById('bcountry').value = null
    document.getElementById('cc').value = null
    document.getElementById('xm').value = null
    document.getElementById('xy').value = null
    document.getElementById('cvv').value = null
    document.getElementById('holderName').value = null
    document.getElementById('editProfile').remove()
  } else {
    document.getElementById('editProfile').remove()
  }
}


  //create profile
if (document.getElementById('ProfileCreate') != null) {
  document.getElementById('ProfileCreate').addEventListener('click', function (e) {
    if (document.getElementById('editProfile') != null){
      console.log("Editing Profile")
      let profileName = document.getElementById('editProfile').getAttribute('active')
      fs.readFile('./public/assets/data/profiles.json', (err, data) => {
        document.getElementById(profileName).remove();
        console.log("Deleted Card");
        let profilesD = JSON.parse(data)
        let profilesA = profilesD.profiles
        profilesA.forEach(element => {
          console.log(element)
          if (element.profilename == profileName) {
            console.log("Removed profile")
            var result = arrayRemove(profilesA, element);
            let profileDeleteData = {
              profiles:result
            }
            datap = JSON.stringify(profileDeleteData); 
            fs.writeFileSync('./public/assets/data/profiles.json', datap);
            console.log('Deleted profile from json file');
          }
        });
      });
      console.log('Checkpoint');
      fs.readFile('./public/assets/data/profiles.json', (err, data) => {
        if (err) throw err;
        var profileAddLoad = JSON.parse(data);
        profileAddLoad.profiles.push({        //add the employee
          profilename: document.getElementById('profileName').value,
          email: document.getElementById('email').value,
          phoneNumber: document.getElementById('phone').value,
          shipping: {
            firstname: document.getElementById('firstName').value,
            lastname: document.getElementById('lastName').value,
            address1: document.getElementById('address1').value,
            address2: document.getElementById('address2').value,
            CityTown: document.getElementById('city').value,
            zipCode: document.getElementById('zipcode').value,
            state: document.getElementById('state').value,
            Country: document.getElementById('country').value
          },
          billing: {
            address1: document.getElementById('baddress1').value,
            address2: document.getElementById('baddress2').value,
            CityTown: document.getElementById('bcity').value,
            zipCode: document.getElementById('bzipcode').value,
            state: document.getElementById('bstate').value,
            Country: document.getElementById('bcountry').value,
            cc: document.getElementById('cc').value,
            xm: document.getElementById('xm').value,
            xy: document.getElementById('xy').value,
            cvv: document.getElementById('cvv').value,
            holderName: document.getElementById('holderName').value
          }
        });
        datap = JSON.stringify(profileAddLoad); 
        fs.writeFileSync('./public/assets/data/profiles.json', datap);
        console.log("Added Profile");
        var item = `
        <div class="col-lg-4 col-md-6" id="${document.getElementById('profileName').value}">
          <div class="create-card">
            <div class="edit-option">
              <ul>
                <li><a onclick="editEach()" data-toggle="modal" data-target="#popupOne"><i id="${document.getElementById('profileName').value}-edit" class="fas fa-pencil-alt"></i></a></li>
                <li><a onclick="deleteProfile()"><i id="${document.getElementById('profileName').value}-delete" class="far fa-trash"></i></a></li>
              </ul>
            </div>
            <div class="card-txt">
              <h3>${document.getElementById('profileName').value}</h3>
              <p>....  ....  ....  ${document.getElementById('cc').value.slice(15, 19)}</p>
    
              <h4>${document.getElementById('xm').value}/${document.getElementById('xy').value.slice(2, 4)}</h4>
            </div>
            <img class="card-shp" src="../assets/img/card-shp.svg" alt="">
          </div>
        </div>`
        // Plus whatever you fixed here
        document.getElementById('profileLists').insertAdjacentHTML('beforeend',item)
        console.log("Added Another Card");
      });
      console.log("Done")
    } else {
      fs.readFile('./public/assets/data/profiles.json', (err, data) => {
        if (err) throw err;
        var profileAddLoad = JSON.parse(data);
        profileAddLoad.profiles.push({        //add the employee
          profilename: document.getElementById('profileName').value,
          email: document.getElementById('email').value,
          phoneNumber: document.getElementById('phone').value,
          shipping: {
            firstname: document.getElementById('firstName').value,
            lastname: document.getElementById('lastName').value,
            address1: document.getElementById('address1').value,
            address2: document.getElementById('address2').value,
            CityTown: document.getElementById('city').value,
            zipCode: document.getElementById('zipcode').value,
            state: document.getElementById('state').value,
            Country: document.getElementById('country').value
          },
          billing: {
            address1: document.getElementById('baddress1').value,
            address2: document.getElementById('baddress2').value,
            CityTown: document.getElementById('bcity').value,
            zipCode: document.getElementById('bzipcode').value,
            state: document.getElementById('bstate').value,
            Country: document.getElementById('bcountry').value,
            cc: document.getElementById('cc').value,
            xm: document.getElementById('xm').value,
            xy: document.getElementById('xy').value,
            cvv: document.getElementById('cvv').value,
            holderName: document.getElementById('holderName').value
          }
        });
        datap = JSON.stringify(profileAddLoad); 
        fs.writeFileSync('./public/assets/data/profiles.json', datap);
        var item = `
          <div class="col-lg-4 col-md-6" id="${document.getElementById('profileName').value}">
            <div class="create-card">
              <div class="edit-option">
                <ul>
                  <li><a onclick="editEach()" data-toggle="modal" data-target="#popupOne"><i id="${document.getElementById('profileName').value}-edit" class="fas fa-pencil-alt"></i></a></li>
                  <li><a onclick="deleteProfile()"><i id="${document.getElementById('profileName').value}-delete" class="far fa-trash"></i></a></li>
                </ul>
              </div>
              <div class="card-txt">
                <h3>${document.getElementById('profileName').value}</h3>
                <p>....  ....  ....  ${document.getElementById('cc').value.slice(15, 19)}</p>
      
                <h4>${document.getElementById('xm').value}/${document.getElementById('xy').value.slice(2, 4)}</h4>
              </div>
              <img class="card-shp" src="../assets/img/card-shp.svg" alt="">
            </div>
          </div>`
        // Plus whatever you fixed here
        document.getElementById('profileLists').insertAdjacentHTML('beforeend',item)
        var profileLoad = ""
        fs.readFile('./public/assets/data/profiles.json', (err, data) => {
          if (err) throw err;
          var profileLoad = JSON.parse(data);
          let ProfileArray = profileLoad.profiles
          // Load profile number
          document.getElementById('profileAmount').innerHTML = `Profiles (${ProfileArray.length})`
        });
      });
    }
  })
} else {
  console.log("Not on profiles page")
}

  //delete all profiles
document.getElementById('deleteALL').addEventListener('click', function (e) {
    data = '{"profiles":[]}' 
    var clearAll = JSON.parse(data);
    datad = JSON.stringify(clearAll); 
    fs.writeFileSync('./public/assets/data/profiles.json', datad);
    const container = document.getElementById("profileLists")
    removeAllChildNodes(container);
    document.getElementById('profileAmount').innerHTML = `Profiles (0)`
})



function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}
  // Delete invisual profiles
function deleteProfile () {
  console.log('Deleting one profile...')
  let profileName = event.srcElement.id.split("-")[0];
  fs.readFile('./public/assets/data/profiles.json', (err, data) => {
    document.getElementById(profileName).remove();
    let profilesD = JSON.parse(data)
    let profilesA = profilesD.profiles
    profilesA.forEach(element => {
      if (element.profilename == profileName) {
        var result = arrayRemove(profilesA, element);
        let profileDeleteData = {
          profiles:result
        }
        datap = JSON.stringify(profileDeleteData); 
        fs.writeFileSync('./public/assets/data/profiles.json', datap);
        console.log('Deleted profile from json file');
      }
    });
  });
  fs.readFile('./public/assets/data/profiles.json', (err, data) => {
    let profilesF = JSON.parse(data)
    let profilesG = profilesF.profiles
    document.getElementById('profileAmount').innerHTML = `Profiles (${profilesG.length})`
  });
}

function arrayRemove(arr, value) { 
    
  return arr.filter(function(ele){ 
      return ele != value; 
  });
}

  // edit each profile
function editEach() {
  if (document.getElementById('editProfile') != null) {
    document.getElementById('editProfile').remove()
  }
  let profileName = event.srcElement.id.split('-')[0];
  var item = `
    <span active="${profileName}" id="editProfile"></span>`
    // Plus whatever you fixed here
  document.getElementById('editSpace').insertAdjacentHTML('beforeend',item)
  fs.readFile('./public/assets/data/profiles.json', (err, data) => {
    if (err) throw err;
    var dataFromFile = JSON.parse(data);
    var dataProfile = dataFromFile.profiles
    dataProfile.forEach(function(item, index, array) {
        if (item.profilename == profileName) {
            var profile = item;
            console.log("Found Profile"); 
            document.getElementById('profileName').value = profile.profilename
            document.getElementById('email').value = profile.email
            document.getElementById('phone').value = profile.phoneNumber
            document.getElementById('firstName').value = profile.shipping.firstname
            document.getElementById('lastName').value = profile.shipping.lastname
            document.getElementById('address1').value = profile.shipping.address1
            document.getElementById('address2').value = profile.shipping.address2
            document.getElementById('city').value = profile.shipping.CityTown
            document.getElementById('zipcode').value = profile.shipping.zipCode
            document.getElementById('state').value = profile.shipping.state
            document.getElementById('country').value = profile.shipping.Country
            document.getElementById('baddress1').value = profile.billing.address1
            document.getElementById('baddress2').value = profile.billing.address2
            document.getElementById('bcity').value = profile.billing.CityTown
            document.getElementById('bzipcode').value = profile.billing.zipCode
            document.getElementById('bstate').value = profile.billing.state
            document.getElementById('bcountry').value = profile.billing.Country
            document.getElementById('cc').value = profile.billing.cc
            document.getElementById('xm').value = profile.billing.xm
            document.getElementById('xy').value = profile.billing.xy
            document.getElementById('cvv').value = profile.billing.cvv
            document.getElementById('holderName').value = profile.billing.holderName
        } else {
          console.log('Couldnt find profile')
        }
    });
  });
}
