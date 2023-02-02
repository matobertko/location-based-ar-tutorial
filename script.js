window.onload = () => {
    // insert values to coords
    const longitude = 21.265328; // <- insert here
    const latitude = 48.759925;  // <- insert here
    manageModelVisibility();
};

function createModel(lat, long) {
    let model = document.createElement('a-entity');
    model.setAttribute('gltf-model', './minimickey.glb');
    model.setAttribute('scale', `2 2 2`);
    model.setAttribute('gps-entity-place', `latitude: ${lat}; longitude: ${long};`);

    return model;
}

function manageModelVisibility(lat, long) {
    let scene = document.querySelector('a-scene');
    let button = document.querySelector('button[data-action="change"]')
    
    let withInfos = false;
    let model = createModel(lat, long);
    button.addEventListener('click', function(e) {
        // console.log("stlaceni");
        if (withInfos === false) {
            console.log("false");
            scene.appendChild(model);
            withInfos = true;
        } else {
            console.log("true");
            scene.removeChild(model);
            let newModel = createModel(lat, long);
            model = newModel;
            withInfos = false;
        }
    });
}