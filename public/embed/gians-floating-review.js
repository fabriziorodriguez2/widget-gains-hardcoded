(function () {
  const reviews = [
    { name: "Paula Pizzano", rating: 5, ago: "hace 4 días" },
    { name: "Cindy Maqueira", rating: 5, ago: "hace 1 semana" },
    { name: "Marcelo", rating: 5, ago: "hace 9 días" },
  ];

  let index = 0;
  let visible = false;
  let hideTimeout = null;

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function createStars(rating) {
    return "★".repeat(rating);
  }

  function createContainer() {
    let container = document.getElementById("flikker-floating-review-root");

    if (container) return container;

    container = document.createElement("div");
    container.id = "flikker-floating-review-root";
    container.style.position = "fixed";
    container.style.left = isMobile() ? "12px" : "16px";
    container.style.bottom = isMobile() ? "12px" : "16px";
    container.style.zIndex = "999999";
    container.style.transition = "all 280ms ease";
    container.style.transform = "translateY(24px)";
    container.style.opacity = "0";
    container.style.pointerEvents = "auto";

    document.body.appendChild(container);
    return container;
  }

 function render() {
  const container = createContainer();
  const review = reviews[index];
  const mobile = isMobile();

  container.style.left = mobile ? "12px" : "16px";
  container.style.bottom = mobile ? "12px" : "16px";

  container.innerHTML = `
    <div style="
      position: relative;
      min-width: ${mobile ? "220px" : "260px"};
      max-width: ${mobile ? "280px" : "320px"};
      background: #DCE2F0;
      color: #000441;
      border-radius: ${mobile ? "16px" : "18px"};
      box-shadow: 0 12px 30px rgba(0,0,0,0.16);
      padding: ${mobile ? "14px 14px 12px 14px" : "16px 16px 14px 16px"};
      display: flex;
      align-items: center;
      gap: 12px;
      border: 1px solid rgba(0, 4, 65, 0.08);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      backdrop-filter: blur(8px);
    ">
      <button
        id="flikker-floating-review-close"
        aria-label="Cerrar notificación"
        style="
          position: absolute;
          top: 8px;
          right: 8px;
          width: ${mobile ? "22px" : "24px"};
          height: ${mobile ? "22px" : "24px"};
          border-radius: 999px;
          border: 1px solid rgba(0, 4, 65, 0.08);
          background: rgba(255,255,255,0.45);
          color: rgba(0, 4, 65, 0.58);
          font-size: ${mobile ? "14px" : "15px"};
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          transition: all 180ms ease;
          box-sizing: border-box;
        "
      >
        ×
      </button>

      <div style="
        width: ${mobile ? "36px" : "38px"};
        height: ${mobile ? "36px" : "38px"};
        border-radius: 12px;
        background: #9188F5;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: #ffffff;
        font-size: ${mobile ? "17px" : "18px"};
        font-weight: 700;
        line-height: 1;
        margin-top: 2px;
      ">
        ★
      </div>

      <div style="
        display:flex;
        flex-direction:column;
        gap:4px;
        padding-right: 18px;
      ">
        <div style="
          font-size: ${mobile ? "13px" : "14px"};
          font-weight: 600;
          line-height: 1.2;
          color: #000441;
        ">
          ${review.name} nos dejó ${review.rating} estrellas
        </div>

        <div style="
          color: #FAAB4B;
          font-size: ${mobile ? "13px" : "14px"};
          letter-spacing: 2px;
          line-height: 1;
        ">
          ${createStars(review.rating)}
        </div>

        <div style="
          font-size: ${mobile ? "11px" : "12px"};
          color: rgba(0, 4, 65, 0.68);
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          line-height: 1.25;
        ">
          <span>${review.ago}</span>
          <span>•</span>
          <span>Powered by Flikker</span>
        </div>
      </div>
    </div>
  `;

  const closeButton = document.getElementById("flikker-floating-review-close");

  if (closeButton) {
    closeButton.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      hide();
    });

    closeButton.addEventListener("mouseenter", function () {
      if (window.innerWidth > 768) {
        closeButton.style.background = "rgba(255,255,255,0.8)";
        closeButton.style.color = "rgba(0, 4, 65, 0.82)";
        closeButton.style.border = "1px solid rgba(0, 4, 65, 0.14)";
      }
    });

    closeButton.addEventListener("mouseleave", function () {
      if (window.innerWidth > 768) {
        closeButton.style.background = "rgba(255,255,255,0.45)";
        closeButton.style.color = "rgba(0, 4, 65, 0.58)";
        closeButton.style.border = "1px solid rgba(0, 4, 65, 0.08)";
      }
    });
  }
}

  function show() {
    const container = createContainer();
    render();

    requestAnimationFrame(() => {
      container.style.transform = "translateY(0px)";
      container.style.opacity = "1";
    });

    visible = true;

    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      hide();
    }, 6000);
  }

  function hide() {
    const container = createContainer();
    container.style.transform = "translateY(24px)";
    container.style.opacity = "0";
    visible = false;
  }

  function nextReview() {
    index = (index + 1) % reviews.length;
  }

  function start() {
    show();

    setInterval(() => {
      nextReview();
      show();
    }, 35000);
  }

  window.addEventListener("resize", render);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();