// Get all the item titles and descriptions
var itemTitles = document.querySelectorAll('.item-title');
var itemDescriptions = document.querySelectorAll('.item-description');

// Loop through all the item titles
for (var i = 0; i < itemTitles.length; i++) {
  // Add a click event listener to each item title
  itemTitles[i].addEventListener('click', function() {
    // Toggle the 'active' class on the clicked item title
    this.classList.toggle('active');

    // Get the associated item description
    var itemDescription = this.nextElementSibling;

    // Toggle the 'open' class on the item description
    itemDescription.classList.toggle('open');

    // Check if the item description is open
    if (itemDescription.classList.contains('open')) {
      // Set the max-height to the actual height of the item description
      itemDescription.style.maxHeight = itemDescription.scrollHeight + 'px';
    } else {
      // Set the max-height back to 0
      itemDescription.style.maxHeight = 0;
    }
  });
}

// // Get the parent element that contains all the list items
// var itemList = document.querySelector('.item-list');

// // Add a click event listener to the parent element
// itemList.addEventListener('click', function(event) {
//   // Check if the clicked element is an item title
//   if (event.target.classList.contains('item-title')) {
//     // Toggle the 'active' class on the clicked item title
//     event.target.classList.toggle('active');

//     // Get the associated item description
//     var itemDescription = event.target.nextElementSibling;

//     // Toggle the 'open' class on the item description
//     itemDescription.classList.toggle('open');

//     // Check if the item description is open
//     if (itemDescription.classList.contains('open')) {
//       // Set the max-height to the actual height of the item description
//       itemDescription.style.maxHeight = itemDescription.scrollHeight + 'px';
//     } else {
//       // Set the max-height back to 0
//       itemDescription.style.maxHeight = 0;
//     }
//   }
// });

function copyToClipboard() {
    navigator.clipboard.writeText('https://matobertko.github.io/location-based-ar-tutorial/app.html');
    alert("Odkaz bol skopírovaný do schránky");
} 
