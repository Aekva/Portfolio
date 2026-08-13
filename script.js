/* =========================
   PROJETS
========================= */
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", function () {
    window.scrollTo(0, 0);
});

window.addEventListener("beforeunload", function () {
    window.scrollTo(0, 0);
});

const projects = [
    {
        title: "Maison Sépia",
        category: "Restaurant / Site vitrine",
        image: "images/maison-sepia.jpg",
        alt: "Capture complète du site Maison Sépia",
        url: "https://aekva.github.io/maison-sepia/"
    },
    {
        title: "Studio Néra",
        category: "Beauté & bien-être / Site vitrine",
        image: "images/studio-nera.jpg",
        alt: "Capture complète du site Studio Néra",
        url: "https://aekva.github.io/studio-nera/"
    },
    {
        title: "BLOC.",
        category: "Artisan & services / Site vitrine",
        image: "images/bloc.jpg",
        alt: "Capture complète du site BLOC.",
        url: "https://aekva.github.io/bloc/"
    }
];



/* =========================
   CARROUSEL
========================= */

const projectStage =
    document.querySelector(
        ".project-stage"
    );

const projectCards =
    Array.from(
        document.querySelectorAll(
            ".project-card"
        )
    );

const carouselPrev =
    document.querySelector(
        ".carousel-prev"
    );

const carouselNext =
    document.querySelector(
        ".carousel-next"
    );

const carouselCurrent =
    document.querySelector(
        "#carousel-current"
    );

const carouselDots =
    Array.from(
        document.querySelectorAll(
            ".carousel-dot"
        )
    );


let currentIndex = 0;


function getPreviousIndex() {

    return (
        currentIndex -
        1 +
        projects.length
    ) % projects.length;

}


function getNextIndex() {

    return (
        currentIndex +
        1
    ) % projects.length;

}


function updateCarousel() {

    const previousIndex =
        getPreviousIndex();

    const nextIndex =
        getNextIndex();


    projectCards.forEach(
        function (card, index) {

            card.classList.remove(
                "is-active",
                "is-prev",
                "is-next"
            );


            if (
                index === currentIndex
            ) {

                card.classList.add(
                    "is-active"
                );

            }

            else if (
                index === previousIndex
            ) {

                card.classList.add(
                    "is-prev"
                );

            }

            else if (
                index === nextIndex
            ) {

                card.classList.add(
                    "is-next"
                );

            }

        }
    );


    if (carouselCurrent) {

        carouselCurrent.textContent =
            String(
                currentIndex + 1
            ).padStart(
                2,
                "0"
            );

    }


    carouselDots.forEach(
        function (dot, index) {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        }
    );

}


function nextProject() {

    currentIndex =
        (
            currentIndex +
            1
        ) % projects.length;

    updateCarousel();

}


function previousProject() {

    currentIndex =
        (
            currentIndex -
            1 +
            projects.length
        ) % projects.length;

    updateCarousel();

}


function goToProject(index) {

    if (
        index < 0 ||
        index >= projects.length
    ) {
        return;
    }


    currentIndex = index;

    updateCarousel();

}


if (carouselNext) {

    carouselNext.addEventListener(
        "click",
        nextProject
    );

}


if (carouselPrev) {

    carouselPrev.addEventListener(
        "click",
        previousProject
    );

}


/* =========================
   MODAL
========================= */

const modal =
    document.querySelector(
        ".project-modal"
    );

const modalImage =
    document.querySelector(
        ".modal-image"
    );

const modalTitle =
    document.querySelector(
        ".modal-title"
    );

const modalCategory =
    document.querySelector(
        ".modal-category"
    );

const modalCounter =
    document.querySelector(
        ".modal-counter"
    );

const modalClose =
    document.querySelector(
        ".modal-close"
    );

const modalPrev =
    document.querySelector(
        ".modal-prev"
    );

const modalNext =
    document.querySelector(
        ".modal-next"
    );


let modalIndex = 0;


