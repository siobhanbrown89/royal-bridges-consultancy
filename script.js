const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    menuButton.textContent = isOpen ? "×" : "☰";
  });
  navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    menuButton.textContent = "☰";
  }));
}
document.querySelectorAll("[data-subject]").forEach(link => link.addEventListener("click", () => {
  const type = document.getElementById("enquiryType");
  if (type) type.value = link.dataset.subject.includes("Employer") ? "Employer / Hiring organisation" : "Candidate / Job seeker";
}));
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
const form = document.getElementById("enquiryForm");
if (form) form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = encodeURIComponent("Royal Bridges Recruitment — " + data.get("enquiryType"));
  const body = encodeURIComponent(
    "Name: " + data.get("fullName") + "\nEmail: " + data.get("email") +
    "\nPhone: " + (data.get("phone") || "Not provided") +
    "\nEnquiry type: " + data.get("enquiryType") + "\n\nMessage:\n" + data.get("message")
  );
  const status = document.querySelector(".form-status");
  if (status) status.textContent = "Opening your email application. Your details are not stored by this preview website.";
  window.location.href = "mailto:info@royalbridges.ae?subject=" + subject + "&body=" + body;
});