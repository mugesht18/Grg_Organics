/* ==========================================================================
   GRG ORGANICS - INTERACTIVE JAVASCRIPT CONTROLLER & MOTION ENGINE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    // --- 1. Scroll Progress Bar Controller ---
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress-bar";
    document.body.appendChild(progressBar);

    function updateScrollProgress() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.width = progress + "%";
    }

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();

    // --- 2. Branded Preloader ---
    const preloader = document.querySelector(".preloader");
    if (preloader) {
        const fadePreloader = () => {
            preloader.classList.add("fade-out");
        };
        window.addEventListener("load", fadePreloader);
        setTimeout(fadePreloader, 1000); // Quick elegant reveal
    }

    // --- 3. Sticky Glassmorphism Header ---
    const siteHeader = document.querySelector(".site-header");
    if (siteHeader) {
        const handleHeaderScroll = () => {
            if (window.scrollY > 30) {
                siteHeader.classList.add("scrolled");
            } else {
                siteHeader.classList.remove("scrolled");
            }
        };
        window.addEventListener("scroll", handleHeaderScroll, { passive: true });
        handleHeaderScroll();
    }

    // --- 4. IntersectionObserver for Scroll Reveals & Mask Reveals ---
    const revealTargets = document.querySelectorAll(".reveal-on-scroll, .reveal-stagger, .text-reveal, .img-reveal-box");
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
            { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
        );

        revealTargets.forEach((el) => revealObserver.observe(el));
    } else {
        revealTargets.forEach((el) => el.classList.add("revealed"));
    }

    // --- 5. Animated Number Counters ---
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
                        const duration = 1400;
                        const stepTime = 30;
                        const steps = duration / stepTime;
                        const increment = finalValue / steps;

                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= finalValue) {
                                target.textContent = finalValue + suffix;
                                clearInterval(timer);
                            } else {
                                target.textContent = Math.floor(current) + suffix;
                            }
                        }, stepTime);

                        observer.unobserve(target);
                    }
                });
            },
            { threshold: 0.4 }
        );

        statNumbers.forEach((num) => statsObserver.observe(num));
    }

    // --- 6. Scroll-To-Top Button ---
    const scrollTopBtn = document.querySelector(".scroll-top-btn");
    if (scrollTopBtn) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 350) {
                scrollTopBtn.classList.add("visible");
            } else {
                scrollTopBtn.classList.remove("visible");
            }
        }, { passive: true });

        scrollTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // --- 7. Desktop Custom Organic Cursor ---
    const cursorDot = document.querySelector(".custom-cursor");
    const cursorFollower = document.querySelector(".custom-cursor-follower");

    if (cursorDot && cursorFollower && window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener("mousemove", function (e) {
            cursorDot.style.left = e.clientX + "px";
            cursorDot.style.top = e.clientY + "px";

            cursorFollower.style.left = e.clientX + "px";
            cursorFollower.style.top = e.clientY + "px";
        }, { passive: true });
    }

    // --- 8. Hero Mouse Parallax Effect (Desktop Fine Pointer Only) ---
    const isDesktop = window.matchMedia("(pointer: fine) and (min-width: 992px)").matches;
    const heroSection = document.querySelector(".hero-section");
    
    if (isDesktop && heroSection) {
        const parallaxElements = heroSection.querySelectorAll("[data-parallax-speed]");
        
        heroSection.addEventListener("mousemove", function (e) {
            const rect = heroSection.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) / (rect.width / 2);
            const deltaY = (e.clientY - centerY) / (rect.height / 2);

            parallaxElements.forEach((el) => {
                const speed = parseFloat(el.getAttribute("data-parallax-speed")) || 10;
                const moveX = deltaX * speed;
                const moveY = deltaY * speed;
                el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            });
        }, { passive: true });

        heroSection.addEventListener("mouseleave", function () {
            parallaxElements.forEach((el) => {
                el.style.transform = "translate3d(0, 0, 0)";
                el.style.transition = "transform 0.6s ease-out";
            });
        });
    }

    // --- 9. Dynamic Organic Background Breeze Particles ---
    const createOrganicParticles = () => {
        const container = document.querySelector(".hero-overlay-shapes");
        if (!container) return;

        for (let i = 0; i < 6; i++) {
            const particle = document.createElement("div");
            particle.className = "organic-particle";
            const size = Math.random() * 60 + 20;
            particle.style.width = size + "px";
            particle.style.height = size + "px";
            particle.style.top = Math.random() * 80 + 10 + "%";
            particle.style.left = Math.random() * 90 + 5 + "%";
            particle.style.animationDelay = Math.random() * 5 + "s";
            particle.style.animationDuration = Math.random() * 10 + 10 + "s";
            container.appendChild(particle);
        }
    };
    createOrganicParticles();
});

// --- 10. Mobile Drawer Navigation Handlers ---
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

// --- 11. Order Modal Handlers ---
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