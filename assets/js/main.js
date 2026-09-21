// 김선미의 그림책 질문놀이 — 공통 스크립트
// 콘텐츠는 순수 HTML로 제공되며, 이 스크립트는 보조 상호작용(모바일 메뉴, 필터, 문의 폼)만 담당합니다.

(function () {
  "use strict";

  // ---- 모바일 내비게이션 토글 ----
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth < 960) {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // ---- 강의후기 필터 ----
  var reviewFilterBar = document.querySelector("[data-review-filter]");
  if (reviewFilterBar) {
    var reviewCards = document.querySelectorAll("[data-review-type]");
    reviewFilterBar.querySelectorAll(".filter-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        reviewFilterBar.querySelectorAll(".filter-btn").forEach(function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-pressed", "true");
        var type = btn.getAttribute("data-filter");
        reviewCards.forEach(function (card) {
          var types = (card.getAttribute("data-review-type") || "").split(",");
          var show = type === "all" || types.indexOf(type) !== -1;
          card.style.display = show ? "" : "none";
        });
      });
    });
  }

  // ---- 강의문의 폼: 메일 클라이언트로 전달 ----
  var contactForm = document.getElementById("lecture-inquiry-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(contactForm);
      var get = function (k) { return (data.get(k) || "").toString().trim(); };

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      var targetEmail = contactForm.getAttribute("data-contact-email") || "";
      var lines = [
        "기관명: " + get("org"),
        "담당자: " + get("manager"),
        "연락처: " + get("phone"),
        "이메일: " + get("email"),
        "교육대상: " + get("audience"),
        "예상인원: " + get("headcount"),
        "희망일: " + get("date"),
        "희망시간: " + get("time"),
        "교육주제: " + get("topic"),
        "",
        "문의내용:",
        get("message")
      ];
      var subject = encodeURIComponent("[강의문의] " + (get("org") || "기관명 미입력"));
      var body = encodeURIComponent(lines.join("\n"));

      var statusEl = document.getElementById("form-status");

      if (!targetEmail || targetEmail.indexOf("@") === -1) {
        if (statusEl) {
          statusEl.textContent = "문의 접수 이메일이 아직 연결되지 않았습니다. 담당자 이메일이 등록되면 이 버튼으로 바로 메일이 전송됩니다. 지금은 강의문의 페이지에 안내된 연락처로 직접 문의해 주세요.";
          statusEl.hidden = false;
        }
        return;
      }

      window.location.href = "mailto:" + targetEmail + "?subject=" + subject + "&body=" + body;
      if (statusEl) {
        statusEl.textContent = "메일 작성 화면으로 이동합니다. 메일 프로그램이 열리지 않으면 위 이메일 주소로 직접 문의 내용을 보내주세요.";
        statusEl.hidden = false;
      }
    });
  }

  // ---- 푸터 연도 자동 갱신 ----
  document.querySelectorAll("[data-current-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ---- 외부 링크 자동 처리: 같은 사이트가 아니면 새 탭 + rel="noopener noreferrer" ----
  // 내부 페이지 이동, 뒤로가기 등 브라우저 기본 탐색 동작은 건드리지 않습니다.
  var applyExternalLinkAttrs = function () {
    var currentHost = window.location.hostname.replace(/^www\./, "");
    document.querySelectorAll("a[href]").forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href || href.charAt(0) === "#") return;

      var url;
      try {
        url = new URL(href, window.location.href);
      } catch (e) {
        return;
      }

      if (url.protocol !== "http:" && url.protocol !== "https:") return;

      var linkHost = url.hostname.replace(/^www\./, "");
      if (linkHost === currentHost) return;

      link.setAttribute("target", "_blank");
      var relTokens = (link.getAttribute("rel") || "").split(/\s+/).filter(Boolean);
      ["noopener", "noreferrer"].forEach(function (token) {
        if (relTokens.indexOf(token) === -1) relTokens.push(token);
      });
      link.setAttribute("rel", relTokens.join(" "));
    });
  };
  applyExternalLinkAttrs();

  // ---- 해시로 연결된 FAQ 항목 자동 펼치기 (예: /faq#faq-havruta) ----
  var openTargetFromHash = function () {
    if (!window.location.hash) return;
    var target = document.getElementById(window.location.hash.slice(1));
    if (target && target.tagName === "DETAILS") {
      target.open = true;
      target.scrollIntoView({ block: "start" });
    }
  };
  openTargetFromHash();
  window.addEventListener("hashchange", openTargetFromHash);
})();
