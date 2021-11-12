const dropdownContent = document.getElementsByClassName("dropdown-content")[0];

function toggleDropdown() {
  dropdownContent.toggleAttribute("clicked");
  if (dropdownContent.hasAttribute("clicked")) {
    dropdownContent.classList.add("clicked");
  } else {
    dropdownContent.classList.remove("clicked");
  }
}
