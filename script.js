//  *************
//  DELETE LOGS
//  DELETE COORDS
//  *************
// show the loading popup
// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('loading-popup').style.display = 'block';
// });

window.onload = () => {
    //document.getElementById('loading-popup').style.display = 'none';
    
    let scene = document.querySelector('a-scene');

    // -------- handle rejected camera usage --
    /*if (!navigator.mediaDevices || 
        !navigator.mediaDevices.getUserMedia || 
        navigator.mediaDevices.getUserMedia({ video: true })) {
        let sky = document.querySelector('a-sky');
        sky.setAttribute('visible', 'true');
    }*/




    // -------- coords ------------------------
    // kounicova vzadu> 49.210930, 16.594155
    // kounicova predu> 49.210444, 16.593347
    // k. billa  vlavo> 49.210201, 16.593625
    // k. billa vpravo> 49.210445, 16.593361
    // botanicka skola> 49.2097608, 16.5985181
    let latitude = 49.2097608; 
    let longitude = 16.5985181;

    // -------- create entities ---------------
    let crossroad = createEntity(scene, latitude, longitude, './assets/kridlovicka2.glb');
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
        singsCollection.forEach(element => {
            switchVisibility(element);
        });
    });

    let buttonTrees = document.querySelector('#buttonTree');
    buttonTrees.addEventListener('click', switchVisibility.bind(null, trees));

    let buttonBuilding = document.querySelector('#buttonBuil');
    buttonBuilding.addEventListener('click', switchVisibility.bind(null, building));

    // -------- manage RADIO BUTTONS ----------
    document.querySelector('#original').addEventListener("click", function() {
        switchGPSCoords(scene, latitude, longitude);
        // console.log(latitude + ';' + longitude + 'original');
    });
    
    document.querySelector('#current').addEventListener("click", function() {
        let [lat, long] = getNewGPSCoords(latitude, longitude);
        switchGPSCoords(scene, lat, long);
        // console.log(lat + ';' + long + 'current');
    });
    
    // -------- manage loading popup ----------

    // TODO

    // -------- handle rejected camera usage --
    /*navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => {})
        .catch((error) => {
            if (error.name === 'NotFoundError') {
                console.log('Device does not have a camera.');
            }
            if (error.name === 'NotAllowedError') {
                console.log('User denied the camera access.');
            }
            
            let sky = scene.querySelector('a-sky');
            sky.setAttribute('visible', 'true');
    });*/
};

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
function getNewGPSCoords(lat, long) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          lat = position.coords.latitude;
          long = position.coords.longitude;
        }, function() {
            console.log("Cannot get GPS coordinates");
        });
    } else {
        console.log("This browser does not support GPS.");
    }

    return [lat, long];
}

function switchGPSCoords(scene, lat, long) {
    let entities = scene.querySelectorAll("a-entity");

    entities.forEach((entity) => {
        entity.setAttribute('gps-projected-entity-place', `latitude: ${lat}; longitude: ${long};`);
    });

    console.log("Coordinates were switched");
}

// -------- ENTITY VISIBILITY SWITCHER --------
function switchVisibility(asset) {
    let visibleAttrValue = asset.getAttribute("visible");
    asset.setAttribute("visible", (!visibleAttrValue).toString());
}
