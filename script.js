/* =========================================================
   EMAD TELECOM - MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   DOM
========================================================= */

const body = document.body;

const themeToggle = document.getElementById("themeToggle");

const navLinks = document.getElementById("navLinks");
const menuBtn = document.getElementById("menuBtn");

const productSearch = document.getElementById("productSearch");
const productItems = document.querySelectorAll(".product-item");
const noResult = document.getElementById("noResult");

const scrollTop = document.getElementById("scrollTop");

const newsletterForm = document.getElementById("newsletterForm");
const emailInput = document.getElementById("emailInput");

const toastMessage = document.getElementById("toastMessage");
const toastText = document.getElementById("toastText");


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const savedTheme = localStorage.getItem("emad-theme");

if (savedTheme === "dark") {
    body.classList.add("dark");
    updateThemeIcon();
}


function updateThemeIcon() {

    if (body.classList.contains("dark")) {

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        themeToggle.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }
}


themeToggle.addEventListener("click", () => {

    body.classList.toggle("dark");

    const currentTheme =
        body.classList.contains("dark")
            ? "dark"
            : "light";

    localStorage.setItem(
        "emad-theme",
        currentTheme
    );

    updateThemeIcon();

});


/* =========================================================
   MOBILE MENU
========================================================= */

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("open");

    const isOpen =
        navLinks.classList.contains("open");

    menuBtn.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

});


/* Close menu after clicking link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuBtn.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

    });

});


/* =========================================================
   PRODUCT SEARCH
========================================================= */

productSearch.addEventListener("input", () => {

    const searchValue =
        productSearch.value
            .toLowerCase()
            .trim();

    let visibleProducts = 0;


    productItems.forEach(item => {

        const productName =
            item.dataset.name.toLowerCase();

        const productText =
            item.innerText.toLowerCase();

        const matches =
            productName.includes(searchValue) ||
            productText.includes(searchValue);


        if (matches) {

            item.style.display = "";

            visibleProducts++;

        } else {

            item.style.display = "none";

        }

    });


    if (visibleProducts === 0) {

        noResult.style.display = "block";

    } else {

        noResult.style.display = "none";

    }

});


/* =========================================================
   PRODUCT BUTTON
========================================================= */

document.querySelectorAll(".product-bottom button")
    .forEach(button => {

        button.addEventListener("click", () => {

            showToast(
                "Product selected — contact Emad Telecom to order."
            );

        });

    });


/* =========================================================
   NEWSLETTER
========================================================= */

newsletterForm.addEventListener("submit", event => {

    event.preventDefault();

    const email =
        emailInput.value.trim();


    if (!email) {

        showToast("Please enter your email.");

        return;

    }


    if (!isValidEmail(email)) {

        showToast("Please enter a valid email.");

        return;

    }


    showToast(
        "Subscribed successfully!"
    );

    newsletterForm.reset();

});


function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;

function showToast(message) {

    toastText.textContent = message;

    toastMessage.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toastMessage.classList.remove("show");

    }, 3000);

}


/* =========================================================
   SCROLL TOP
========================================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        scrollTop.classList.add("show");

    } else {

        scrollTop.classList.remove("show");

    }

});


scrollTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navItems =
    document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navItems.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================================================
   ESC KEY - CLOSE MENU
========================================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        navLinks.classList.remove("open");

        menuBtn.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

    }

});


/* =========================================================
   IMAGE ERROR FALLBACK
========================================================= */

document.querySelectorAll("img").forEach(img => {

    img.addEventListener("error", () => {

        img.style.opacity = "0.25";

    });

});


/* =========================================================
   PAGE LOADED
========================================================= */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});