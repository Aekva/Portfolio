/* =========================
   RESTAURATION SCROLL
========================= */

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  
  function isPageReload() {
    const navigationEntries = performance.getEntriesByType("navigation");
  
    return (
      navigationEntries.length > 0 &&
      navigationEntries[0].type === "reload"
    );
  }
  
  window.addEventListener("pageshow", function () {
    if (!isPageReload()) {
      return;
    }
  
    if (window.location.hash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant",
        });
      });
    });
  });
  
  
  /* =========================
     PROJETS
  ========================= */
  
  const projects = [
    {
      title: "Maison Sépia",
      category: "Restaurant / Site vitrine",
      image: "images/maison-sepia.jpg",
      alt: "Capture complète du site Maison Sépia",
      url: "https://aekva.github.io/maison-sepia/",
    },
  
    {
      title: "Studio Néra",
      category: "Beauté & bien-être / Site vitrine",
      image: "images/studio-nera.jpg",
      alt: "Capture complète du site Studio Néra",
      url: "https://aekva.github.io/studio-nera/",
    },
  
    {
      title: "BLOC.",
      category: "Artisan & services / Site vitrine",
      image: "images/bloc.jpg",
      alt: "Capture complète du site BLOC.",
      url: "https://aekva.github.io/bloc/",
    },
  ];
  
  
  /* =========================
     CARROUSEL
  ========================= */
  
  const projectStage =
    document.querySelector(".project-stage");
  
  const projectCards = Array.from(
    document.querySelectorAll(".project-card")
  );
  
  const carouselPrev =
    document.querySelector(".carousel-prev");
  
  const carouselNext =
    document.querySelector(".carousel-next");
  
  const carouselCurrent =
    document.querySelector("#carousel-current");
  
  const carouselDots = Array.from(
    document.querySelectorAll(".carousel-dot")
  );
  
  let currentIndex = 0;
  
  
  function getPreviousIndex() {
    return (
      (currentIndex - 1 + projects.length) %
      projects.length
    );
  }
  
  
  function getNextIndex() {
    return (
      (currentIndex + 1) %
      projects.length
    );
  }
  
  
  function updateCarousel() {
    const previousIndex =
      getPreviousIndex();
  
    const nextIndex =
      getNextIndex();
  
    projectCards.forEach(function (card, index) {
      card.classList.remove(
        "is-active",
        "is-prev",
        "is-next"
      );
  
      if (index === currentIndex) {
        card.classList.add("is-active");
      }
  
      else if (index === previousIndex) {
        card.classList.add("is-prev");
      }
  
      else if (index === nextIndex) {
        card.classList.add("is-next");
      }
    });
  
    if (carouselCurrent) {
      carouselCurrent.textContent =
        String(currentIndex + 1).padStart(
          2,
          "0"
        );
    }
  
    carouselDots.forEach(function (dot, index) {
      dot.classList.toggle(
        "active",
        index === currentIndex
      );
    });
  }
  
  
  function nextProject() {
    currentIndex =
      (currentIndex + 1) %
      projects.length;
  
    updateCarousel();
  }
  
  
  function previousProject() {
    currentIndex =
      (currentIndex - 1 + projects.length) %
      projects.length;
  
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
     MODALE PROJET
  ========================= */
  
  const modal =
    document.querySelector(".project-modal");
  
  const modalImage =
    document.querySelector(".modal-image");
  
  const modalTitle =
    document.querySelector(".modal-title");
  
  const modalCategory =
    document.querySelector(".modal-category");
  
  const modalCounter =
    document.querySelector(".modal-counter");
  
  const modalClose =
    document.querySelector(".modal-close");
  
  const modalPrev =
    document.querySelector(".modal-prev");
  
  const modalNext =
    document.querySelector(".modal-next");
  
  const modalLiveLink =
    document.querySelector(".modal-live-link");
  
  let modalIndex = 0;
  
  
  function showModalProject(index) {
    if (!modal || !modalImage) {
      return;
    }
  
    modalIndex = index;
  
    const project =
      projects[modalIndex];
  
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
  
    if (modalLiveLink) {
      modalLiveLink.href =
        project.url;
    }
  
    if (modalCounter) {
      const current =
        String(modalIndex + 1).padStart(
          2,
          "0"
        );
  
      const total =
        String(projects.length).padStart(
          2,
          "0"
        );
  
      modalCounter.textContent =
        current + " / " + total;
    }
  
    modal.scrollTop = 0;
  }
  
  
  function openModal(index) {
    if (!modal) {
      return;
    }
  
    showModalProject(index);
  
    modal.classList.add("active");
  
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
  
    modal.classList.remove("active");
  
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
      (modalIndex + 1) %
      projects.length;
  
    currentIndex =
      modalIndex;
  
    updateCarousel();
  
    showModalProject(
      modalIndex
    );
  }
  
  
  function previousModalProject() {
    modalIndex =
      (modalIndex - 1 + projects.length) %
      projects.length;
  
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
  
      function handleProjectClick() {
        if (
          index !==
          currentIndex
        ) {
          goToProject(index);
  
          return;
        }
  
        openModal(index);
      }
  
      if (preview) {
        preview.addEventListener(
          "click",
          handleProjectClick
        );
      }
  
      if (openButton) {
        openButton.addEventListener(
          "click",
          handleProjectClick
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
     SWIPE CARROUSEL
  ========================= */
  
  let touchStartX = 0;
  let touchEndX = 0;
  
  
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
  
  
  if (projectStage) {
    projectStage.addEventListener(
      "touchstart",
  
      function (event) {
        touchStartX =
          event.changedTouches[0].screenX;
      },
  
      {
        passive: true,
      }
    );
  
    projectStage.addEventListener(
      "touchend",
  
      function (event) {
        touchEndX =
          event.changedTouches[0].screenX;
  
        handleSwipe();
      },
  
      {
        passive: true,
      }
    );
  }
  
  
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
  
    mainNav
      .querySelectorAll("a")
      .forEach(function (link) {
        link.addEventListener(
          "click",
          closeMenu
        );
      });
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
     OFFRES
  ========================= */
  
  const offerButtons =
    document.querySelectorAll(
      ".offer-cta[data-offer]"
    );
  
  const selectedOfferField =
    document.querySelector(
      "#selected-offer"
    );
  
  const projectTypeField =
    document.querySelector(
      "#project-type"
    );
  
  const budgetField =
    document.querySelector(
      "#budget"
    );
  
  
  /* =========================
     MAINTENANCE
  ========================= */
  
  const maintenanceWith =
    document.querySelector(
      "#maintenance-avec"
    );
  
  const maintenanceWithout =
    document.querySelector(
      "#maintenance-sans"
    );
  
  const maintenanceModal =
    document.querySelector(
      "#maintenance-modal"
    );
  
  const maintenanceYes =
    document.querySelector(
      ".maintenance-modal-yes"
    );
  
  const maintenanceNo =
    document.querySelector(
      ".maintenance-modal-no"
    );
  
  
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
  
    const maximumLength = 1500;
  
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
  }
  
  
  /* =========================
     PRÉREMPLISSAGE OFFRES
  ========================= */
  
  function setSelectedOfferLabel(
    offer
  ) {
    if (!selectedOfferField) {
      return;
    }
  
    const labels = {
      essentiel: "Essentiel",
      vitrine: "Vitrine",
      "sur-mesure": "Sur mesure",
    };
  
    selectedOfferField.value =
      labels[offer] || "";
  }
  
  
  function fillOfferForm(offer) {
    setSelectedOfferLabel(
      offer
    );
  
    const currentMessage =
      messageField
        ? messageField.value.trim()
        : "";
  
    /* ESSENTIEL */
  
    if (
      offer === "essentiel"
    ) {
      if (projectTypeField) {
        projectTypeField.value =
          "site-vitrine";
      }
  
      if (budgetField) {
        budgetField.value =
          "500-700";
      }
  
      if (
        messageField &&
        currentMessage === ""
      ) {
        messageField.value =
          "Je suis intéressé par l’offre Essentiel et je souhaite échanger sur mon projet.";
  
        updateMessageCounter();
      }
  
      return;
    }
  
  
    /* VITRINE */
  
    if (
      offer === "vitrine"
    ) {
      if (projectTypeField) {
        projectTypeField.value =
          "site-vitrine";
      }
  
      if (budgetField) {
        budgetField.value =
          "700-1000";
      }
  
      if (
        messageField &&
        currentMessage === ""
      ) {
        messageField.value =
          "Je suis intéressé par l’offre Vitrine et je souhaite échanger sur mon projet.";
  
        updateMessageCounter();
      }
  
      return;
    }
  
  
    /* SUR MESURE */
  
    if (
      offer === "sur-mesure"
    ) {
      if (projectTypeField) {
        projectTypeField.value =
          "sur-mesure";
      }
  
      if (budgetField) {
        budgetField.value =
          "a-definir";
      }
  
      if (
        messageField &&
        currentMessage === ""
      ) {
        messageField.value =
          "Je souhaite échanger au sujet d’un projet sur mesure.";
  
        updateMessageCounter();
      }
    }
  }
  
  
  /* =========================
     POPUP MAINTENANCE
  ========================= */
  
  function openMaintenanceModal() {
    if (!maintenanceModal) {
      return;
    }
  
    maintenanceModal.classList.add(
      "active"
    );
  
    maintenanceModal.setAttribute(
      "aria-hidden",
      "false"
    );
  
    document.body.classList.add(
      "modal-open"
    );
  
    if (maintenanceYes) {
      maintenanceYes.focus();
    }
  }
  
  
  function closeMaintenanceModal() {
    if (!maintenanceModal) {
      return;
    }
  
    maintenanceModal.classList.remove(
      "active"
    );
  
    maintenanceModal.setAttribute(
      "aria-hidden",
      "true"
    );
  
    document.body.classList.remove(
      "modal-open"
    );
  }
  
  
  function scrollToProjectForm() {
    const contactSection =
      document.querySelector(
        "#contact"
      );
  
    if (!contactSection) {
      return;
    }
  
    contactSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
  
  
  /* =========================
     CLIC OFFRES
  ========================= */
  
  offerButtons.forEach(
    function (button) {
      button.addEventListener(
        "click",
  
        function (event) {
          event.preventDefault();
  
          fillOfferForm(
            button.dataset.offer
          );
  
          if (maintenanceWith) {
            maintenanceWith.checked =
              false;
          }
  
          if (maintenanceWithout) {
            maintenanceWithout.checked =
              false;
          }
  
          openMaintenanceModal();
        }
      );
    }
  );
  
  
  /* =========================
     AVEC MAINTENANCE
  ========================= */
  
  if (maintenanceYes) {
    maintenanceYes.addEventListener(
      "click",
  
      function () {
        if (maintenanceWith) {
          maintenanceWith.checked =
            true;
        }
  
        if (maintenanceWithout) {
          maintenanceWithout.checked =
            false;
        }
  
        closeMaintenanceModal();
  
        scrollToProjectForm();
      }
    );
  }
  
  
  /* =========================
     SANS MAINTENANCE
  ========================= */
  
  if (maintenanceNo) {
    maintenanceNo.addEventListener(
      "click",
  
      function () {
        if (maintenanceWithout) {
          maintenanceWithout.checked =
            true;
        }
  
        if (maintenanceWith) {
          maintenanceWith.checked =
            false;
        }
  
        closeMaintenanceModal();
  
        scrollToProjectForm();
      }
    );
  }
  
  
  /* =========================
     CLIC EXTÉRIEUR POPUP
  ========================= */
  
  if (maintenanceModal) {
    maintenanceModal.addEventListener(
      "click",
  
      function (event) {
        if (
          event.target ===
          maintenanceModal
        ) {
          closeMaintenanceModal();
        }
      }
    );
  }
  
  
  /* =========================
     TOAST FORMULAIRE
  ========================= */
  
  const formToast =
  document.querySelector("#formToast");

const formToastClose =
  document.querySelector("#formToastClose");

let formToastTimeout;


function hideFormToast() {
  if (!formToast) {
    return;
  }

  formToast.classList.remove("active");

  clearTimeout(formToastTimeout);
}


function showFormToast() {
  if (!formToast) {
    return;
  }

  clearTimeout(formToastTimeout);

  formToast.classList.add("active");

  formToastTimeout = setTimeout(function () {
    hideFormToast();
  }, 4500);
}


if (formToastClose) {
  formToastClose.addEventListener(
    "click",
    hideFormToast
  );
}
  
  
  /* =========================
     ERREURS FORMULAIRE
  ========================= */
  
  function showFieldError(
    field,
    message
  ) {
    if (!field) {
      return;
    }
  
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
  
  
  function clearFieldError(
    field
  ) {
    if (!field) {
      return;
    }
  
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
  
    const maintenanceChoice =
      projectForm.querySelector(
        'input[name="maintenance"]:checked'
      );
  
    const fields = [
      name,
      email,
      projectType,
      budget,
      website,
      message,
    ];
  
    fields.forEach(function (field) {
      clearFieldError(field);
    });
  
  
    /* NOM */
  
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
  
  
    /* EMAIL */
  
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
  
  
    /* TYPE */
  
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
  
  
    /* BUDGET */
  
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
  
  
    /* MAINTENANCE */
  
    if (!maintenanceChoice) {
      showFieldError(
        maintenanceWith,
        "Choisissez avec ou sans maintenance."
      );
  
      isValid = false;
    }
  
  
    /* URL */
  
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
  
  
    /* MESSAGE */
  
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
     ENVOI FORMSPREE + TOAST
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
  
        /*
         * LE TOAST S'AFFICHE
         * TOUT DE SUITE.
         */
        showFormToast();
  
        /*
         * FORMSPREE PART
         * EN ARRIÈRE-PLAN.
         */
        fetch(
          projectForm.action,
          {
            method:
              projectForm.method ||
              "POST",
  
            body: formData,
  
            headers: {
              Accept:
                "application/json",
            },
          }
        )
  
          .then(function (response) {
            if (!response.ok) {
              throw new Error(
                "Erreur lors de l'envoi"
              );
            }
  
            projectForm.reset();
  
            if (selectedOfferField) {
              selectedOfferField.value =
                "";
            }
  
            updateMessageCounter();
          })
  
          .catch(function (error) {
            console.error(
              "Erreur Formspree :",
              error
            );
  
            if (formStatus) {
              formStatus.textContent =
                "Impossible d'envoyer le formulaire pour le moment.";
  
              formStatus.className =
                "form-status error";
            }
          });
      }
    );
  }
  
  
  /* =========================
     CLAVIER
  ========================= */
  
  document.addEventListener(
    "keydown",
  
    function (event) {
      const maintenanceModalIsOpen =
        maintenanceModal &&
        maintenanceModal.classList.contains(
          "active"
        );
  
      if (
        maintenanceModalIsOpen
      ) {
        if (
          event.key === "Escape"
        ) {
          closeMaintenanceModal();
        }
  
        return;
      }
  
  
      const modalIsOpen =
        modal &&
        modal.classList.contains(
          "active"
        );
  
      if (modalIsOpen) {
        if (
          event.key === "Escape"
        ) {
          closeModal();
  
          return;
        }
  
        if (
          event.key === "ArrowRight"
        ) {
          nextModalProject();
  
          return;
        }
  
        if (
          event.key === "ArrowLeft"
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
        event.key === "ArrowRight"
      ) {
        nextProject();
      }
  
      if (
        event.key === "ArrowLeft"
      ) {
        previousProject();
      }
    }
  );
  
  
  /* =========================
     HEADER AU SCROLL
  ========================= */
  
  const siteHeader =
    document.querySelector(
      ".site-header"
    );
  
  
  function updateHeaderScrollState() {
    if (!siteHeader) {
      return;
    }
  
    siteHeader.classList.toggle(
      "is-scrolled",
      window.scrollY > 40
    );
  }
  
  
  window.addEventListener(
    "scroll",
    updateHeaderScrollState,
    {
      passive: true,
    }
  );
  
  
  /* =========================
     INITIALISATION
  ========================= */
  
  updateCarousel();
  
  updateMessageCounter();
  
  updateHeaderScrollState();