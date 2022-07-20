const inputActiveColor = "#0080ff",
  borderColor = "#d6dee5",
  professionBgColor = "#F2F8FF",
  white = "#fff",
  errColor = "#e22d4c",
  labelColor = "#61738e";

const inputBoxes = document.querySelectorAll("[data-class]");
const professionProfessional = document.querySelector(
  "[data-class='profession-professional']"
);
const professionStudent = document.querySelector(
  "[data-class='profession-student']"
);
const avatarImage = document.querySelector("[data-img='avatar-img']");
const submitButton = document.querySelector("[data-btn='submit']");

let valid = true;
let professionSelected = false;

const validate = (inputBox) => {
  const input = inputBox.querySelector("input");
  const boxName = inputBox.getAttribute("data-class");
  if (!input?.value?.match(validator[boxName])) {
    if (boxName != "profession-student" && boxName != "profession-professional")
      valid = false;
    inputBox.setAttribute("data-status", "err");
  } else inputBox.setAttribute("data-status", "active");
};

const focusOut = (inputBox) => {
  const input = inputBox.querySelector("input");
  if (input.value?.length) validate(inputBox);
  else inputBox.setAttribute("data-status", "");
};

const setProfession = (active, inactive) => {
  professionSelected = true;
  active.setAttribute("data-status", "active");
  inactive.setAttribute("data-status", "");
};

const activateInputBox = (inputBox) => {
  if (inputBox.getAttribute("data-class") === "profession-student") {
    setProfession(inputBox, professionProfessional);
    avatarImage.setAttribute(
      "src",
      avatarImage.getAttribute("data-student-img")
    );
  } else if (
    inputBox.getAttribute("data-class") === "profession-professional"
  ) {
    setProfession(inputBox, professionStudent);
    avatarImage.setAttribute(
      "src",
      avatarImage.getAttribute("data-professional-img")
    );
  } else {
    const input = inputBox.querySelector("input");
    input.focus();
    inputBox.setAttribute("data-status", "active");
  }
};

for (const inputBox of inputBoxes) {
  inputBox.addEventListener("click", () => activateInputBox(inputBox));

  inputBox
    .querySelector("input")
    ?.addEventListener("focusout", () => focusOut(inputBox));
}

// Resetting the form

const reset = () => {
  professionSelected = false;
  for (const inputBox of inputBoxes) {
    const input = inputBox.querySelector("input");
    if (input) input.value = "";
    inputBox.setAttribute("data-status", "");
  }
  avatarImage.setAttribute(
    "src",
    "https://assets.interviewbit.com/assets/ibpp/moco_event/professional/moco-f1-common-08f74b39620f4465001c38619a77bb0540f6abfc466cf283d8f056546c14537b.png"
  );
  document
    .querySelector("[data-class='country-code']")
    .querySelector("input").value = "+91";
};

// Handle Submit

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  valid = true;
  for (const inputBox of inputBoxes) validate(inputBox);
  if (!professionSelected)
    document
      .querySelector("[data-err='profession']")
      .setAttribute("data-status", "err");
  if (valid && professionSelected) {
    reset();
    document
      .querySelector('[data-alert="submit"]')
      .setAttribute("data-status", "active");
    setTimeout(() => {
      document
        .querySelector('[data-alert="submit"]')
        .setAttribute("data-status", "");
    }, 2000);
  }
});

// Handling Phone codes

let phones = Object.values(phoneCodes);

let searchField = document.querySelector("[data-class='country-code']");
let dropdown = document.querySelector('[data-codes="country"]');
let dropdownCaret = document.querySelector('[data-caret="phone"]');

const setCountryCode = (event) => {
  searchField.querySelector("input").value = event.target.innerHTML;
  dropdown.setAttribute("data-status", "");
};

const search = (event) => {
  const filteredPhones = phones.filter((phone) =>
    phone.includes(event.target.value)
  );

  dropdown.innerHTML = filteredPhones
    .map((filteredPhone) => `<span>${filteredPhone}</span>`)
    .join("");

  let codes = dropdown.querySelectorAll("span");
  for (let code of codes) code.addEventListener("click", setCountryCode);

  dropdown.setAttribute("data-status", "active");
};

searchField.addEventListener("keyup", search);

searchField.addEventListener("focusout", (event) => {
  if (!phones.includes(event.target.value))
    searchField.querySelector("input").value = "+91";
  else dropdown.setAttribute("data-status", "");
  searchField.querySelector("input").setAttribute("data-status", "inactive");
});

searchField.querySelector("input").addEventListener("focus", (event) => {
  event.target.setAttribute("data-status", "active");
  if (event.target.value === "+91") {
    event.target.value = "+";
    search(event);
  }
});

dropdownCaret.addEventListener("click", () => {
  if (dropdown.getAttribute("data-status") === "active")
    dropdown.setAttribute("data-status", "");
  else if (searchField.querySelector("input").value === "+91")
    searchField.querySelector("input").focus();
  else dropdown.setAttribute("data-status", "active");
});
