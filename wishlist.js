// Get form and list elements
const wishlistForm = document.getElementById('wishlistForm');
const wishlistItems = document.getElementById('wishlistItems');

// Add event listener to form submission
wishlistForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get input values
    const itemName = document.getElementById('itemName').value;
    const itemLink = document.getElementById('itemLink').value;
    const itemNotes = document.getElementById('itemNotes').value;
    
    // Create a new wishlist item
    const li = document.createElement('li');
    li.className = 'wishlist-item';
    
    let itemContent = `<div>
        <strong>${itemName}</strong><br>`;
    if (itemLink) {
        itemContent += `<a href="${itemLink}" target="_blank">View Item</a><br>`;
    }
    if (itemNotes) {
        itemContent += `<em>${itemNotes}</em>`;
    }
    itemContent += `</div>`;
    
    li.innerHTML = itemContent;
    
    // Add a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Remove';
    deleteBtn.addEventListener('click', function () {
        li.remove();
    });
    li.appendChild(deleteBtn);
    
    // Append the item to the wishlist
    wishlistItems.appendChild(li);
    
    // Clear form fields
    wishlistForm.reset();
});