function showModalProject(index) {

    if (
        !modal ||
        !modalImage
    ) {
        return;
    }


    modalIndex = index;


    const project =
        projects[modalIndex];

        if (modalLiveLink) {

            modalLiveLink.href =
                project.url;
        
        }

    modalImage.src =
        project.image;

    modalImage.alt =
        project.alt;


    if (modalTitle) {

        modalTitle.textContent =
            project.title;

    }


    if (modalCategory) {

        modalCategory.textContent =
            project.category;

    }


    if (modalCounter) {

        const current =
            String(
                modalIndex + 1
            ).padStart(
                2,
                "0"
            );

        const total =
            String(
                projects.length
            ).padStart(
                2,
                "0"
            );


        modalCounter.textContent =
            current +
            " / " +
            total;

    }


    modal.scrollTop = 0;

}


function openModal(index) {

    if (!modal) {
        return;
    }


    showModalProject(index);


    modal.classList.add(
        "active"
    );

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );


    if (modalClose) {

        modalClose.focus();

    }

}


function closeModal() {

    if (!modal) {
        return;
    }


    modal.classList.remove(
        "active"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


function nextModalProject() {

    modalIndex =
        (
            modalIndex +
            1
        ) % projects.length;


    currentIndex =
        modalIndex;


    updateCarousel();

    showModalProject(
        modalIndex
    );

}


function previousModalProject() {

    modalIndex =
        (
            modalIndex -
            1 +
            projects.length
        ) % projects.length;


    currentIndex =
        modalIndex;


    updateCarousel();

    showModalProject(
        modalIndex
    );

}


/* =========================
   CLIC PROJETS
========================= */

projectCards.forEach(
    function (card, index) {

        const preview =
            card.querySelector(
                ".project-preview"
            );

        const openButton =
            card.querySelector(
                ".project-open"
            );


        if (preview) {

            preview.addEventListener(
                "click",
                function () {

                    if (
                        index !==
                        currentIndex
                    ) {

                        goToProject(
                            index
                        );

                        return;

                    }


                    openModal(
                        index
                    );

                }
            );

        }


        if (openButton) {

            openButton.addEventListener(
                "click",
                function () {

                    if (
                        index !==
                        currentIndex
                    ) {

                        goToProject(
                            index
                        );

                        return;

                    }


                    openModal(
                        index
                    );

                }
            );

        }

    }
);


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeModal
    );

}


if (modalNext) {

    modalNext.addEventListener(
        "click",
        nextModalProject
    );

}


if (modalPrev) {

    modalPrev.addEventListener(
        "click",
        previousModalProject
    );

}


if (modal) {

    modal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                modal
            ) {

                closeModal();

            }

        }
    );

}


/* =========================
   SWIPE
========================= */

let touchStartX = 0;
let touchEndX = 0;


if (projectStage) {

    projectStage.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0]
                    .screenX;

        },
        {
            passive: true
        }
    );


    projectStage.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0]
                    .screenX;

            handleSwipe();

        },
        {
            passive: true
        }
    );

}


function handleSwipe() {

    const distance =
        touchEndX -
        touchStartX;

    const threshold = 45;


    if (
        Math.abs(distance) <
        threshold
    ) {
        return;
    }


    if (distance < 0) {

        nextProject();

    }

    else {

        previousProject();

    }

}


/* =========================
   CLAVIER
========================= */

document.addEventListener(
    "keydown",
    function (event) {

        const modalIsOpen =
            modal &&
            modal.classList.contains(
                "active"
            );


        if (modalIsOpen) {

            if (
                event.key ===
                "Escape"
            ) {

                closeModal();

                return;

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                nextModalProject();

                return;

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                previousModalProject();

                return;

            }


            return;

        }


        const activeElement =
            document.activeElement;


        const userIsTyping =
            activeElement &&
            (
                activeElement.tagName ===
                    "INPUT" ||

                activeElement.tagName ===
                    "TEXTAREA" ||

                activeElement.tagName ===
                    "SELECT"
            );


        if (userIsTyping) {
            return;
        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            nextProject();

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            previousProject();

        }

    }
);


/* =========================
   MENU MOBILE
========================= */

const menuToggle =
    document.querySelector(
        ".menu-toggle"
    );

