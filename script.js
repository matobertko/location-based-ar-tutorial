//  *************
//  DELETE LOGS
//  DELETE COORDS
//  *************
// show the loading popup
// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('loading-popup').style.display = 'block';
// });


// -------- coords ------------------------
// kounicova vzadu> 49.210930, 16.594155
// kounicova predu> 49.210444, 16.593347
// k. billa  vlavo> 49.210201, 16.593625
// k. billa vpravo> 49.210445, 16.593361
// botanicka skola> 49.2097608, 16.5985181
// kridlovicka 49.188374, 16.597964

// when all HTML doc. is loaded
window.onload = () => {
    
    let latitude = 49.188374; 
    let longitude = 16.597964;

    // ------------- get SCENE element --------
    let scene = document.querySelector('a-scene');

    // -------- handle NO / REJECTED CAMERA usage --
    // let video = document.querySelector('video');
    // navigator.mediaDevices.getUserMedia({ video: true })
    //     .then((stream) => {video.srcObject = stream;})
    //     .catch(() => {
    //         sky = document.createElement("a-sky");
    //         sky.setAttribute('src', 'kridlovicka_HDRI.jpg');
    //         sky.setAttribute('rotation', '0 170 0');
    //         scene.appendChild(sky);
    //     });

    // ------------ DECIDE GPS COORDINATES
    if (confirm('Chcete zobraziť model na križovatke Křídlovická?')) {
        console.log('Zobrazujem na kridlovickej');
    } else {
        console.log('Zobrazujem na polohe uzivatela');
        useUsersGPSCoords(scene);
    }  

    // -------- create entities ---------------
    //let crossroad = createEntity(scene, latitude, longitude, './assets/testing.glb');
    //crossroad.setAttribute("visible", 'true');

    // crossroad.addEventListener('loaded', () => {
    //     // Hide loading popup
    //     //loadingPopupEl.setAttribute('a-loading', 'enabled', false);
    //     console.log("model loaded");
    //     document.getElementById('loading-popup').style.display = 'none';

    //   });

    //let trees = createEntity(scene, latitude, longitude, './assets/trees.glb');

    //let building = createEntity(scene, latitude, longitude, './assets/building_floors.glb');

    let singsCollection = createSigns(scene.querySelector('#crossroad'), 8, latitude, longitude);

    console.log('after entity creation');

    // -------- manage VISUALISATION BUTTONS --
    let buttonInfo = document.querySelector('#buttonInfo');
    buttonInfo.addEventListener('click', function() {
        buttonInfo.style.opacity = (buttonInfo.style.opacity == 1) ? 0.5 : 1;
        singsCollection.forEach(element => {
            switchVisibility(element);
        });
    });
    

    let buttonTrees = document.querySelector('#buttonTree');
    buttonTrees.addEventListener("click", function() {
        buttonTrees.style.opacity = (buttonTrees.style.opacity == 1) ? 0.5 : 1;
        switchVisibility(scene.querySelector('#trees'));
    });

    let buttonBuilding = document.querySelector('#buttonBuil');
    buttonBuilding.addEventListener('click', function() {
        buttonBuilding.style.opacity = (buttonBuilding.style.opacity == 1) ? 0.5 : 1;
        switchVisibility(scene.querySelector('#building'));
    });
    
    // -------- manage loading popup ----------

    // TODO
};

// --------------------------------------------------------------------------
//                          FUNCTIONS
//                      commenting: /** */
// --------------------------------------------------------------------------


function useUsersGPSCoords(scene) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          lat = position.coords.latitude;
          long = position.coords.longitude;
          alert("dostal som GPS suradnice: " + lat + '; ' + long);
          switchGPSCoords(scene, lat, long);
        }, function() {
            console.log("Cannot get GPS coordinates");
        });
    } else {
        console.log("This browser does not support GPS.");
    }
}

function switchGPSCoords(scene, lat, long) {
    let entities = scene.querySelectorAll("a-entity");
    entities.forEach((entity) => {
        entity.setAttribute('gps-projected-entity-place', `latitude: ${lat}; longitude: ${long};`);
    });

    console.log("Coordinates were switched");
}

// -------- CREATE ENTITIES -------------------
function createSigns(crossroad, countOfSigns) {
    let signsCollection = [];
    for (let objIdx = 1; objIdx <= countOfSigns; objIdx++) {
        let signEntity = document.createElement("a-entity");
        signEntity.setAttribute('gltf-model', `./assets/sign${objIdx}.glb`);
        signEntity.setAttribute('visible', 'false');
        signEntity.setAttribute('look-at', '[gps-projected-camera]');
        crossroad.appendChild(signEntity);
        signsCollection.push(signEntity);
    }

    return signsCollection;
}

// -------- ENTITY VISIBILITY SWITCHER --------
function switchVisibility(asset) {
    let visibleAttrValue = asset.getAttribute("visible");
    asset.setAttribute("visible", (!visibleAttrValue).toString());
}
