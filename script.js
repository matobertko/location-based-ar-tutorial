//  *************
//  DELETE LOGS
//  DELETE COORDS
//  *************
// -------- coords ------------------------
// kounicova vzadu> 49.210930, 16.594155
// kounicova predu> 49.210444, 16.593347
// k. billa  vlavo> 49.210201, 16.593625
// k. billa vpravo> 49.210445, 16.593361
// botanicka skola> 49.2097608, 16.5985181
// kridlovicka 49.188374, 16.597964
// kridlovicka roh budovy: 49.1883144, 16.5977897


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


// ------------ CONTENT OF SIGNS ---------------
let signsContent = [
    {
        headline: "Fontána",
        description: "Litinová kašna původně stávala u domu č. p. 1 na Václavské ulici na Starém Brně. V osmdesátých letech minulého století kašna zmizela z původního místa a deset let se o ní nevědělo. V devadesátých letech byla znovu nalezena a postavena na současné místo na ulici Česká.\nPůvodně kašna sloužila k napájení zvířat, spodní nádržka pro psy, střední pro koně a horní pro ptáky.",
        position: "31 2.5 7"
    },
    {
        headline: "Nová budova",
        description: "Súčasná budova sa plánuje zbúrať a nahradiť ju má nová 6 podlažná administratívna budova.",
        position: "-11 2.5 4"
    },
    {
        headline: "Vyvýšená križovatka",
        description: "Vyvýšenie križovatky umožní spomalenie vozidiel do nej vchádzajúcich a zjednoduší pohyb peších",
        position: "19 2.5 19"
    },
    {
        headline: "Koše na triedený odpad",
        description: "Nový mobiliár umožní triedenie odpadu.",
        position: "28 2.5 28"
    }
];

// -------------------------------------------------------------------
//                      AFTER LOADING THE PAGE 
// -------------------------------------------------------------------
window.onload = () => {
    // ------------- get SCENE element --------
    let scene = document.querySelector('a-scene');

    // -------- handle NO / REJECTED CAMERA usage --
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => {})
        .catch((error) => {
            if (error == 'NotFoundError') {
                sky = document.createElement("a-sky");
                sky.setAttribute('src', 'kridlovicka_HDRI.jpg');
                sky.setAttribute('rotation', '0 170 0');
                scene.appendChild(sky);
            }
        });

    // ------------ DECIDE GPS COORDINATES
    if (confirm('Chcete zobraziť model na križovatke Křídlovická?')) {
        console.log('Zobrazujem na kridlovickej');
    } else {
        console.log('Zobrazujem na polohe uzivatela');
        useUsersGPSCoords(scene);
    }  

    // -------- create signs ---------------
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
    if (scene.hasLoaded) {
        pageLoaded();
    } else {
        scene.addEventListener('loaded', pageLoaded);
    }
};

// --------------------------------------------------------------------------
//                          HELPER FUNCTIONS
//                      commenting: /** */
// --------------------------------------------------------------------------

// ------------- close 'please wait' div ----------------
function pageLoaded () {
    console.log('site is loaded');
    document.getElementById('loader-overlay').style.display = 'none';
}

// ------------ use users location ----------------------
function useUsersGPSCoords(scene) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                alert("dostal som GPS suradnice: " + lat + '; ' + long);
                switchGPSCoords(scene, lat, long);
            }, 
            function() {
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

// -------- CREATE SIGNS -------------------
function createSigns(crossroad, signsContent) {
    signsContent.forEach(signContent => {
        const signHeadline = document.createElement("a-text");
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

        const signDescription = document.createElement("a-text");
        signDescription.setAttribute('value', signContent.description);
        signDescription.setAttribute('position', '0 -0.1 0');
        signDescription.setAttribute('color', 'black');
        signDescription.setAttribute('align', 'center');
        signDescription.setAttribute('anchor', 'center');
        signDescription.setAttribute('baseline', 'top');
        signDescription.setAttribute('shader', 'msdf');
        signDescription.setAttribute('side', 'double');
        signDescription.setAttribute('negate', 'false');
        signDescription.setAttribute('width', '3');
        signDescription.setAttribute('wrap-Count', '40');
        signDescription.setAttribute('font', './fonts/NunitoSans-Regular-msdf.json');
        signDescription.setAttribute('fontImage', './fonts/NunitoSans-Regular.png');
        signHeadline.appendChild(signDescription);

        // const signBg = document.createElement("a-plane");
        // signBg.setAttribute('position', '0 -0.7 -0.01');
        // signBg.setAttribute('color', '#666');
        // signBg.setAttribute('width', '3.2');
        // signBg.setAttribute('height', '2');
        // signHeadline.appendChild(signBg);
    });
}

// -------- ENTITY VISIBILITY SWITCHER --------
function switchVisibility(asset) {
    let visibleAttrValue = asset.getAttribute("visible");
    asset.setAttribute("visible", (!visibleAttrValue).toString());
}
