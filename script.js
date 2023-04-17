//  *************
//  DELETE LOGS
//  DELETE COORDS
//  *************
// show the loading popup
// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('loading-popup').style.display = 'block';
// });


// -------- coords ------------------------
// kounicova vzadu> 49.210930, 16.594155
// kounicova predu> 49.210444, 16.593347
// k. billa  vlavo> 49.210201, 16.593625
// k. billa vpravo> 49.210445, 16.593361
// botanicka skola> 49.2097608, 16.5985181
// kridlovicka 49.188374, 16.597964


// AFRAME.registerComponent('look-at-y', {
//     schema: {
//       target: {type: 'string', default: 'camera'}
//     },
//     init: function () { },
//     update: function () { },
//     tick: function () {
//       const targetEl = document.getElementById(this.data.target).object3D;
//       const el = this.el.object3D;
//       const vec = new THREE.Vector3();
//       targetEl.getWorldDirection(vec);
//       vec.y = 0;
//       vec.add(el.position)
//       el.lookAt(vec);
//     }
// });

// when all HTML doc. is loaded
window.onload = () => {
    // ------------ CONTENT OF SIGNS ---------------
    let signsContent = [
        {
            headline: "Fontána",
            description: "Litinová kašna původně stávala u domu č. p. 1 na Václavské ulici na Starém Brně. V osmdesátých letech minulého století kašna zmizela z původního místa a deset let se o ní nevědělo. V devadesátých letech byla znovu nalezena a postavena na současné místo na ulici Česká.\nPůvodně kašna sloužila k napájení zvířat, spodní nádržka pro psy, střední pro koně a horní pro ptáky.",
            position: "-10 2.5 6"
        },
        {
            headline: "Nová budova",
            description: "Súčasná budova sa plánuje zbúrať a nahradiť ju má nová 6 podlažná administratívna budova.",
            position: "-28 2.5 3"
        },
        {
            headline: "Vyvýšená križovatka",
            description: "Vyvýšenie križovatky umožní spomalenie vozidiel do nej vchádzajúcich a zjednoduší pohyb peších",
            position: "3 2.5 18"
        },
        {
            headline: "Koše na triedený odpad",
            description: "Nový mobiliár umožní triedenie odpadu.",
            position: "13 2.5 25"
        }
    ];

    // ------------- get SCENE element --------
    let scene = document.querySelector('a-scene');

    // -------- handle NO / REJECTED CAMERA usage --
    // let video = document.querySelector('video');
    // navigator.mediaDevices.getUserMedia({ video: true })
    //     .then((stream) => {video.srcObject = stream;})
    //     .catch(() => {
    //         sky = document.createElement("a-sky");
    //         sky.setAttribute('src', 'kridlovicka_HDRI.jpg');
    //         sky.setAttribute('rotation', '0 170 0');
    //         scene.appendChild(sky);
    //     });

    // ------------ DECIDE GPS COORDINATES
    if (confirm('Chcete zobraziť model na križovatke Křídlovická?')) {
        console.log('Zobrazujem na kridlovickej');
    } else {
        console.log('Zobrazujem na polohe uzivatela');
        useUsersGPSCoords(scene);
    }  

    // -------- create signs ---------------
    //let singsCollection = createSigns(scene.querySelector('#crossroad'), 8, latitude, longitude);
    createSigns(scene.querySelector('#crossroad'), signsContent);
    console.log('after signs creation');

    // -------- manage VISUALISATION BUTTONS --
    let buttonInfo = document.querySelector('#buttonInfo');
    buttonInfo.addEventListener('click', function() {
        buttonInfo.style.opacity = (buttonInfo.style.opacity == 1) ? 0.5 : 1;
        scene.querySelectorAll('a-text').forEach(element => {
            switchVisibility(element);
        });
    });
    
    let buttonTrees = document.querySelector('#buttonTree');
    buttonTrees.addEventListener("click", function() {
        buttonTrees.style.opacity = (buttonTrees.style.opacity == 1) ? 0.5 : 1;
        switchVisibility(scene.querySelector('#trees'));
    });

    let buttonBuilding = document.querySelector('#buttonBuil');
    buttonBuilding.addEventListener('click', function() {
        buttonBuilding.style.opacity = (buttonBuilding.style.opacity == 1) ? 0.5 : 1;
        switchVisibility(scene.querySelector('#building'));
    });
    
    // -------- manage loading popup ----------

    // TODO
};

