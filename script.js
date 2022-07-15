const inputActiveColor = "#0080ff",
  borderColor = "#d6dee5",
  professionBgColor = "#F2F8FF",
  white = "#fff",
  errColor = "#e22d4c",
  labelColor = "#61738e";

const inputBoxes = document.querySelectorAll("[data-class]"),
  professionProfessional = document.querySelector(
    "[data-class='profession-professional']"
  ),
  professionStudent = document.querySelector(
    "[data-class='profession-student']"
  ),
  avatarImage = document.querySelector("[data-img='avatar-img']"),
  submitButton = document.querySelector("[data-btn='submit']");

let valid = true,
  professionSelected = false;

const validate = (inputBox) => {
  const input = inputBox.querySelector("input");
  const label = inputBox.querySelector("label");
  const boxName = inputBox.getAttribute("data-class");
  if (!input?.value?.match(validator[boxName])) {
    if (document.querySelector(`[data-err='${boxName}']`)) {
      valid = false;
      document.querySelector(`[data-err='${boxName}']`).style.display =
        "inline";
      input.style.borderColor = errColor;
      label.style.color = errColor;
    }
  } else {
    if (document.querySelector(`[data-err='${boxName}']`)) {
      document.querySelector(`[data-err='${boxName}']`).style.display = "none";
      const label = inputBox.querySelector("label");
      input.style.borderColor = inputActiveColor;
      label.style.color = inputActiveColor;
    }
  }
};

const focusOut = (inputBox) => {
  const input = inputBox.querySelector("input");
  if (input.value?.length) validate(inputBox);
  else {
    const boxName = inputBox.getAttribute("data-class");
    document.querySelector(`[data-err='${boxName}']`).style.display = "none";
    const input = inputBox.querySelector("input");
    const label = inputBox.querySelector("label");
    input.style.borderColor = borderColor;
    label.style.color = labelColor;
    label.style.top = "2.5rem";
    label.style.fontSize = "1rem";
  }
};

const setProfession = (active, inactive) => {
  professionSelected = true;
  document.querySelector("[data-err='profession']").style.display = "none";
  active.style.borderColor = inputActiveColor;
  active.style.backgroundColor = professionBgColor;
  inactive.style.backgroundColor = white;
  inactive.style.borderColor = borderColor;
};

const activateInputBox = (inputBox) => {
  if (inputBox.getAttribute("data-class") === "profession-student") {
    setProfession(inputBox, professionProfessional);
    avatarImage.setAttribute("src", avatarImage.getAttribute("data-student"));
  } else if (
    inputBox.getAttribute("data-class") === "profession-professional"
  ) {
    setProfession(inputBox, professionStudent);
    avatarImage.setAttribute(
      "src",
      avatarImage.getAttribute("data-professional")
    );
  } else {
    const input = inputBox.querySelector("input");
    const label = inputBox.querySelector("label");
    input.focus();
    input.style.borderColor = inputActiveColor;
    if (label) label.style.top = ".6rem";
    if (label) label.style.fontSize = ".8rem";
  }
};

for (const inputBox of inputBoxes) {
  inputBox.addEventListener("click", () => activateInputBox(inputBox));

  inputBox
    .querySelector("input")
    ?.addEventListener("focusout", (event) => focusOut(inputBox));
}

// Resetting the form

const reset = () => {
  professionSelected = false;
  for (const inputBox of inputBoxes) {
    const input = inputBox.querySelector("input");
    const label = inputBox.querySelector("label");
    if (input) {
      input.value = "";
      input.style.borderColor = borderColor;
      label.style.color = labelColor;
      label.style.top = "2.5rem";
      label.style.fontSize = "1rem";
    } else {
      inputBox.style.borderColor = borderColor;
      inputBox.style.backgroundColor = white;
    }
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
  valid = true;
  event.preventDefault();
  for (const inputBox of inputBoxes) {
    validate(inputBox);
  }
  if (!professionSelected) {
    document.querySelector("[data-err='profession']").style.display = "inline";
  }
  if (valid && professionSelected) {
    reset();
    document.querySelector('[data-alert="submit"]').style.opacity = 1;
    setTimeout(() => {
      document.querySelector('[data-alert="submit"]').style.opacity = 0;
    }, 2000);
  }
});

// Handling Phone codes

let phones = Object.values(phoneCodes);

let searchField = document.querySelector("[data-class='country-code']"),
  dropdown = document.querySelector('[data-codes="country"]');

const search = (event) => {
  const filteredPhones = phones.filter((phone) =>
    phone.includes(event.target.value)
  );

  dropdown.innerHTML = filteredPhones
    .map((filteredPhone) => `<span>${filteredPhone}</span>`)
    .join("");

  let codes = dropdown.querySelectorAll("span");
  for (let i = 0; i < codes.length; i++)
    codes[i].addEventListener("click", setCountryCode);
  console.log(codes);

  dropdown.style.display = "flex";
};

searchField.addEventListener("keyup", search);

searchField.addEventListener("focusout", (event) => {
  if (!phones.includes(event.target.value)) {
    searchField.querySelector("input").value = "+91";
  } else dropdown.style.display = "none";
  searchField.querySelector("input").style.borderColor = borderColor;
});

const setCountryCode = (event) => {
  searchField.querySelector("input").value = event.target.innerHTML;
  dropdown.style.display = "none";
};
