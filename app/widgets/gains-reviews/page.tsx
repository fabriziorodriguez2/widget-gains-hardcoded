"use client";

import { useEffect, useState } from "react";

const reviews = [
  {
    name: "Marcelo Gaggero",
    rating: 5,
    text: "Sin darme cuenta termine con la mitad de la ropa del ropero de Gains, la calidad es increíble además de ser prendas re facheras!",
  },
  {
    name: "Leonardo Waserman",
    rating: 5,
    text: "De Gains tengo una riñonera, un buzo y un gorro que los uso siempre. ¡La calidad es muy buena y la atención excelente!",
  },
  {
    name: "Eugenia Villar",
    rating: 5,
    text: "La ropa es excelente, de muy buena calidad y súper cómoda. Además, la atención es impecable.",
  },
  {
    name: "Cindy Maqueira",
    rating: 5,
    text: "Re linda ropa,  de buena calidad y supera expectativas, todo bien hace GAINS ❤️",
  },
  {
    name: "Paula Pizzano",
    rating: 5,
    text: "Ropa de la buena",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div
      style={{
        fontSize: "18px",
        letterSpacing: "3px",
        color: "#D4AF37",
        marginBottom: "18px",
      }}
    >
      {"★".repeat(rating)}
    </div>
  );
}

export default function GainsReviewsPage() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  const changeReview = (updater: number | ((prev: number) => number)) => {
    setAnimate(false);

    setTimeout(() => {
      setIndex((prev) =>
        typeof updater === "function" ? updater(prev) : updater
      );
      setAnimate(true);
    }, 120);
  };

  const handlePrev = () => {
    changeReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    changeReview((prev) => (prev + 1) % reviews.length);
  };

  useEffect(() => {
    const id = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(id);
  }, []);

  const review = reviews[index];

  return (
    <main
      style={{
        margin: 0,
        padding: "40px 20px",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        background: "linear-gradient(180deg, #050505 0%, #0a0a0a 100%)",
      }}
    >
      <section
        style={{
          maxWidth: "920px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            marginBottom: "10px",
          }}
        >
          Testimonios
        </p>

        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 42px)",
            lineHeight: 1.1,
            marginBottom: "12px",
            color: "#ffffff",
            fontWeight: 600,
          }}
        >
          Lo que dicen nuestros clientes
        </h2>

        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            marginBottom: "32px",
            fontSize: "16px",
          }}
        >
          Opiniones de quienes ya compraron en Gains
        </p>

        <div
          style={{
            position: "relative",
            background: "rgba(255,255,255,0.98)",
            borderRadius: "28px",
            padding: "42px 32px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
            minHeight: "260px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-40px",
              right: "-40px",
              width: "140px",
              height: "140px",
              borderRadius: "999px",
              background: "rgba(0,0,0,0.03)",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: "-50px",
              left: "-50px",
              width: "160px",
              height: "160px",
              borderRadius: "999px",
              background: "rgba(0,0,0,0.025)",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              opacity: animate ? 1 : 0.35,
              transform: animate ? "translateY(0px)" : "translateY(6px)",
              transition: "all 220ms ease",
            }}
          >
            <Stars rating={review.rating} />

            <p
              style={{
                fontSize: "clamp(20px, 2.4vw, 30px)",
                lineHeight: 1.45,
                marginBottom: "22px",
                color: "#111111",
                fontWeight: 500,
                maxWidth: "720px",
                marginInline: "auto",
              }}
            >
              “{review.text}”
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                alignItems: "center",
              }}
            >
              <strong
                style={{
                  fontSize: "16px",
                  color: "#111111",
                  fontWeight: 700,
                }}
              >
                {review.name}
              </strong>

              <span
                style={{
                  fontSize: "13px",
                  color: "#666666",
                }}
              >
                Compra verificada
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "22px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <button onClick={handlePrev} aria-label="Reseña anterior">
            ←
          </button>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => changeReview(i)}
                aria-label={`Ir a reseña ${i + 1}`}
              />
            ))}
          </div>

          <button onClick={handleNext} aria-label="Siguiente reseña">
            →
          </button>
        </div>
      </section>
    </main>
  );
}