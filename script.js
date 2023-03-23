//  *************
//  DELETE LOGS
//  DELETE COORDS
//  *************
// show the loading popup
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loading-popup').style.display = 'block';
});

window.onload = () => {
    //document.getElementById('loading-popup').style.display = 'none';

    let scene = document.querySelector('a-scene');

    // -------- coords ------------------------
    // kounicova vzadu> 49.210930, 16.594155
    // kounicova predu> 49.210444, 16.593347
    // k. billa  vlavo> 49.210201, 16.593625
    // k. billa vpravo> 49.210445, 16.593361
    // botanicka skola> 49.2097608, 16.5985181
    const LAT = 49.2097608; 
    const LONG = 16.5985181;

    // -------- create entities ---------------
    let crossroad = createEntity(scene, LAT, LONG, './assets/kridlovicka2.glb');
    crossroad.setAttribute("visible", 'true');

    crossroad.addEventListener('loaded', () => {
        // Hide loading popup
        //loadingPopupEl.setAttribute('a-loading', 'enabled', false);
        console.log("model loaded");
        document.getElementById('loading-popup').style.display = 'none';

      });

    let trees = createEntity(scene, LAT, LONG, './assets/trees.glb');

    let building = createEntity(scene, LAT, LONG, './assets/building_floors.glb');

    let singsCollection = createSigns(scene, 8, LAT, LONG);

    console.log('after entity creation');

    // -------- manage BUTTONS ----------------
    let buttonInfo = document.querySelector('#buttonInfo');
    buttonInfo.addEventListener('click', function(e) {
        singsCollection.forEach(element => {
            switchVisibility(element);
        });
    });

    let buttonTrees = document.querySelector('#buttonTree');
    buttonTrees.addEventListener('click', switchVisibility.bind(null, trees));

    let buttonBuilding = document.querySelector('#buttonBuil');
    buttonBuilding.addEventListener('click', switchVisibility.bind(null, building));

    // -------- manage loading popup ----------
};

// -------- CREATE ENTITIES -------------------
function createEntity(scene, lat, long, asset) {
    // create entity and initialize itff
    let entity = document.createElement("a-entity");
    entity.setAttribute('gltf-model', asset);
    entity.setAttribute('visible', 'false');
    entity.setAttribute('gps-projected-entity-place', `latitude: ${lat}; longitude: ${long};`);
    
    // insert entity into the scene
    scene.appendChild(entity);

    // console.log('created ' + asset);

    // return entity
    return entity;
}

function createSigns(scene, countOfSigns, lat, long) {
    let signsCollection = [];
    for (let objIdx = 1; objIdx <= countOfSigns; objIdx++) {
        let signEntity = createEntity(scene, lat, long, `./assets/sign${objIdx}.glb`);
        //signEntity.setAttribute('look-at', '[gps-projected-camera]');
        signsCollection.push(signEntity);
    }   
    // console.log('created signs');

    // return entity collection
    return signsCollection;
}

// -------- ENTITY VISIBILITY SWITCHER --------

function switchVisibility(asset) {
    let visibleAttrValue = asset.getAttribute("visible");
    // console.log('button ' + asset + (!visibleAttrValue).toString());
    asset.setAttribute("visible", (!visibleAttrValue).toString());
}
