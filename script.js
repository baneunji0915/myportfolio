const menuToggle = document.querySelector(".menu-toggle");
const navigationLinks = document.querySelector(".nav-links");

if (menuToggle && navigationLinks) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "메뉴 열기" : "메뉴 닫기");
    navigationLinks.classList.toggle("is-open", !isExpanded);
  });

  navigationLinks.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "메뉴 열기");
      navigationLinks.classList.remove("is-open");
    }
  });
}

const yearElement = document.querySelector("#current-year");
if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

const copyButton = document.querySelector("[data-copy-email]");
const copyFeedback = document.querySelector(".copy-feedback");

if (copyButton instanceof HTMLButtonElement && copyFeedback) {
  copyButton.addEventListener("click", async () => {
    const email = copyButton.dataset.copyEmail;
    if (!email) {
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      copyFeedback.textContent = "이메일 주소를 복사했어요.";
    } catch (error) {
      copyFeedback.textContent = "복사에 실패했어요. 이메일을 직접 선택해 주세요.";
      console.error("이메일 주소 복사에 실패했습니다.", error);
    }
  });
}
