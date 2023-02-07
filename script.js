window.onload = () => {
    let scene = document.querySelector('a-scene');

    // ---------- coords ----------
    // kounicova> 49.210930, 16.594155
    let latitude = 49.210930;
    let longitude = 16.594155; 

    // --- create entities --------
    createCrossroad(scene, latitude, longitude);
    createSigns(scene, 8, latitude, longitude);
    
    // ----- manage signs --------
    let showSigns = false;
    let button = document.querySelector('button[data-action="change"]')
    button.addEventListener('click', function(e) {
        showSigns = !showSigns;
        manageSignsVisibility(scene, showSigns);
    });
};


function createCrossroad(scene, lat, long) {
    // create entity
    let crossroadEntity = document.createElement("a-entity");
    crossroadEntity.setAttribute('class', 'crossroad');
    crossroadEntity.setAttribute('gltf-model', './assets/model_krizovatky3.glb');
    crossroadEntity.setAttribute('gps-entity-place', `latitude: ${lat}; longitude: ${long};`);
    
    // insert entity into the scene
    scene.appendChild(crossroadEntity);
}


function createSigns(scene, countOfSigns, lat, long) {
    for (let objIdx = 1; objIdx <= countOfSigns; objIdx++) {
        // create entity
        let signEntity = document.createElement("a-entity");
        signEntity.setAttribute('class', 'sign');
        signEntity.setAttribute('gltf-model', './assets/sign${objIdx}.glb');
        signEntity.setAttribute('visible', 'false');
        signEntity.setAttribute('look-at', '[gps-camera]');
        signEntity.setAttribute('gps-entity-place', `latitude: ${lat}; longitude: ${long};`);

        // insert entity into the scene
        scene.appendChild(signEntity);
    }    
}


function manageSignsVisibility(scene, showSigns) {
    var signEntities = scene.querySelectorAll('.sign');
    for (var i = 0; i < signEntities.length; i++) {
        signEntities[i].setAttribute("visible", showSigns.toString());
    }
}