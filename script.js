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

const projectDetails = [
  {
    name: "모아 — 나를 위한 가계부",
    description: "흩어진 지출을 한눈에. 습관 형성을 돕는 개인 금융 대시보드.",
    role: "예시: 대시보드 화면과 지출 현황 시각화를 구현했습니다.",
    technologies: ["React", "TypeScript", "Chart.js"],
    results: "예시: 저축 현황과 목표 달성률을 한 화면에서 확인할 수 있도록 구성했습니다.",
  },
  {
    name: "틈 — 마음을 돌보는 시간",
    description: "바쁜 하루 속 나만의 쉼표를 찾는 마이크로 웰니스 서비스.",
    role: "예시: 모바일 화면과 짧은 휴식 활동을 안내하는 인터랙션을 구현했습니다.",
    technologies: ["JavaScript", "CSS", "Figma"],
    results: "예시: 짧은 시간에도 쉽게 이용할 수 있도록 핵심 활동을 간결하게 구성했습니다.",
  },
  {
    name: "페이지룸 — 독립 서점 큐레이션",
    description: "취향에 맞는 책을 발견하고 기록하는 온라인 북 큐레이션 스토어.",
    role: "예시: 책 큐레이션 페이지와 상품 탐색 화면을 구현했습니다.",
    technologies: ["Next.js", "SCSS", "Shopify"],
    results: "예시: 책 소개와 큐레이션 정보를 한 흐름에서 탐색할 수 있도록 구성했습니다.",
  },
];

const projectDialog = document.querySelector(".project-dialog");
const projectDialogTitle = document.querySelector(".project-dialog-title");
const projectDialogDescription = document.querySelector(".project-dialog-description");
const projectDialogRole = document.querySelector(".project-dialog-role");
const projectDialogTechnologies = document.querySelector(".project-dialog-technologies");
const projectDialogResults = document.querySelector(".project-dialog-results");
const projectDialogClose = document.querySelector(".project-dialog-close");
let lastProjectTrigger = null;

// 선택한 프로젝트의 예시 정보를 채우고 모달을 연 뒤 제목으로 포커스를 옮깁니다.
function openProjectDetails(projectIndex, trigger) {
  const project = projectDetails[projectIndex];
  if (
    !project ||
    !(projectDialog instanceof HTMLDialogElement) ||
    !(projectDialogTitle instanceof HTMLElement) ||
    !(projectDialogDescription instanceof HTMLElement) ||
    !(projectDialogRole instanceof HTMLElement) ||
    !(projectDialogTechnologies instanceof HTMLUListElement) ||
    !(projectDialogResults instanceof HTMLElement)
  ) {
    return;
  }

  lastProjectTrigger = trigger;
  projectDialogTitle.textContent = project.name;
  projectDialogDescription.textContent = project.description;
  projectDialogRole.textContent = project.role;
  projectDialogResults.textContent = project.results;
  projectDialogTechnologies.replaceChildren(
    ...project.technologies.map((technology) => {
      const item = document.createElement("li");
      item.textContent = technology;
      return item;
    }),
  );

  projectDialog.showModal();
  projectDialogTitle.focus();
}

// 모달을 닫고 닫기를 시작한 프로젝트 버튼으로 포커스를 돌려보냅니다.
function closeProjectDetails() {
  if (projectDialog instanceof HTMLDialogElement && projectDialog.open) {
    projectDialog.close();
  }
}

document.querySelector(".project-grid")?.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const card = event.target.closest(".project-card");
  if (!card) {
    return;
  }

  const trigger =
    event.target.closest("button[data-project-index]") ??
    card.querySelector(".project-visual-trigger");
  if (!(trigger instanceof HTMLButtonElement)) {
    return;
  }

  openProjectDetails(Number(trigger.dataset.projectIndex), trigger);
});

if (projectDialog instanceof HTMLDialogElement) {
  projectDialogClose?.addEventListener("click", closeProjectDetails);

  projectDialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeProjectDetails();
    }
  });

  projectDialog.addEventListener("click", (event) => {
    if (event.target === projectDialog) {
      closeProjectDetails();
    }
  });

  projectDialog.addEventListener("close", () => {
    lastProjectTrigger?.focus();
    lastProjectTrigger = null;
  });
}