const mainNav =
    document.querySelector(
        ".main-nav"
    );


function closeMenu() {

    if (
        !menuToggle ||
        !mainNav
    ) {
        return;
    }


    menuToggle.classList.remove(
        "active"
    );

    mainNav.classList.remove(
        "active"
    );

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    document.body.classList.remove(
        "menu-open"
    );

}


if (
    menuToggle &&
    mainNav
) {

    menuToggle.addEventListener(
        "click",
        function () {

            const isOpen =
                mainNav.classList.toggle(
                    "active"
                );


            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );


    const navLinks =
        mainNav.querySelectorAll(
            "a"
        );


    navLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                closeMenu
            );

        }
    );

}


window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth >
            1000
        ) {

            closeMenu();

        }

    }
);


/* =========================
   FORMULAIRE
========================= */

const projectForm =
    document.querySelector(
        "#project-form"
    );

const messageField =
    document.querySelector(
        "#message"
    );

const messageCount =
    document.querySelector(
        "#message-count"
    );

const formStatus =
    document.querySelector(
        "#form-status"
    );


/* =========================
   TOAST
========================= */

const formToast =
    document.querySelector(
        "#form-toast"
    );

const formToastClose =
    document.querySelector(
        ".form-toast-close"
    );


let formToastTimer = null;


function showFormToast() {

    if (!formToast) {
        return;
    }


    if (formToastTimer) {

        clearTimeout(
            formToastTimer
        );

    }


    formToast.classList.remove(
        "active"
    );


    void formToast.offsetWidth;


    formToast.classList.add(
        "active"
    );


    formToast.setAttribute(
        "aria-hidden",
        "false"
    );


    formToastTimer =
        setTimeout(
            hideFormToast,
            4500
        );

}


function hideFormToast() {

    if (!formToast) {
        return;
    }


    formToast.classList.remove(
        "active"
    );


    formToast.setAttribute(
        "aria-hidden",
        "true"
    );


    if (formToastTimer) {

        clearTimeout(
            formToastTimer
        );

        formToastTimer = null;

    }

}


if (formToastClose) {

    formToastClose.addEventListener(
        "click",
        hideFormToast
    );

}


/* =========================
   COMPTEUR MESSAGE
========================= */

function updateMessageCounter() {

    if (
        !messageField ||
        !messageCount
    ) {
        return;
    }


    const maximumLength =
        1500;


    if (
        messageField.value.length >
        maximumLength
    ) {

        messageField.value =
            messageField.value.substring(
                0,
                maximumLength
            );

    }


    messageCount.textContent =
        String(
            messageField.value.length
        );

}


if (messageField) {

    messageField.addEventListener(
        "input",
        updateMessageCounter
    );


    updateMessageCounter();

}


/* =========================
   ERREURS
========================= */

function showFieldError(
    field,
    message
) {

    const formField =
        field.closest(
            ".form-field"
        );


    if (!formField) {
        return;
    }


    formField.classList.add(
        "has-error"
    );


    const errorElement =
        formField.querySelector(
            ".form-error"
        );


    if (errorElement) {

        errorElement.textContent =
            message;

    }

}


function clearFieldError(field) {

    const formField =
        field.closest(
            ".form-field"
        );


    if (!formField) {
        return;
    }


    formField.classList.remove(
        "has-error"
    );


    const errorElement =
        formField.querySelector(
            ".form-error"
        );


    if (errorElement) {

        errorElement.textContent =
            "";

    }

}


/* =========================
   VALIDATION EMAIL
========================= */

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return emailPattern.test(
        email
    );

}


/* =========================
   VALIDATION URL
========================= */

function isValidUrl(url) {

    if (
        url.trim() === ""
    ) {
        return true;
    }


    try {

        new URL(url);

        return true;

    }

    catch (error) {

        return false;

    }

}


/* =========================
   VALIDATION FORMULAIRE
========================= */

