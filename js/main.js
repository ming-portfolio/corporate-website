/**
 * ビューポートの設定を切り替え
 * 画面の幅が380px未満の場合：ビューポートを380pxに固定
 * それ以上の場合：デバイスの幅に基づいてビューポートを設定
 */
const switchViewport = () => {
  // ビューポート要素を取得
  const viewportMeta = document.querySelector('meta[name="viewport"]');

  // 条件に基づいて適用するビューポートの設定を決定
  const viewportContent = window.outerWidth > 380 ? "width=device-width, initial-scale=1" : "width=380";

  // ビューポート要素が存在しない場合はreturn
  if (!viewportMeta) return;

  // 現在のビューポートの設定が目的の設定と異なる場合にのみ、新しい設定を適用します。
  if (viewportMeta.getAttribute("content") !== viewportContent) {
    viewportMeta.setAttribute("content", viewportContent);
  }
};
switchViewport();
window.addEventListener("resize", switchViewport);

/**
 * ヘッダー：事業紹介ドロップダウンの制御
 */
const initializeHeaderDropdown = () => {
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
      duration: 300,
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
initializeHeaderDropdown();

/**
 * ハンバーガーメニュー
 */
const initializeHamburgerMenu = () => {
  const menu = document.querySelector(".js-header-menu");
  const openButton = document.querySelector(".js-header-menu-open-button");
  const closeButton = document.querySelector(".js-header-menu-close-button");

  // コンテンツ Opening Keyframe
  const contentsOpeningKeyframes = {
    opacity: [0, 1],
  };

  // コンテンツ Opening Option
  const contentsOpeningOptions = {
    duration: 200,
    easing: "ease-out",
  };

  // コンテンツ Closing Keyframe
  const contentsClosingKeyframes = {
    opacity: [1, 0],
  };

  // コンテンツ Closing Option
  const contentsClosingOptions = {
    duration: 200,
    easing: "ease-out",
  };

  // menuとopenButtonがページ内にない場合returnする
  if (!menu || !openButton) return;

  // メニューopenする関数
  const openMenu = () => {
    menu.showModal();
    openButton.classList.add("is-open");
    menu.animate(contentsOpeningKeyframes, contentsOpeningOptions);
  };

  // メニューcloseする関数
  const closeMenu = () => {
    const closingAnim = menu.animate(contentsClosingKeyframes, contentsClosingOptions);
    openButton.classList.remove("is-open");

    // アニメーションの完了後
    closingAnim.onfinish = () => {
      menu.close();
    };
  };

  // ボタンクリックでopen
  openButton.addEventListener("click", () => {
    openMenu();
  });

  // クローズボタンクリックでclose
  closeButton.addEventListener("click", () => {
    closeMenu();
  });

  // Escapeキーを押すと非表示
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
    }
  });
};
initializeHamburgerMenu();

/**
 * contact背景スライド
 */
const initializeContactBgSlider = () => {
  document.addEventListener("DOMContentLoaded", function () {
    const el = document.querySelector(".js-contact-bg-splide");
    if (!el) return;

    const splide = new Splide(el, {
      type: "loop",
      drag: false,
      arrows: false,
      pagination: false,
      autoWidth: true,
      gap: "100rem",
      autoScroll: {
        speed: 0.5,
        pauseOnHover: false,
        pauseOnFocus: false,
      },
    });

    splide.mount(window.splide.Extensions);
  });
};
initializeContactBgSlider();

/**
 * footer：ページトップへ戻る
 */
const scrollToTop = () => {
  const btn = document.querySelector(".js-footer-button");
  if (!btn) return;

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};
scrollToTop();

/**
 * トップページKVスライド
 */
const initializeTopMainVisual = () => {
  const el = document.querySelector(".js-top-kv-splide");
  if (!el) return;

  const splide = new Splide(el, {
    type: "fade",
    rewind: true,
    speed: 2000,
    interval: 10000,
    autoplay: true,
    pauseOnHover: false,
    arrows: false,
    pagination: false,
  });

  // スライド番号の連動アニメーション ---
  const numberEl = document.querySelector(".js-top-kv-circle-num");
  if (!numberEl) return;

  if (numberEl) {
    const animOptions = {
      duration: 400,
      easing: "ease-out",
    };

    splide.on("move", (newIndex) => {
      // 1. まず今の数字をふわっと消す
      const fadeOut = numberEl.animate({ opacity: [1, 0], transform: ["translateY(0)", "translateY(-5px)"] }, animOptions);

      fadeOut.onfinish = () => {
        // 2. 消えきったら数字を書き換える（01, 02...の形式に）
        const nextNum = (newIndex + 1).toString().padStart(2, "0");
        numberEl.textContent = nextNum;

        // 3. 新しい数字をふわっと出す
        numberEl.animate({ opacity: [0, 1], transform: ["translateY(5px)", "translateY(0)"] }, animOptions);
      };
    });
  }

  splide.mount();
};
initializeTopMainVisual();

/**
 * トップページ KVテキストのアニメーション
 */
