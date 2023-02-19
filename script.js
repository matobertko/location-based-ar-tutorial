window.onload = () => {
    let scene = document.querySelector('a-scene');

    // ---------- coords ----------
    // kounicova vzadu> 49.210930, 16.594155
    // kounicova predu> 49.210444, 16.593347
    // kounicova billa> 49.210201, 16.593625
    const latitude = 49.210201;
    const longitude = 16.593625; 
    console.log('after coords');

    // --- create entities --------
    createCrossroad(scene, latitude, longitude);
    createSigns(scene, 8, latitude, longitude);
    
    // ----- manage signs ---------
    let showSigns = false;
    let button = document.querySelector('button[data-action="change"]');
    button.addEventListener('click', function(e) {
        showSigns = !showSigns;
        console.log('button clicked' + showSigns.toString());
        manageSignsVisibility(scene, showSigns);
    });
};


function createCrossroad(scene, lat, long) {
    // create entity
    let crossroadEntity = document.createElement("a-entity");
    crossroadEntity.setAttribute('class', 'crossroad');
    crossroadEntity.setAttribute('gltf-model', './assets/model_krizovatky3.glb');
    // crossroadEntity.setAttribute('look-at', '[gps-camera]');
    crossroadEntity.setAttribute('gps-new-entity-place', `latitude: ${lat}; longitude: ${long}`);
    // crossroadEntity.setAttribute('gps-projected-entity-place', `latitude: ${lat}; longitude: ${long};`);

    
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
        // signEntity.setAttribute('look-at', '[gps-camera]');
        signEntity.setAttribute('gps-new-entity-place', `latitude: ${lat}; longitude: ${long}`);
        // signEntity.setAttribute('gps-projected-entity-place', `latitude: ${lat}; longitude: ${long};`);


        // insert entity into the scene
        scene.appendChild(signEntity);
        console.log('created signs');
    }    
}


function manageSignsVisibility(scene, showSigns) {
    var signEntities = scene.querySelectorAll('.sign');
    for (var i = 0; i < signEntities.length; i++) {
        signEntities[i].setAttribute("visible", showSigns.toString());
    }
}