function validateProjectForm() {

    if (!projectForm) {
        return false;
    }


    let isValid = true;


    const name =
        projectForm.querySelector(
            "#name"
        );

    const email =
        projectForm.querySelector(
            "#email"
        );

    const projectType =
        projectForm.querySelector(
            "#project-type"
        );

    const budget =
        projectForm.querySelector(
            "#budget"
        );

    const website =
        projectForm.querySelector(
            "#website"
        );

    const message =
        projectForm.querySelector(
            "#message"
        );


    const fields = [
        name,
        email,
        projectType,
        budget,
        website,
        message
    ];


    fields.forEach(
        function (field) {

            if (field) {

                clearFieldError(
                    field
                );

            }

        }
    );


    if (
        name &&
        name.value.trim() === ""
    ) {

        showFieldError(
            name,
            "Indiquez votre nom ou votre entreprise."
        );

        isValid = false;

    }


    if (
        email &&
        !isValidEmail(
            email.value.trim()
        )
    ) {

        showFieldError(
            email,
            "Indiquez une adresse email valide."
        );

        isValid = false;

    }


    if (
        projectType &&
        projectType.value === ""
    ) {

        showFieldError(
            projectType,
            "Sélectionnez un type de projet."
        );

        isValid = false;

    }


    if (
        budget &&
        budget.value === ""
    ) {

        showFieldError(
            budget,
            "Sélectionnez un budget."
        );

        isValid = false;

    }


    if (
        website &&
        !isValidUrl(
            website.value
        )
    ) {

        showFieldError(
            website,
            "Indiquez une adresse complète commençant par https://"
        );

        isValid = false;

    }


    if (
        message &&
        message.value.trim().length <
        20
    ) {

        showFieldError(
            message,
            "Décrivez votre projet en quelques lignes."
        );

        isValid = false;

    }


    return isValid;

}


/* =========================
   SUPPRESSION ERREURS
========================= */

if (projectForm) {

    const formFields =
        projectForm.querySelectorAll(
            "input, select, textarea"
        );


    formFields.forEach(
        function (field) {

            field.addEventListener(
                "input",
                function () {

                    clearFieldError(
                        field
                    );

                }
            );


            field.addEventListener(
                "change",
                function () {

                    clearFieldError(
                        field
                    );

                }
            );

        }
    );

}


/* =========================
   ENVOI FORMSPREE
========================= */

if (projectForm) {

    projectForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (
                !validateProjectForm()
            ) {

                if (formStatus) {

                    formStatus.textContent =
                        "Vérifiez les informations indiquées.";

                    formStatus.className =
                        "form-status error";

                }


                return;

            }


            const submitButton =
                projectForm.querySelector(
                    ".form-submit"
                );

            const submitText =
                projectForm.querySelector(
                    ".form-submit-text"
                );


            if (submitButton) {

                submitButton.disabled =
                    true;

            }


            if (submitText) {

                submitText.textContent =
                    "Envoi...";

            }


            if (formStatus) {

                formStatus.textContent =
                    "";

                formStatus.className =
                    "form-status";

            }


            const formData =
                new FormData(
                    projectForm
                );


            fetch(
                projectForm.action,
                {
                    method:
                        projectForm.method,

                    body:
                        formData,

                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            )

            .then(
                function (response) {

                    if (
                        !response.ok
                    ) {

                        throw new Error(
                            "Erreur lors de l'envoi"
                        );

                    }


                    return response;

                }
            )

            .then(
                function () {

                    projectForm.reset();

                    updateMessageCounter();


                    if (formStatus) {

                        formStatus.textContent =
                            "";

                        formStatus.className =
                            "form-status";

                    }


                    showFormToast();

                }
            )

            .catch(
                function () {

                    if (formStatus) {

                        formStatus.textContent =
                            "Impossible d'envoyer le formulaire pour le moment.";

                        formStatus.className =
                            "form-status error";

                    }

                }
            )

            .finally(
                function () {

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                    }


                    if (submitText) {

                        submitText.textContent =
                            "Envoyer mon projet";

                    }

                }
            );

        }
    );

}


/* =========================
   INITIALISATION
========================= */

updateCarousel();

const modalLiveLink =
    document.querySelector(
        ".modal-live-link"
    );