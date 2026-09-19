/* ==========================================================================
   GRG ORGANICS - PURCHASE PAGE SEARCH & CATEGORY FILTERING
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const productContainer = document.getElementById("imagess");
    const searchInput = document.getElementById("search");
    const categoryTabs = document.querySelectorAll(".category-tab");

    if (!productContainer) return;

    const productCards = productContainer.querySelectorAll(".product-card");
    let currentCategory = "all";
    let currentSearchTerm = "";

    function filterProducts() {
        productCards.forEach((card) => {
            const productName = card.querySelector(".product-name")
                ? card.querySelector(".product-name").textContent.toLowerCase()
                : "";
            const productCategory = card.getAttribute("data-category") || "all";

            const matchesSearch = productName.includes(currentSearchTerm);
            const matchesCategory = currentCategory === "all" || productCategory === currentCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = "flex";
                card.style.opacity = "1";
                card.style.transform = "scale(1)";
            } else {
                card.style.display = "none";
                card.style.opacity = "0";
                card.style.transform = "scale(0.95)";
            }
        });
    }

    // Keyup search input listener
    if (searchInput) {
        searchInput.addEventListener("keyup", function (e) {
            currentSearchTerm = e.target.value.toLowerCase().trim();
            filterProducts();
        });
    }

    // Category tabs click listener
    categoryTabs.forEach((tab) => {
        tab.addEventListener("click", function () {
            categoryTabs.forEach((t) => t.classList.remove("active"));
            this.classList.add("active");

            currentCategory = this.getAttribute("data-category") || "all";
            filterProducts();
        });
    });
});