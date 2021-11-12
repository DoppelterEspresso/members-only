const dropdownContent = document.getElementsByClassName("dropdown-content")[0];
const dropButton = document.getElementsByClassName("dropbtn")[0];

dropButton.addEventListener("click", toggleDropdown);

function toggleDropdown() {
  dropdownContent.toggleAttribute("clicked");
  if (dropdownContent.hasAttribute("clicked")) {
    dropdownContent.classList.add("clicked");
  } else {
    dropdownContent.classList.remove("clicked");
  }
}
