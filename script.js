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

    // ------------ DECIDE GPS COORDINATES
    if (confirm('Chcete zobraziť model na križovatke Křídlovická?')) {
        console.log('Zobrazujem na kridlovickej');
    } else {
        console.log('Zobrazujem na polohe uzivatela');
        useUsersGPSCoords(scene);
    }  

    // -------- create entities ---------------
    let crossroad = createEntity(scene, latitude, longitude, './assets/testCrossroad.glb');
    crossroad.setAttribute("visible", 'true');

    // crossroad.addEventListener('loaded', () => {
    //     // Hide loading popup
    //     //loadingPopupEl.setAttribute('a-loading', 'enabled', false);
    //     console.log("model loaded");
    //     document.getElementById('loading-popup').style.display = 'none';

    //   });

    // crossroad.addEventListener('loaded', () => {
    //     console.log('after entity creation');
    //     alert("Model je načítaný");
    // });

    let trees = createEntity(scene, latitude, longitude, './assets/trees.glb');

    let building = createEntity(scene, latitude, longitude, './assets/building_floors.glb');

    let singsCollection = createSigns(scene, 8, latitude, longitude);

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
        switchVisibility(trees);
    });

    let buttonBuilding = document.querySelector('#buttonBuil');
    buttonBuilding.addEventListener('click', function() {
        buttonBuilding.style.opacity = (buttonBuilding.style.opacity == 1) ? 0.5 : 1;
        switchVisibility(building);
    });

    // -------- manage RADIO BUTTONS ----------
    // document.querySelector('#original').addEventListener("click", function() {
    //     switchGPSCoords(scene, latitude, longitude);
    // });
    
    // document.querySelector('#current').addEventListener("click", function() {
    //     let [lat, long] = getNewGPSCoords(latitude, longitude);
    //     switchGPSCoords(scene, lat, long);
    // });
    
    // -------- manage loading popup ----------

    // TODO

    
    // -------- handle rejected camera usage --
    createFakeSky(scene);

    //createFakeSky(scene);

    // navigator.mediaDevices.ondevicechange = function() {
    //     camPermissionHandler(scene);
    // }; 
};

// --------------------------------------------------------------------------
//                          FUNCTIONS
//                      commenting: /** */
// --------------------------------------------------------------------------


// -------- unavailableCamera -----------------
function createFakeSky(scene) {
    let sky = scene.querySelector('a-sky');
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => {
            if (sky) {
                sky.remove();
            } 
        })
        .catch((error) => {
            if (error.name === 'NotFoundError') {
                console.log('Device does not have a camera.');
            }
            if (sky == null) {
                sky = document.createElement("a-sky");
                sky.setAttribute('src', 'kridlovicka_HDRI.jpg');
                sky.setAttribute('rotation', '0 170 0');
                scene.appendChild(sky);
            }
        });
}


// ------------- POPUP ------------------------
// function showOnOriginal() {
//     var popup = document.getElementById('popup');
//     popup.style.display = 'none';
// }

// function showOnUsers() {
//     var popup = document.getElementById('popup');
//     popup.style.display = 'none';
//     useUsersGPSCoords();
// }

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


    // return [lat, long];
    // let GPSCoordsRetrieved = false;

    // const camera = document.querySelector("[gps-projected-camera]");
    
    // camera.addEventListener("gps-camera-update-position", e => {
    //     console.log("nasli sme GPS");
    //     if(!GPSCoordsRetrieved) {
    //         lat = e.detail.position.latitude;
    //         long = e.detail.position.longitude;
    //         alert(`Got first GPS position: lon ${long} lat ${lat}`);
    //         // Add a box to the north of the initial GPS position
    //         const entity = document.createElement("a-box");
    //         entity.setAttribute("scale", {
    //             x: 20, 
    //             y: 20,
    //             z: 20
    //         });
    //         entity.setAttribute('material', { color: 'red' } );
    //         entity.setAttribute('gps-projected-entity-place', {
    //             latitude: lat + 0.001,
    //             longitude: long
    //         });
    //         document.querySelector("a-scene").appendChild(entity);
    //     }
    //     GPSCoordsRetrieved = true;

    //     alert('coordinates:' + lat + '; ' + long);
    // });

    // console.log("vraciam: " + lat + " -- " + long);
    // return [lat, long];
}

function switchGPSCoords(scene, lat, long) {
    let entities = scene.querySelectorAll("a-entity");
    entities.forEach((entity) => {
        entity.setAttribute('gps-projected-entity-place', `latitude: ${lat}; longitude: ${long};`);
    });

    console.log("Coordinates were switched");
}

// -------- CREATE ENTITIES -------------------
function createEntity(scene, lat, long, asset) {
    // create entity and initialize it
    let entity = document.createElement("a-entity");
    entity.setAttribute('gltf-model', asset);
    entity.setAttribute('visible', 'false');
    entity.setAttribute('gps-projected-entity-place', `latitude: ${lat}; longitude: ${long};`);
    
    // insert entity into the scene
    scene.appendChild(entity);

    return entity;
}

function createSigns(scene, countOfSigns, lat, long) {
    let signsCollection = [];
    for (let objIdx = 1; objIdx <= countOfSigns; objIdx++) {
        let signEntity = createEntity(scene, lat, long, `./assets/sign${objIdx}.glb`);
        //signEntity.setAttribute('look-at', '[gps-projected-camera]');
        signsCollection.push(signEntity);
    }

    return signsCollection;
}

// ------- ENTITY GPS LOCATION SWITCHER -------
// function getNewGPSCoords(lat, long) {
//     if ("geolocation" in navigator) {
//         navigator.geolocation.getCurrentPosition(function(position) {
//           lat = position.coords.latitude;
//           long = position.coords.longitude;
//         }, function() {
//             console.log("Cannot get GPS coordinates");
//         });
//     } else {
//         console.log("This browser does not support GPS.");
//     }

//     return [lat, long];
// }


// -------- ENTITY VISIBILITY SWITCHER --------
function switchVisibility(asset) {
    let visibleAttrValue = asset.getAttribute("visible");
    asset.setAttribute("visible", (!visibleAttrValue).toString());
}
