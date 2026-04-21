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
    container.style.pointerEvents = "none";

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
        min-width: ${mobile ? "220px" : "260px"};
        max-width: ${mobile ? "280px" : "320px"};
        background: #DCE2F0;
        color: #000441;
        border-radius: ${mobile ? "16px" : "18px"};
        box-shadow: 0 12px 30px rgba(0,0,0,0.18);
        padding: ${mobile ? "12px 14px" : "14px 16px"};
        display: flex;
        align-items: center;
        gap: 12px;
        border: 1px solid rgba(0, 4, 65, 0.08);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      ">
        <div style="
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: #9188F5;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #ffffff;
          font-size: 18px;
          font-weight: 700;
          line-height: 1;
        ">
          ★
        </div>

        <div style="display:flex; flex-direction:column; gap:4px;">
          <div style="
            font-size: ${mobile ? "13px" : "14px"};
            font-weight: 600;
            line-height: 1.2;
          ">
            ${review.name} nos dejó ${review.rating} estrellas
          </div>

          <div style="
            color: #FAAB4B;
            font-size: 14px;
            letter-spacing: 2px;
            line-height: 1;
          ">
            ${createStars(review.rating)}
          </div>

          <div style="
            font-size: ${mobile ? "11px" : "12px"};
            color: rgba(0, 4, 65, 0.72);
            display: flex;
            align-items: center;
            gap: 6px;
            flex-wrap: wrap;
          ">
            <span>${review.ago}</span>
            <span>•</span>
            <img 
              src="https://widget-gains-hardcoded-production.up.railway.app/isotipo.svg"
              style="width:12px;height:12px;"
            />
            <span>Powered by Flikker</span>
          </div>
        </div>
      </div>
    `;
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
    }, 30000);
  }

  window.addEventListener("resize", render);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();