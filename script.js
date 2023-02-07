window.onload = () => {
    let scene = document.querySelector('a-scene');

    createSigns(scene, 8);

    let showSigns = false;
    
    let button = document.querySelector('button[data-action="change"]')
    button.addEventListener('click', function(e) {
        showSigns = !showSigns;
        manageSignsVisibility(scene, showSigns);
    });
};


function createSigns(scene, countOfSigns) {
    // ---------- coords ----------
    let latitude = 49.210930;
    let longitude = 16.594155;
    // kounicova> 49.210930, 16.594155

    // ------ new entity ----------
    for (let objIdx = 1; objIdx <= countOfSigns; objIdx++) {
        // create entity
        let signEntity = document.createElement("a-entity");
        signEntity.setAttribute('class', 'sign');
        signEntity.setAttribute('gltf-model', `./assets/sign${objIdx}.glb`);
        signEntity.setAttribute('visible', 'false');
        signEntity.setAttribute('look-at', '[gps-camera]');
        signEntity.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

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