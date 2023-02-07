window.onload = () => {
    let scene = document.querySelector('a-scene');

    let showSigns = false;
    
    let button = document.querySelector('button[data-action="change"]')
    button.addEventListener('click', function(e) {
        showSigns = !showSigns;
        manageModelsVisibility(scene, showSigns);
    });
};


function manageModelsVisibility(scene, showSigns) {
    var signEntities = scene.querySelectorAll('.signs');
    for (var i = 0; i < signEntities.length; i++) {
        signEntities[i].setAttribute("visible", showSigns.toString());
    }
}