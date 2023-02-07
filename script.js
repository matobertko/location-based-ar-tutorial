window.onload = () => {
    let scene = document.querySelector('a-scene');

    let showSigns = false;
    
    let button = document.querySelector('button[data-action="change"]')
    button.addEventListener('click', function(e) {
        showSigns = !showSigns;
        manageSignsVisibility(scene, showSigns);
    });
};


// function createSignEntity(objIdx) {
//     // ------ coords ----------
//     let latitude = 49.210930;
//     let longitude = 16.594155;
//     // kounicova> 49.210930, 16.594155

//     // ------ new entity ----------
//     // class="signs"
//     // gltf-model="./assets/sign6.glb" 
//     // visible="false"
//     // look-at="[gps-camera]"
//     // gps-entity-place="longitude: 21.265328; latitude: 48.759925;" 
//     let entity = document.createElement("a-entity");
    
//     model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

//     scene.appendChild(entity);
// }


function manageSignsVisibility(scene, showSigns) {
    var signEntities = scene.querySelectorAll('.sign');
    for (var i = 0; i < signEntities.length; i++) {
        signEntities[i].setAttribute("visible", showSigns.toString());
    }
}