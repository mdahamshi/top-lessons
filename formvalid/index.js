const emailold = document.getElementById("mail");

emailold.addEventListener("input", (event) => {
  if (emailold.validity.typeMismatch) {
    emailold.setCustomValidity(
      "Are you kidding ? I am expecting an emailold address!"
    );
  } else {
    emailold.setCustomValidity("");
  }
});

emailold.addEventListener("input", (event) => {
  // Validate with the built-in constraints
  //   emailold.setCustomValidity("");
  if (!emailold.validity.valid) {
    return;
  }

  // Extend with a custom constraints
  if (!emailold.value.endsWith("@example.com")) {
    emailold.setCustomValidity("Please enter an email address of @example.com");
  }
});

const form = document.getElementById("customvalid");
const email = form.elements["email2"];
const emailError = email.nextElementSibling;
const emailError2 = form.querySelector("#email2 + span.error");

email.addEventListener("input", (event) => {
  if (email.validity.valid) {
    emailError.textContent = "";
    emailError.className = "error";
  } else {
    showError();
  }
});

form.addEventListener("submit", (event) => {
  if (!email.validity.valid) {
    showError();
    event.preventDefault();
  }
});

function showError() {
  if (email.validity.valueMissing) {
    emailError.textContent = "You need to enter an email address.";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Entered value needs to be an email address.";
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }
  emailError.classList.add('active');
}
