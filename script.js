// ==========================================
// 1. NEHA TILES - 78 IMAGE CATALOGUE
// ==========================================

const tilesData = Array.from({ length: 78 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");

  return {
    id: index + 1,

    // Product name
    name: `Tile Collection ${number}`,

    // Tile specifications
    size: "600x1200mm",
    finish: "Glossy",
    random: "4 Faces",

    // Categories
    category: ["Glossy Tiles", "Marble-Look", "Living Room"],

    // Price
    price: "₹60–₹120 / sq. ft.",

    // Image
    image: `tile-catalogue-${number}.jpg`,

    // Backup image
    mockup: `tile-catalogue-${number}.jpg`,

    // Description
    description:
      "Premium quality tile design suitable for modern residential and commercial interiors."
  };
});

let currentTileIndex = 0;
let filteredTiles = [...tilesData];


// ==========================================
// 2. PRODUCT GRID RENDERING
// ==========================================

const productsGrid = document.getElementById("productsGrid");

function renderProducts(tiles) {

  if (!tiles || tiles.length === 0) {

    productsGrid.innerHTML = `
      <div style="
        grid-column: 1/-1;
        text-align: center;
        padding: 50px 20px;
        color: var(--text-muted);
      ">
        <h3>No tiles matched your search</h3>
        <p>Try searching for another pattern or click 'All Tiles'.</p>
      </div>
    `;

    return;
  }

  productsGrid.innerHTML = tiles.map(tile => {

    const waMsg = encodeURIComponent(
      `Hello Vishal bhai, I am interested in ${tile.name} (${tile.size}, ${tile.finish}) from Neha Tiles website.`
    );

    return `
      <div class="product-card">

        <div
          class="product-img-wrap"
          onclick="openModal(${tile.id})"
        >

          <span class="finish-pill">
            ${tile.finish}
          </span>

          <img
            src="${tile.image}"
            alt="${tile.name} - Neha Tiles"
            loading="lazy"
            onerror="this.onerror=null; this.src='${tile.mockup}';"
          />

        </div>


        <div class="product-info">

          <h3 class="product-name">
            ${tile.name}
          </h3>


          <div class="product-specs">

            <span>
              📏 ${tile.size}
            </span>

            <span>
              🎲 ${tile.random}
            </span>

          </div>


          <div class="product-pricing-label">
            Price: ${tile.price}
          </div>


          <div class="product-card-actions">

            <button
              class="btn btn-outline"
              onclick="openModal(${tile.id})"
            >
              View Details
            </button>


            <a
              href="https://wa.me/9190999929185?text=${waMsg}"
              target="_blank"
              class="btn btn-whatsapp"
            >
              Enquire
            </a>

          </div>

        </div>

      </div>
    `;

  }).join("");
}


// ==========================================
// 3. SEARCH & CATEGORY FILTERING
// ==========================================

const searchInput = document.getElementById("searchInput");
const filterBtns = document.querySelectorAll(".filter-btn");

function applyFilters() {

  const query = searchInput
    ? searchInput.value.toLowerCase().trim()
    : "";

  const activeBtn =
    document.querySelector(".filter-btn.active");

  const activeFilter =
    activeBtn
      ? activeBtn.getAttribute("data-filter")
      : "all";


  filteredTiles = tilesData.filter(tile => {

    const matchesCat =
      activeFilter === "all" ||
      tile.category.includes(activeFilter);


    const matchesQuery =
      tile.name.toLowerCase().includes(query) ||
      tile.size.toLowerCase().includes(query) ||
      tile.finish.toLowerCase().includes(query) ||
      tile.description.toLowerCase().includes(query);


    return matchesCat && matchesQuery;

  });


  renderProducts(filteredTiles);
}


if (searchInput) {
  searchInput.addEventListener(
    "input",
    applyFilters
  );
}


filterBtns.forEach(btn => {

  btn.addEventListener("click", () => {

    filterBtns.forEach(b =>
      b.classList.remove("active")
    );

    btn.classList.add("active");

    applyFilters();

  });

});