const initializeAnimateKV = () => {
  const title = ".js-top-kv-jp";
  const subtitle = ".js-top-kv-en";

  if (!title || !subtitle) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)",
    },
    (context) => {
      const { isMobile } = context.conditions;
      const tl = gsap.timeline();

      tl.from(title, {
        y: isMobile ? 15 : 30,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.2,
      }).from(
        subtitle,
        {
          y: 10,
          opacity: 0,
          duration: 1.0,
          ease: "power2.out",
        },
        "-=1.2"
      );
    }
  );
};
initializeAnimateKV();

/**
 * トップページ Newsアニメーション
 */
const initializeAnimateNews = () => {
  const item = document.querySelectorAll(".js-top-news-item");
  const list = document.querySelector(".js-top-news-list");

  if (!item || !list) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      // メディアクエリの設定
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)",
    },
    (context) => {
      const { isMobile } = context.conditions;

      gsap.from(item, {
        // SPのときは10、PCのときは40
        y: isMobile ? 10 : 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: list,
          // 発火タイミングもSPは少し遅め（画面の下の方）にすると自然です
          start: isMobile ? "top 90%" : "top 85%",
        },
      });
    }
  );
};
initializeAnimateNews();

/**
 * トップページ Businessアニメーション
 */
const initializeAnimateBusiness = () => {
  const box = document.querySelector(".js-top-business-inner");
  const image = document.querySelector(".js-top-business-image");
  const content = document.querySelector(".js-top-business-content");

  if (!box || !image || !content) return;

  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)",
    },
    (context) => {
      let { isMobile } = context.conditions;

      // 画像のアニメーション
      gsap.from(image, {
        x: isMobile ? 0 : -60,
        y: isMobile ? 20 : 0,
        opacity: 0,
        duration: 2.0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: box,
          start: isMobile ? "top 95%" : "top 85%",
        },
      });

      // テキストのアニメーション
      gsap.from(content, {
        x: isMobile ? 0 : 60,
        y: isMobile ? 20 : 0,
        opacity: 0,
        duration: 2.0,
        delay: isMobile ? 0.3 : 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: box,
          start: isMobile ? "top 95%" : "top 85%",
        },
      });
    }
  );
};
initializeAnimateBusiness();

/**
 * トップページ PRODUCTスライド
 */
const initializeTopProductSlider = () => {
  document.addEventListener("DOMContentLoaded", function () {
    const el = document.querySelector(".js-top-product-splide");

    if (!el) return;

    const splide = new Splide(el, {
      type: "loop",
      padding: { left: 0, right: "94rem" },
      gap: 32,
      perPage: 3,
      focus: 0,
      pagination: false,
      arrows: true,

      autoScroll: {
        speed: 0.5, // スクロール速度（数値が大きいほど速い）
        pauseOnHover: false, // マウスホバー時に一時停止するか
        pauseOnFocus: false, // フォーカス時に一時停止するか
      },

      breakpoints: {
        767: {
          perPage: 1,
          gap: 24,
          padding: { left: 0, right: "60rem" },
        },
      },
    });

    splide.mount(window.splide.Extensions);

    // 矢印ボタンを除外して、画像エリアだけホバーで止める設定 ---
    const track = el.querySelector(".splide__track");
    const autoScroll = splide.Components.AutoScroll;

    if (track && autoScroll) {
      // 画像エリア（track）にマウスが乗ったら停止
      track.addEventListener("mouseenter", () => {
        autoScroll.pause();
      });

      // 画像エリア（track）からマウスが外れたら再開
      track.addEventListener("mouseleave", () => {
        autoScroll.play();
      });
    }
  });
};
initializeTopProductSlider();

/**
 * トップページ 会社概要・代表挨拶・アクセスのアニメーション
 */
const initializeAnimateOthers = () => {
  const item = document.querySelectorAll(".js-top-others-item");
  const list = document.querySelector(".js-top-others-list");

  if (!item || !list) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)",
    },
    (context) => {
      let { isMobile } = context.conditions;

      if (isMobile) {
        gsap.utils.toArray(item).forEach((item) => {
          gsap.from(item, {
            y: 20,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
            },
          });
        });
      } else {
        gsap.from(item, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: list,
            start: "top 85%",
          },
        });
      }
    }
  );
};
initializeAnimateOthers();

/**
 * 下層ページ（会社概要）のタイトル出現アニメーション
 */
const initializeCompanyAnimation = () => {
  const en = document.querySelectorAll(".js-page-title-en");
  const jp = document.querySelector(".js-page-title-jp");

  if (!en || !jp) return;

  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline();
  tl.from([en, jp], {
    y: 20,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    stagger: 0.2,
  });
};

initializeCompanyAnimation();

/**
 * 事業紹介ページ サイドメニューのスクロール連動
 */
const initializeBusinessMenuScroll = () => {
  const menuLinks = document.querySelectorAll(".js-business-menu-item-link");
  const sections = document.querySelectorAll(".js-scroll-section");

  if (menuLinks.length === 0 || sections.length === 0) return;

  const options = {
    rootMargin: "-50% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        menuLinks.forEach((link) => link.classList.remove("is-active"));

        const id = entry.target.getAttribute("id");
        const activeLink = document.querySelector(`.js-business-menu-item-link[href="#${id}"]`);

        if (activeLink) {
          activeLink.classList.add("is-active");
        }
      }
    });
  }, options);

  sections.forEach((section) => observer.observe(section));
};
initializeBusinessMenuScroll();
