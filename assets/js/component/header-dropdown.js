/**
 * ヘッダー：事業紹介ドロップダウンの制御
 */
export const initializeHeaderDropdown = () => {
  document.addEventListener("DOMContentLoaded", function () {
    const item = document.querySelector(".js-header-business-detail");
    const link = document.querySelector(".js-header-item-link");

    if (!item || !link) return;

    let isAnimating = false;

    const contentsOpeningKeyframes = {
      opacity: [0, 1],
    };

    const contentsClosingKeyframes = {
      opacity: [1, 0],
    };

    const options = {
      duration: 150,
      easing: "ease-out",
    };

    const closeDropdown = () => {
      if (isAnimating || !item.classList.contains("is-open")) return;

      isAnimating = true;
      const anim = item.animate(contentsClosingKeyframes, options);

      anim.onfinish = () => {
        item.classList.remove("is-open");
        isAnimating = false;
      };
    };

    const openDropdown = () => {
      if (isAnimating || item.classList.contains("is-open")) return;

      isAnimating = true;
      item.classList.add("is-open");
      const anim = item.animate(contentsOpeningKeyframes, options);

      anim.onfinish = () => {
        isAnimating = false;
      };
    };

    link.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!item.classList.contains("is-open")) {
        openDropdown();
      } else {
        closeDropdown();
      }
    });

    // 外側クリックで非表示
    document.addEventListener("click", (e) => {
      if (!item.contains(e.target) && e.target !== link) {
        closeDropdown();
      }
    });

    // Escapeキーを押すと非表示
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeDropdown();
      }
    });
  });
};
