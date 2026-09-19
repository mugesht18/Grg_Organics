/* ==========================================================================
   GRG ORGANICS - INTERACTIVE JAVASCRIPT CONTROLLER
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    // --- 1. Branded Preloader ---
    const preloader = document.querySelector(".preloader");
    if (preloader) {
        window.addEventListener("load", function () {
            setTimeout(function () {
                preloader.classList.add("fade-out");
            }, 500);
        });
        // Fallback safety timeout if window load fires quickly
        setTimeout(function () {
            preloader.classList.add("fade-out");
        }, 1200);
    }

    // --- 2. Sticky Glassmorphism Header ---
    const siteHeader = document.querySelector(".site-header");
    if (siteHeader) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 40) {
                siteHeader.classList.add("scrolled");
            } else {
                siteHeader.classList.remove("scrolled");
            }
        });
    }

    // --- 3. Scroll Reveal Animations (IntersectionObserver) ---
    const revealElements = document.querySelectorAll(".reveal-on-scroll, .reveal-stagger");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        revealElements.forEach((el) => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach((el) => el.classList.add("revealed"));
    }

    // --- 4. Animated Number Counters ---
    const statNumbers = document.querySelectorAll(".stat-number");
    if (statNumbers.length > 0 && "IntersectionObserver" in window) {
        const statsObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target;
                        const finalValue = parseInt(target.getAttribute("data-count"), 10);
                        const suffix = target.getAttribute("data-suffix") || "";
                        let current = 0;
                        const duration = 1500;
                        const increment = Math.ceil(finalValue / (duration / 30));

                        const counterTimer = setInterval(() => {
                            current += increment;
                            if (current >= finalValue) {
                                target.textContent = finalValue + suffix;
                                clearInterval(counterTimer);
                            } else {
                                target.textContent = current + suffix;
                            }
                        }, 30);

                        observer.unobserve(target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        statNumbers.forEach((num) => statsObserver.observe(num));
    }

    // --- 5. Scroll-To-Top Button ---
    const scrollTopBtn = document.querySelector(".scroll-top-btn");
    if (scrollTopBtn) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add("visible");
            } else {
                scrollTopBtn.classList.remove("visible");
            }
        });

        scrollTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // --- 6. Desktop Custom Organic Cursor ---
    const cursorDot = document.querySelector(".custom-cursor");
    const cursorFollower = document.querySelector(".custom-cursor-follower");

    if (cursorDot && cursorFollower && window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener("mousemove", function (e) {
            cursorDot.style.left = e.clientX + "px";
            cursorDot.style.top = e.clientY + "px";

            cursorFollower.style.left = e.clientX + "px";
            cursorFollower.style.top = e.clientY + "px";
        });
    }
});

// --- 7. Mobile Drawer Navigation Handlers ---
function showNavbar() {
    const drawer = document.querySelector(".mobile-drawer");
    const overlay = document.querySelector(".mobile-drawer-overlay");
    if (drawer && overlay) {
        drawer.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeNavbar() {
    const drawer = document.querySelector(".mobile-drawer");
    const overlay = document.querySelector(".mobile-drawer-overlay");
    if (drawer && overlay) {
        drawer.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    }
}

// --- 8. Order Modal Handlers ---
function openOrderModal(productName, productPrice, productImage) {
    const modalOverlay = document.getElementById("orderModalOverlay");
    const modalTitle = document.getElementById("modalProductName");
    const modalPrice = document.getElementById("modalProductPrice");
    const modalImg = document.getElementById("modalProductImg");
    const inputProduct = document.getElementById("orderProductNameInput");

    if (modalOverlay) {
        if (modalTitle) modalTitle.textContent = productName;
        if (modalPrice) modalPrice.textContent = "₹" + productPrice;
        if (modalImg && productImage) modalImg.src = productImage;
        if (inputProduct) inputProduct.value = productName + " - ₹" + productPrice;

        modalOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeOrderModal() {
    const modalOverlay = document.getElementById("orderModalOverlay");
    if (modalOverlay) {
        modalOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }
}

function handleOrderSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("orderCustomerName") ? document.getElementById("orderCustomerName").value : "";
    const phone = document.getElementById("orderCustomerPhone") ? document.getElementById("orderCustomerPhone").value : "";
    const address = document.getElementById("orderCustomerAddress") ? document.getElementById("orderCustomerAddress").value : "";
    const product = document.getElementById("orderProductNameInput") ? document.getElementById("orderProductNameInput").value : "Product";

    const text = `Hello GRG Organics! I would like to order: ${product}.%0A%0AName: ${name}%0APhone: ${phone}%0ADelivery Address: ${address}`;
    const whatsappUrl = `https://wa.me/919454567890?text=${text}`;

    window.open(whatsappUrl, "_blank");
    closeOrderModal();
}