// --------------------------------------------------------------------------
//                          FUNCTIONS
//                      commenting: /** */
// --------------------------------------------------------------------------


function useUsersGPSCoords(scene) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          lat = position.coords.latitude;
          long = position.coords.longitude;
          alert("dostal som GPS suradnice: " + lat + '; ' + long);
          switchGPSCoords(scene, lat, long);
        }, function() {
            console.log("Cannot get GPS coordinates");
        });
    } else {
        console.log("This browser does not support GPS.");
    }
}

function switchGPSCoords(scene, lat, long) {
    let entities = scene.querySelectorAll("a-entity");
    entities.forEach((entity) => {
        entity.setAttribute('gps-projected-entity-place', `latitude: ${lat}; longitude: ${long};`);
    });

    console.log("Coordinates were switched");
}

// -------- CREATE ENTITIES -------------------
// function createSigns(crossroad, countOfSigns) {
//     let signsCollection = [];
//     for (let objIdx = 1; objIdx <= countOfSigns; objIdx++) {
//         let signEntity = document.createElement("a-entity");
//         signEntity.setAttribute('gltf-model', `./assets/sign${objIdx}.glb`);
//         signEntity.setAttribute('visible', 'false');
//         // signEntity.setAttribute('look-at', '[gps-projected-camera]');
//         crossroad.appendChild(signEntity);
//         signsCollection.push(signEntity);
//     }

//     return signsCollection;
// }

function createSigns(crossroad, signsContent) {
    signsContent.forEach(signContent => {
        let signHeadline = document.createElement("a-text");
        signHeadline.setAttribute('value', signContent.headline);
        signHeadline.setAttribute('position', signContent.position);
        signHeadline.setAttribute('color', '#DA2128');
        signHeadline.setAttribute('align', 'center');
        signHeadline.setAttribute('baseline', 'bottom');
        signHeadline.setAttribute('shader', 'msdf');
        signHeadline.setAttribute('side', 'double');
        signHeadline.setAttribute('negate', 'false');
        signHeadline.setAttribute('font', './fonts/NunitoSans-SemiBold-msdf.json');
        signHeadline.setAttribute('fontImage', './fonts/NunitoSans-SemiBold.png');
        signHeadline.setAttribute('visible', 'false');
        signHeadline.setAttribute('look-at', '[gps-projected-camera]');
        crossroad.appendChild(signHeadline);        

        let signDescription = document.createElement("a-text");
        signDescription.setAttribute('value', signContent.description);
        signDescription.setAttribute('position', '0 -0.1 0');
        signDescription.setAttribute('color', '#666666');
        signDescription.setAttribute('align', 'left');
        signDescription.setAttribute('anchor', 'center');
        signDescription.setAttribute('baseline', 'top');
        signDescription.setAttribute('shader', 'msdf');
        signDescription.setAttribute('side', 'double');
        signDescription.setAttribute('negate', 'false');
        signDescription.setAttribute('width', '3');
        signDescription.setAttribute('wrap-Count', '60');
        signDescription.setAttribute('font', './fonts/NunitoSans-Regular-msdf.json');
        signDescription.setAttribute('fontImage', './fonts/NunitoSans-Regular.png');
        signDescription.setAttribute('visible', 'false');
        signHeadline.appendChild(signDescription);
    });
}

// -------- ENTITY VISIBILITY SWITCHER --------
function switchVisibility(asset) {
    let visibleAttrValue = asset.getAttribute("visible");
    asset.setAttribute("visible", (!visibleAttrValue).toString());
}
