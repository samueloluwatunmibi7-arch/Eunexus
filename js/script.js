// ==========================================
// 1. LUCIDE ICON INITIALIZATION
// ==========================================

lucide.createIcons();

// ==========================================
// 2. MOBILE NAVIGATION
// ==========================================

const menuToggle = document.querySelector("#menu-toggle");
const mainNavigation = document.querySelector("#main-navigation");
const siteHeader = document.querySelector(".site-header");

if (menuToggle && mainNavigation && siteHeader) {

    // OPEN AND CLOSE THE MOBILE MENU
    menuToggle.addEventListener("click", () => {

        const isMenuOpen = siteHeader.classList.toggle("menu-open");

        menuToggle.setAttribute("aria-expanded", isMenuOpen);

        menuToggle.setAttribute(
            "aria-label",
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    // CLOSE MENU WHEN A NAVIGATION LINK IS CLICKED
    const navigationLinks = mainNavigation.querySelectorAll(".nav-list a");

    navigationLinks.forEach(link => {

        link.addEventListener("click", () => {

            siteHeader.classList.remove("menu-open");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute("aria-label", "Open navigation menu");

        });

    });

    // CLOSE MENU WHEN ESCAPE KEY IS PRESSED
    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            siteHeader.classList.remove("menu-open");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute("aria-label", "Open navigation menu");

        }

    });

}

// ==========================================
// 3. NEWSLETTER FORM
// ==========================================

const newsletterForm = document.querySelector(".newsletter-form");
const newsletterEmail = document.querySelector("#newsletter-email");
const newsletterMessage = document.querySelector("#newsletter-message");

if (newsletterForm && newsletterEmail && newsletterMessage) {

    newsletterForm.addEventListener("submit", (event) => {

        // Prevent the form from reloading the page
        event.preventDefault();

        // Clear previous feedback
        newsletterMessage.textContent = "";
        newsletterMessage.className = "newsletter-message";

        // Validate the email
        if (!newsletterEmail.validity.valid) {

            newsletterMessage.textContent = "Please enter a valid email address.";
            newsletterMessage.classList.add("error");

            newsletterEmail.focus();

            return;
        }

        // Display success feedback
        newsletterMessage.textContent = "Thank you! Your email has been submitted successfully.";
        newsletterMessage.classList.add("success");

        // Clear the input field
        newsletterEmail.value = "";

    });

}

// ==========================================
// 5. SCROLL EFFECTS
// ==========================================

// Enable JavaScript-dependent CSS effects
document.documentElement.classList.add("js-enabled");


// HEADER SCROLL STATE



if (siteHeader) {

    const updateHeader = () => {

        if (window.scrollY > 40) {
            siteHeader.classList.add("is-scrolled");
        } else {
            siteHeader.classList.remove("is-scrolled");
        }

    };

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    // Set the correct state when the page loads
    updateHeader();

}


// REVEAL ANIMATIONS

const revealElements = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    // Fallback for older browsers
    revealElements.forEach(element => {
        element.classList.add("is-visible");
    });

}