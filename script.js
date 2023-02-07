window.onload = () => {
    let scene = document.querySelector('a-scene');
    let button = document.querySelector('button[data-action="change"]')

    let showSigns = false;
    button.addEventListener('click', function(e) {
        showSigns = !showSigns;
        manageModelVisibility(showSigns);
    });
};


function manageModelVisibility(showSigns) {
    var signEntities = scene.querySelectorAll('.signs');
    for (var i = 0; i < signEntities.length; i++) {
        signEntities[i].setAttribute("visible", showSigns.toString());
    }
}