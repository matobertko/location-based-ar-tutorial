window.onload = () => {
    let scene = document.querySelector('a-scene');

    // ---------- coords ----------
    // kounicova vzadu> 49.210930, 16.594155
    // kounicova predu> 49.210444, 16.593347
    // k. billa  vlavo> 49.210201, 16.593625
    // k. billa vpravo> 49.210445, 16.593361
    // botanicka skola> 49.2097608, 16.5985181
    const latitude = 49.210445;
    const longitude = 16.593361;
    console.log('after coords');

    // --- create entities --------
    createCrossroad(scene, latitude, longitude);
    createSigns(scene, 8, latitude, longitude);
    
    // ----- manage signs ---------
    let showSigns = false;
    var signButton = document.getElementById('signButton');
    signButton.onclick = signVisibilityManager(scene, showSigns);
};


function createCrossroad(scene, lat, long) {
    // create entity and initialize it
    let crossroadEntity = document.createElement("a-entity");
    crossroadEntity.setAttribute('class', 'crossroad');
    crossroadEntity.setAttribute('gltf-model', './assets/model_krizovatky7.glb');
    crossroadEntity.setAttribute('position', '0 0 0');
    crossroadEntity.setAttribute('gps-projected-entity-place', `latitude: ${lat}; longitude: ${long};`);
    
    // insert entity into the scene
    scene.appendChild(crossroadEntity);

    console.log('created crossroad');
}


function createSigns(scene, countOfSigns, lat, long) {
    for (let objIdx = 1; objIdx <= countOfSigns; objIdx++) {
        // create entity
        let signEntity = document.createElement("a-entity");
        signEntity.setAttribute('class', 'sign');
        signEntity.setAttribute('gltf-model', `./assets/sign${objIdx}.glb`);
        signEntity.setAttribute('visible', 'false');
        signEntity.setAttribute('look-at', '[gps-projected-camera]');
        signEntity.setAttribute('gps-projected-entity-place', `latitude: ${lat}; longitude: ${long};`);


        // insert entity into the scene
        scene.appendChild(signEntity);
        console.log('created signs');
    }    
}


function signVisibilityManager(scene, showSigns) {
    showSigns = !showSigns;
    console.log('button clicked' + showSigns.toString());
    var signEntities = scene.querySelectorAll('.sign');
    for (var i = 0; i < signEntities.length; i++) {
        signEntities[i].setAttribute("visible", showSigns.toString());
    }
};