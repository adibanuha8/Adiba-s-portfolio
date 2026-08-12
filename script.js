// ==========================================
// ADIBA - PERSONAL PORTFOLIO
// script.js
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // MOBILE MENU
    // ==============================

    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".nav-links");

    if (menuBtn && nav) {
        menuBtn.addEventListener("click", () => {
            nav.classList.toggle("active");
            menuBtn.classList.toggle("active");
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("active");
                menuBtn.classList.remove("active");
            });
        });
    }


    // ==============================
    // SMOOTH SCROLL
    // ==============================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // ==============================
    // SCROLL REVEAL ANIMATION
    // ==============================

    const revealElements = document.querySelectorAll(
        ".reveal, .section, .skill-card, .project-card, .timeline-item"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });


    // ==============================
    // ACTIVE NAVIGATION
    // ==============================

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");

            if (
                link.getAttribute("href") === `#${currentSection}`
            ) {
                link.classList.add("active");
            }
        });
    });


    // ==============================
    // TYPING EFFECT
    // ==============================

    const typingElement = document.querySelector(".typing-text");

    if (typingElement) {

        const words = [
            "Student",
            "Creator",
            "AI Creator",
            "Web Enthusiast",
            "Future Developer"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentWord = words[wordIndex];

            if (!deleting) {

                typingElement.textContent =
                    currentWord.substring(0, charIndex + 1);

                charIndex++;

                if (charIndex === currentWord.length) {
                    deleting = true;

                    setTimeout(typeEffect, 1500);
                    return;
                }

            } else {

                typingElement.textContent =
                    currentWord.substring(0, charIndex - 1);

                charIndex--;

                if (charIndex === 0) {
                    deleting = false;
                    wordIndex++;

                    if (wordIndex >= words.length) {
                        wordIndex = 0;
                    }
                }
            }

            setTimeout(
                typeEffect,
                deleting ? 60 : 110
            );
        }

        typeEffect();
    }


    // ==============================
    // SKILL PROGRESS ANIMATION
    // ==============================

    const skillBars = document.querySelectorAll(".skill-progress");

    const skillObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const percentage =
                        entry.target.dataset.progress;

                    entry.target.style.width =
                        percentage + "%";

                    skillObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.5
        }
    );

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });


    // ==============================
    // PROJECT FILTER
    // ==============================

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projects =
        document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const filter =
                button.dataset.filter;

            projects.forEach(project => {

                const category =
                    project.dataset.category;

                if (
                    filter === "all" ||
                    category === filter
                ) {

                    project.style.display = "block";

                    setTimeout(() => {
                        project.style.opacity = "1";
                        project.style.transform =
                            "translateY(0)";
                    }, 50);

                } else {

                    project.style.opacity = "0";
                    project.style.transform =
                        "translateY(20px)";

                    setTimeout(() => {
                        project.style.display = "none";
                    }, 300);
                }

            });

        });

    });


    // ==============================
    // BACK TO TOP
    // ==============================

    const backToTop =
        document.querySelector(".back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        });

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    // ==============================
    // CURRENT YEAR
    // ==============================

    const yearElement =
        document.querySelector("#currentYear");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    // ==============================
    // VISITOR RATING SYSTEM
    // ==============================

    const ratingStars =
        document.querySelectorAll(".rating-star");

    const ratingMessage =
        document.querySelector(".rating-message");

    let selectedRating = 0;

    ratingStars.forEach((star, index) => {

        star.addEventListener("mouseenter", () => {

            const rating = index + 1;

            ratingStars.forEach((item, i) => {

                item.classList.toggle(
                    "hovered",
                    i < rating
                );

            });

        });


        star.addEventListener("mouseleave", () => {

            ratingStars.forEach(item => {
                item.classList.remove("hovered");
            });

        });


        star.addEventListener("click", () => {

            selectedRating = index + 1;

            ratingStars.forEach((item, i) => {

                item.classList.toggle(
                    "selected",
                    i < selectedRating
                );

            });

            if (ratingMessage) {

                ratingMessage.textContent =
                    `Thank you for rating Adiba's portfolio ${selectedRating}/5 ⭐`;

            }

            localStorage.setItem(
                "adibaPortfolioRating",
                selectedRating
            );

        });

    });


    // ==============================
    // LOAD PREVIOUS RATING
    // ==============================

    const savedRating =
        localStorage.getItem("adibaPortfolioRating");

    if (savedRating) {

        selectedRating =
            Number(savedRating);

        ratingStars.forEach((star, index) => {

            star.classList.toggle(
                "selected",
                index < selectedRating
            );

        });

        if (ratingMessage) {

            ratingMessage.textContent =
                `You rated this portfolio ${selectedRating}/5 ⭐`;

        }
    }


    // ==============================
    // CURSOR GLOW
    // ==============================

    const cursorGlow =
        document.querySelector(".cursor-glow");

    if (cursorGlow && window.innerWidth > 768) {

        document.addEventListener("mousemove", e => {

            cursorGlow.style.left =
                e.clientX + "px";

            cursorGlow.style.top =
                e.clientY + "px";

        });

    }


    // ==============================
    // MAGNETIC BUTTON EFFECT
    // ==============================

    const magneticButtons =
        document.querySelectorAll(".magnetic");

    magneticButtons.forEach(button => {

        button.addEventListener("mousemove", e => {

            const rect =
                button.getBoundingClientRect();

            const x =
                e.clientX -
                rect.left -
                rect.width / 2;

            const y =
                e.clientY -
                rect.top -
                rect.height / 2;

            button.style.transform =
                `translate(${x * 0.15}px, ${y * 0.15}px)`;

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform =
                "translate(0, 0)";

        });

    });


    // ==============================
    // IMAGE PREVIEW
    // ==============================

    const profileImage =
        document.querySelector("#profileImage");

    if (profileImage) {

        profileImage.addEventListener("error", () => {

            profileImage.src =
                "https://via.placeholder.com/500x500?text=Adiba";

        });

    }


    // ==============================
    // CONSOLE MESSAGE
    // ==============================

    console.log(
        "%cWelcome to Adiba's Portfolio ✨",
        "font-size:20px;font-weight:bold;"
    );

});
