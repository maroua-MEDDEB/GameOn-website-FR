function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// selectionner l'élément close
const closeBtn = document.querySelector(".close");

const inputText1 = document.querySelector("#first");
const inputText2 = document.querySelector("#last");

const inputEmail = document.querySelector("input[type=email]");
const inputNumber = document.querySelector("input[type=number]");
const inputRadios = document.querySelectorAll("input[type=radio]");
const inputCondition = document.querySelector("input[type=checkbox]");
const inputDate = document.querySelector("input[type=date]");

const form = document.querySelector("form");
const inputConfirmBtn = document.querySelector("input[type=submit]");

// Modal de confirmation
const modalConfirm = document.querySelector(".modalConfirmation");

// bouton de fermeture de modal de confirmation
const butonClose = document.querySelector(".btnFermConfirm");

// évênnements:
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeBtn.addEventListener("click", closeModal);

// confirm bouton event
form.addEventListener("submit", confirmButon);

//validation du champs de saisie inputText1
inputText1.addEventListener("input", function (event) {
  validationText(
    event.target,
    "Veuillez entrer 2 caractères ou plus pour le champ du prenom."
  );
});

//validation du champs de saisie inputText2
inputText2.addEventListener("input", function (event) {
  validationText(
    event.target,
    "Veuillez entrer 2 caractères ou plus pour le champ du nom."
  );
});

//validation email
inputEmail.addEventListener("input", function (event) {
  validationMail(event.target);
});

// validation nbr de concours
inputNumber.addEventListener("input", function (event) {
  validationNumber(event.target);
});

//validation radioBox
inputRadios.forEach(function (element) {
  element.addEventListener("input", function (event) {
    validationRadio();
  });
});

//validation checkBox
inputCondition.addEventListener("input", function (event) {
  validationCondition(event.target);
});

//validation date
inputDate.addEventListener("input", function (event) {
  validationDate(event.target);
});

// validation btn formulaire
inputConfirmBtn.addEventListener("click", validationForm);

//fermeture buton de fermeture du modal de de confirmation
butonClose.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//
function confirmButon() {
  // console.log('confirmer');
  modalbg.style.display = "none";
  modalConfirm.style.display = "block";
}

//function Close modal
function closeModal() {
  modalbg.style.display = "none";
  resetForm();
}

// function valisationText1
function validationText(element, messageError) {
  //Chercher le parent de classe "fordata" le plus proche de "element"
  const parentEl = element.closest(".formData");

  //On doit vérifier que l'utilisateur tape un nom valide (Un nom valide contient au moins deux caractères)
  // cas où l'utilisateur saisie moins de 2 caractères
  if (element.value.trim().length < 2) {
    parentEl.setAttribute("data-error", messageError);
    parentEl.setAttribute("data-error-visible", "true");
    return false;
  } else {
    // cas où l'utilisateur saisie plus de 2 caractères
    parentEl.setAttribute("data-error", "");
    parentEl.setAttribute("data-error-visible", "false");
    return true;
  }
}

// function validation mail
function validationMail(element) {
  const parentEl = element.closest(".formData");

  let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  if (regex.test(element.value) === false) {
    parentEl.setAttribute(
      "data-error",
      "Veuillez saisir une adresse email valide!"
    );
    parentEl.setAttribute("data-error-visible", "true");
    return false;
  } else {
    parentEl.setAttribute("data-error", "");
    parentEl.setAttribute("data-error-visible", "false");
    return true;
  }
}

//function validation Number
function validationNumber(element) {
  const parentEl = element.closest(".formData");

  if (element.value > 0) {
    parentEl.setAttribute("data-error", "");
    parentEl.setAttribute("data-error-visible", "false");
    return true;
  } else {
    parentEl.setAttribute("data-error", "Veuillez entrer un nombre valide.");
    parentEl.setAttribute("data-error-visible", "true");
    return false;
  }
}

//function validation radioBox
function validationRadio() {
  let isCheked;
  let parentEl;

  inputRadios.forEach((elem) => {
    parentEl = elem.closest(".formData");

    if (elem.checked) {
      isCheked = true;
    }
  });

  if (isCheked) {
    parentEl.setAttribute("data-error", "");
    parentEl.setAttribute("data-error-visible", "false");
    return true;
  } else {
    parentEl.setAttribute("data-error", "Vous devez choisir une option.");
    parentEl.setAttribute("data-error-visible", "true");
    return false;
  }
}
//function validation checkValidation
function validationCondition(element) {
  const parentEl = element.closest(".formData");
  if (element.checked) {
    parentEl.setAttribute("data-error", "");
    parentEl.setAttribute("data-error-visible", "false");
    return true;
  } else {
    parentEl.setAttribute(
      "data-error",
      "Vous devez vérifier que vous acceptez les termes et conditions."
    );
    parentEl.setAttribute("data-error-visible", "true");
    return false;
  }
}

let today = new Date().toISOString().substring(0, 10); // déclarer la date actuelle

//fucntion validation Date
function validationDate(element) {
  const parentEl = element.closest(".formData");
  const dateOfBirth = element.value; // la date de naissance saisie

  if (dateOfBirth === "") {
    parentEl.setAttribute(
      "data-error",
      "Vous devez entrer votre date de naissance."
    );
    parentEl.setAttribute("data-error-visible", "true");
    return false;
  } else if (today == dateOfBirth) {
    parentEl.setAttribute(
      "data-error",
      "Veuillez vérifier votre date de naissance!"
    );
    parentEl.setAttribute("data-error-visible", "true");
    return false;
  } else if (today < dateOfBirth) {
    parentEl.setAttribute(
      "data-error",
      "Veuillez vérifier votre date de naissance!"
    );
    parentEl.setAttribute("data-error-visible", "true");
    return false;
  } else if (dateOfBirth < today) {
    parentEl.setAttribute("data-error", "");
    parentEl.setAttribute("data-error-visible", "false");
    return true;
  }
}

// function validation formulaire
function validationForm(e) {
  e.preventDefault(); //pas valider le formulaire
  // const isInputValidate = validationInput(inputText);
  const isInputText1 = validationText(inputText1, "");
  const isInputText2 = validationText(inputText2, "");

  const isMailValidate = validationMail(inputEmail);
  const isNumberValidate = validationNumber(inputNumber);
  const isRadioValidate = validationRadio();
  const isCheckboxValidate = validationCondition(inputCondition);
  const isDateValidate = validationDate(inputDate);

  if (
    isInputText1 == true &&
    isInputText2 == true &&
    isMailValidate == true &&
    isDateValidate == true &&
    isNumberValidate == true &&
    isRadioValidate == true &&
    isCheckboxValidate == true
  ) {
    // afficher message de confirmation
    modalConfirm.style.display = "flex"; // afficher le modal de confirmation
    inputConfirmBtn.setAttribute("disabled", "true");
  }
}
// fermer le modal de confirmation avec le buton fermer
// function closeModalConfirmation() {
//   modalConfirm.style.display = "none";
// }

//L'état du formulaire par défaut (Naturellement avant l'intervention de l'utilisateur)
function resetForm() {
  form.reset();
  modalConfirm.style.display = "none";
  inputConfirmBtn.removeAttribute("disabled");
}
