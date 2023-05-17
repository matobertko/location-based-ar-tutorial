// -------------------------------------------------------------------
//                         CONTENT OF SIGNS 
// -------------------------------------------------------------------
let signsContent = [
    {
        headline: "Kašna",
        description: "Litinová kašna původně stávala u domu č. p. 1 na Václavské ulici na Starém Brně. V osmdesátých letech minulého století kašna zmizela z původního místa a deset let se o ní nevědělo. V devadesátých letech byla znovu nalezena a postavena na současné místo na ulici Česká.\nPůvodně kašna sloužila k napájení zvířat, spodní nádržka pro psy, střední pro koně a horní pro ptáky.",
        position: "14 2.5 -7"
    },
    {
        headline: "Nová budova",
        description: "Stávající budova má být zbourána a nahrazena novou šestipodlažní administrativní budovou.",
        position: "-11 2.5 4"
    },
    {
        headline: "Zvýšená křižovatka",
        description: "Zvýšení křižovatky umožní zpomalení vjíždějících vozidel a usnadní pohyb chodců.",
        position: "19 2.5 19"
    },
    {
        headline: "Koše na tříděný odpad",
        description: "Nový mobiliář umožní třídění odpadu.",
        position: "28 2.5 28"
    }
];

for (let level_number = 1; level_number <= 5; level_number++) {
    signsContent.push({
        headline: level_number + '. NP',
        position: `-13 ${-2 + 4 * level_number} 10`
    });
}

// -------------------------------------------------------------------
//                      AFTER LOADING THE PAGE 
// -------------------------------------------------------------------
window.onload = () => {
    // ------ get scene element ----------------------------------------------
    let scene = document.querySelector('a-scene');

    // ------ change GPS coords if needed ------------------------------------
    if (confirm('Chcete vidět model přímo na křižovatce Křídlovická?')) {
        console.log('Kridlovicka location');
    } else {
        console.log('Location of the user');
        useUsersGPSCoords(scene);
    }  

    // ------ create SIGNS iteratively and add them to crossroad entity ------
    createSigns(scene.querySelector('#crossroad'), signsContent);

    // ------ manage VISUALISATION BUTTONS -----------------------------------
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
    
    // ------ manage LOADING POPUP -------------------------------------------
    if (scene.hasLoaded) {
        pageLoaded();
    } else {
        scene.addEventListener('loaded', pageLoaded);
    }
};

// --------------------------------------------------------------------------
//                          HELPER FUNCTIONS
// --------------------------------------------------------------------------
/**
 * closes LOADER POPUP div 
 */
function pageLoaded () {
    document.getElementById('loader-overlay').style.display = 'none';
}

/**
 * Procedure sets new coordinates obtained from the user to all entities.
 * In case of error (user denied GPS perm. / device doesnt provide GPS signal / ...) 
 * coordinates dont change from default values.
 * @param {object} scene - a-scene entity
 */
function useUsersGPSCoords(scene) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                
                // switch coords for all entities
                let entities = scene.querySelectorAll("a-entity");
                entities.forEach((entity) => {
                    entity.setAttribute('gps-projected-entity-place', `latitude: ${lat}; longitude: ${long};`);
                });
                console.log("Coordinates were switched");
            }, 
            function() {
                console.log("Cannot get GPS coordinates");
            });
    } else {
        console.log("This browser does not support GPS.");
    }
}

/**
 * Inicial procedure, which creates information signs defined in 'signsContent' array
 * @param {object} crossroad    - parent entity representing base model; contains all other model entities
 * @param {object} signsContent - array with defined text for signs
 */
function createSigns(crossroad, signsContent) {
    signsContent.forEach(signContent => {
        // HEADLINE
        const signHeadline = document.createElement("a-text");
        signHeadline.setAttribute('value', signContent.headline);
        signHeadline.setAttribute('position', signContent.position);
        signHeadline.setAttribute('color', '#DA2128');
        signHeadline.setAttribute('align', 'center');
        signHeadline.setAttribute('baseline', 'bottom');
        signHeadline.setAttribute('shader', 'msdf');
        signHeadline.setAttribute('side', 'double');
        signHeadline.setAttribute('negate', 'false');
        signHeadline.setAttribute('width', '10');
        signHeadline.setAttribute('font', './fonts/NunitoSans-ExtraBold-msdf.json');
        signHeadline.setAttribute('fontImage', './fonts/NunitoSans-ExtraBold.png');
        signHeadline.setAttribute('visible', 'false');
        signHeadline.setAttribute('look-at', '[gps-projected-camera]');
        crossroad.appendChild(signHeadline);        

        // DESCRIPTION (if provided)
        if (signContent.description) {
            const signDescription = document.createElement("a-text");
            signDescription.setAttribute('value', signContent.description);
            signDescription.setAttribute('position', '0 -0.2 0');
            signDescription.setAttribute('color', 'black');
            signDescription.setAttribute('align', 'center');
            signDescription.setAttribute('anchor', 'center');
            signDescription.setAttribute('baseline', 'top');
            signDescription.setAttribute('shader', 'msdf');
            signDescription.setAttribute('side', 'double');
            signDescription.setAttribute('negate', 'false');
            signDescription.setAttribute('width', '4');
            signDescription.setAttribute('wrap-Count', '40');
            signDescription.setAttribute('font', './fonts/NunitoSans-Regular-msdf.json');
            signDescription.setAttribute('fontImage', './fonts/NunitoSans-Regular.png');
            signDescription.setAttribute('visible', 'false');
            signHeadline.appendChild(signDescription);
        }
    });
}

/**
 * Procedure switches visibility of the selected entity
 * @param {object} asset - selected model entity  
 */
function switchVisibility(asset) {
    let visibleAttrValue = asset.getAttribute("visible");
    asset.setAttribute("visible", (!visibleAttrValue).toString());
}