// ==========================================
// 4. LIGHTBOX / MODAL
// ==========================================

const modalOverlay =
  document.getElementById("modalOverlay");

const modalImg =
  document.getElementById("modalImg");

const modalTitle =
  document.getElementById("modalTitle");

const modalDesc =
  document.getElementById("modalDesc");

const modalSize =
  document.getElementById("modalSize");

const modalFinish =
  document.getElementById("modalFinish");

const modalRandom =
  document.getElementById("modalRandom");

const modalPrice =
  document.getElementById("modalPrice");

const modalCategory =
  document.getElementById("modalCategory");

const modalWhatsAppBtn =
  document.getElementById("modalWhatsAppBtn");


function openModal(tileId) {

  currentTileIndex =
    tilesData.findIndex(
      tile => tile.id === tileId
    );

  updateModalContent();

  if (modalOverlay) {
    modalOverlay.classList.add("active");
  }

  document.body.style.overflow = "hidden";
}


function closeModal() {

  if (modalOverlay) {
    modalOverlay.classList.remove("active");
  }

  document.body.style.overflow = "auto";
}


function updateModalContent() {

  const tile =
    tilesData[currentTileIndex];

  if (!tile) return;


  modalTitle.textContent =
    tile.name;

  modalDesc.textContent =
    tile.description;

  modalSize.textContent =
    tile.size;

  modalFinish.textContent =
    tile.finish;

  modalRandom.textContent =
    tile.random;

  modalPrice.textContent =
    tile.price;

  modalCategory.textContent =
    tile.category.join(" • ");


  modalImg.src =
    tile.image;


  modalImg.onerror = function () {

    this.onerror = null;

    this.src = tile.mockup;

  };


  const waMsg = encodeURIComponent(
    `Hello Vishal Patel (Neha Tiles), I am viewing ${tile.name} on your website. Please share box quantity availability and current price.`
  );


  if (modalWhatsAppBtn) {

    modalWhatsAppBtn.href =
      `https://wa.me/9190999929185?text=${waMsg}`;

  }

}


// ==========================================
// 5. NEXT / PREVIOUS TILE
// ==========================================

function nextTile() {

  currentTileIndex =
    (currentTileIndex + 1) %
    tilesData.length;

  updateModalContent();
}


function prevTile() {

  currentTileIndex =
    (currentTileIndex - 1 + tilesData.length) %
    tilesData.length;

  updateModalContent();
}


if (modalOverlay) {

  modalOverlay.addEventListener("click", (e) => {

    if (e.target === modalOverlay) {
      closeModal();
    }

  });

}


// Keyboard controls

document.addEventListener("keydown", (e) => {

  if (
    modalOverlay &&
    modalOverlay.classList.contains("active")
  ) {

    if (e.key === "Escape") {
      closeModal();
    }

    if (e.key === "ArrowRight") {
      nextTile();
    }

    if (e.key === "ArrowLeft") {
      prevTile();
    }

  }

});


// ==========================================
// 6. CONTACT FORM → WHATSAPP
// ==========================================

function handleFormSubmit(e) {

  e.preventDefault();


  const name =
    document.getElementById("custName").value;

  const phone =
    document.getElementById("custPhone").value;

  const category =
    document.getElementById("custCat").value;

  const msg =
    document.getElementById("custMsg").value;


  const waText = encodeURIComponent(

    `*New Enquiry from Neha Tiles Website*\n` +

    `👤 Name: ${name}\n` +

    `📱 Phone: ${phone}\n` +

    `🧱 Category: ${category}\n` +

    `📝 Requirement: ${
      msg || "Interested in visiting showroom"
    }`

  );


  window.open(
    `https://wa.me/9190999929185?text=${waText}`,
    "_blank"
  );

}


// ==========================================
// 7. DYNAMIC FOOTER YEAR
// ==========================================

const yearSpan =
  document.getElementById("currentYear");

if (yearSpan) {

  yearSpan.textContent =
    new Date().getFullYear();

}


// ==========================================
// 8. INITIAL LOAD
// ==========================================

renderProducts(tilesData);