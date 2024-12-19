const wishlistForm = document.getElementById("wishlistForm");
const wishlistItems = document.getElementById("wishlistItems");
const cancelButton = document.getElementById("cancelButton");
const shareButton = document.getElementById("shareButton");
const generatedLink = document.getElementById("generatedLink");
const shareableLink = document.getElementById("shareableLink");

let wishlist = [];
let editIndex = null; // To keep track of the item being edited

// Add/Edit Wishlist Item
wishlistForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("itemName").value.trim();
    const description = document.getElementById("itemDescription").value.trim();
    const price = document.getElementById("itemPrice").value.trim();
    const link = document.getElementById("itemLink").value.trim();
    const imageFile = document.getElementById("itemImage").files[0];

    // Prepare image URL
    const imageURL = imageFile ? URL.createObjectURL(imageFile) : "https://via.placeholder.com/150";

    if (!name) {
        alert("Gift name is required!");
        return;
    }

    const newItem = { name, description, price: price ? `$${parseFloat(price).toFixed(2)}` : "N/A", link, image: imageURL };

    if (editIndex !== null) {
        wishlist[editIndex] = newItem; // Update existing item
        editIndex = null;
    } else {
        wishlist.push(newItem); // Add new item
    }

    renderWishlist();
    wishlistForm.reset();
});

// Render Wishlist
function renderWishlist() {
    wishlistItems.innerHTML = "";
    wishlist.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "wishlist-card";

        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="wishlist-image">
            <h4>${item.name}</h4>
            <p>${item.description}</p>
            <p><strong>Price:</strong> ${item.price}</p>
            ${item.link ? `<a href="${item.link}" target="_blank">View Product</a>` : ""}
            <div class="wishlist-actions">
                <button onclick="editItem(${index})">✏️ Edit</button>
                <button onclick="deleteItem(${index})">🗑️ Delete</button>
            </div>
        `;

        wishlistItems.appendChild(card);
    });
}

// Edit Item
function editItem(index) {
    const item = wishlist[index];
    document.getElementById("itemName").value = item.name;
    document.getElementById("itemDescription").value = item.description;
    document.getElementById("itemPrice").value = item.price.replace("$", "");
    document.getElementById("itemLink").value = item.link || "";
    editIndex = index; // Set the current item index for editing
}

// Delete Item
function deleteItem(index) {
    wishlist.splice(index, 1);
    renderWishlist();
}

// Cancel Button
cancelButton.addEventListener("click", () => {
    wishlistForm.reset();
    editIndex = null; // Reset editing
});

// Share Wishlist
shareButton.addEventListener("click", () => {
    const baseURL = window.location.href.split("?")[0];
    const encodedWishlist = encodeURIComponent(JSON.stringify(wishlist));
    const shareURL = `${baseURL}?wishlist=${encodedWishlist}`;
    generatedLink.href = shareURL;
    generatedLink.textContent = shareURL;
    shareableLink.style.display = "block";
});

// Load Wishlist from URL
function loadWishlistFromURL() {
    const params = new URLSearchParams(window.location.search);
    const wishlistData = params.get("wishlist");
    if (wishlistData) {
        wishlist = JSON.parse(decodeURIComponent(wishlistData));
        renderWishlist();
    }
}

loadWishlistFromURL();
