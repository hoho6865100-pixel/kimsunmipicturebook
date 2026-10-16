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
    var applyReviewFilter = function (type) {
      var matched = false;
      reviewFilterBar.querySelectorAll(".filter-btn").forEach(function (b) {
        var active = b.getAttribute("data-filter") === type;
        if (active) matched = true;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", active ? "true" : "false");
      });
      if (!matched) return;
      reviewCards.forEach(function (card) {
        var types = (card.getAttribute("data-review-type") || "").split(",");
        var show = type === "all" || types.indexOf(type) !== -1;
        card.style.display = show ? "" : "none";
      });
    };
    reviewFilterBar.querySelectorAll(".filter-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyReviewFilter(btn.getAttribute("data-filter"));
      });
    });
    // 다른 페이지에서 /testimonials?type=부모교육 형태로 들어오면 해당 필터를 자동 적용합니다.
    var requestedType = new URLSearchParams(window.location.search).get("type");
    if (requestedType) applyReviewFilter(requestedType);
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
