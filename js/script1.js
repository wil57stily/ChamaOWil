/* ==========================================================
   CHAMA O WIL
   script.js
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".header");
    const backTop = document.getElementById("backTop");
    const menu = document.querySelector(".menu");
    const menuToggle = document.querySelector(".menu-toggle");

    if (menu && menuToggle) {

        menuToggle.addEventListener("click", () => {

            const isOpen = menu.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

        });

    }

    /* ==========================================
       HEADER AO ROLAR
    ========================================== */

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            header.classList.add("header-scroll");

        } else {

            header.classList.remove("header-scroll");

        }

        if (window.scrollY > 500) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    });

    /* ==========================================
       BOTÃO VOLTAR AO TOPO
    ========================================== */

    backTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

    /* ==========================================
       MENU SUAVE
    ========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const destino = document.querySelector(this.getAttribute("href"));

            if (!destino) return;

            e.preventDefault();

            destino.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

            if (menu && menuToggle) {

                menu.classList.remove("open");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");

            }

        });

    });

    /* ==========================================
       ANIMAÇÃO AO APARECER
    ========================================== */

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("animate");

            }

        });

    }, {

        threshold: 0.15

    });

    document.querySelectorAll("section").forEach(section => {

        section.classList.add("hidden-section");

        observer.observe(section);

    });

    /* ==========================================
       MENU ATIVO
    ========================================== */

    const sections = document.querySelectorAll("section");

    const navLinks = document.querySelectorAll(".menu a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 140;

            if (pageYOffset >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

    /* ==========================================
       CARROSSEL DE TRABALHOS
    ========================================== */

    new PortfolioSlider();

});

/* ==========================================
   CARROSSEL DE TRABALHOS
========================================== */

class PortfolioSlider {

    constructor() {

        this.track = document.querySelector(".portfolio-track");
        this.cards = document.querySelectorAll(".portfolio-track .portfolio-card");
        this.prevBtn = document.querySelector(".portfolio-prev");
        this.nextBtn = document.querySelector(".portfolio-next");
        this.current = 0;
        this.visibleCount = 3;
        this.gap = 30;

        if (!this.track || !this.cards.length) return;

        this.init();

    }

    getVisibleCount() {

        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1200) return 2;
        return 3;

    }

    getMaxIndex() {

        return Math.max(0, this.cards.length - this.visibleCount);

    }

    updateSlider() {

        this.visibleCount = this.getVisibleCount();
        this.current = Math.min(this.current, this.getMaxIndex());

        const cardWidth = this.cards[0].offsetWidth;
        const offset = this.current * (cardWidth + this.gap);

        this.track.style.transform = `translateX(-${offset}px)`;

        if (this.prevBtn) {

            this.prevBtn.disabled = this.current === 0;

        }

        if (this.nextBtn) {

            this.nextBtn.disabled = this.current >= this.getMaxIndex();

        }

    }

    next() {

        if (this.current < this.getMaxIndex()) {

            this.current++;
            this.updateSlider();

        }

    }

    prev() {

        if (this.current > 0) {

            this.current--;
            this.updateSlider();

        }

    }

    init() {

        this.updateSlider();

        window.addEventListener("resize", () => this.updateSlider());

        if (this.prevBtn) {

            this.prevBtn.addEventListener("click", () => this.prev());

        }

        if (this.nextBtn) {

            this.nextBtn.addEventListener("click", () => this.next());

        }

    }

}
