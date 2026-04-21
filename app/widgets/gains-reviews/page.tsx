"use client";
import { useEffect, useState } from "react";

const reviews = [
  {
    name: "Marcelo Gaggero",
    rating: 5,
    text: "Terminé comprando un montón en Gains. La calidad es increíble y las prendas son re facheras",
  },
  {
    name: "Leonardo Waserman",
    rating: 5,
    text: "Tengo varias cosas de Gains y las uso siempre. Muy buena calidad y excelente atención.",
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
  const isMobile = typeof window !== "undefined" ? window.innerWidth <= 768 : false;

  return (
    <div
      style={{
        fontSize: isMobile ? "15px" : "18px",
        letterSpacing: isMobile ? "2px" : "3px",
        color: "#D4AF37",
        marginBottom: isMobile ? "14px" : "18px",
      }}
    >
      {"★".repeat(rating)}
    </div>
  );
}

export default function GainsReviewsPage() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const isMobile = typeof window !== "undefined" ? window.innerWidth <= 768 : false;
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
          padding: isMobile ? "18px 14px" : "32px 20px",
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          background: "#000000",
          boxSizing: "border-box",
        
          display: "flex",
          alignItems: isMobile ? "center" : "flex-start",
          justifyContent: "center",
        
          minHeight: isMobile ? "100vh" : "auto",
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
            fontSize: isMobile ? "11px" : "12px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            marginBottom: isMobile ? "8px" : "10px",
          }}
        >
          Testimonios
        </p>

        <h2
          style={{
            fontSize: isMobile ? "22px" : "clamp(28px, 4vw, 42px)",
            lineHeight: 1.08,
            marginBottom: isMobile ? "10px" : "12px",
            color: "#ffffff",
            fontWeight: 600,
          }}
        >
          Lo que dicen nuestros clientes
        </h2>

        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            marginBottom: isMobile ? "18px" : "32px",
            fontSize: isMobile ? "13px" : "16px",
            lineHeight: 1.4,
          }}
        >
          Opiniones de quienes ya compraron en Gains
        </p>

        <div
          style={{
            position: "relative",
            background: "rgba(255,255,255,0.98)",
            borderRadius: isMobile ? "24px" : "28px",
            padding: isMobile ? "22px 18px" : "42px 32px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
            minHeight: isMobile ? "210px" : "260px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.08)",
            overflow: "hidden",
            boxSizing: "border-box",
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
                fontSize: isMobile ? "15px" : "clamp(20px, 2.4vw, 30px)",
                lineHeight: isMobile ? 1.45 : 1.45,
                marginBottom: isMobile ? "14px" : "22px",
                color: "#111111",
                fontWeight: 500,
                maxWidth: "720px",
                marginInline: "auto",
                minHeight: isMobile ? "64px" : "88px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
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
                  fontSize: isMobile ? "13px" : "16px",
                  color: "#111111",
                  fontWeight: 700,
                }}
              >
                {review.name}
              </strong>

              <span
                style={{
                  fontSize: isMobile ? "11px" : "13px",
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
            marginTop: isMobile ? "12px" : "22px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: isMobile ? "10px" : "14px",
          }}
        >
          <button
            onClick={handlePrev}
            aria-label="Reseña anterior"
            style={{
              width: isMobile ? "36px" : "46px",
              height: isMobile ? "36px" : "46px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.08)",
              color: "#ffffff",
              fontSize: isMobile ? "14px" : "18px",
              cursor: "pointer",
              padding: 0,
              lineHeight: 1,
            }}
          >
            ←
          </button>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => changeReview(i)}
                aria-label={`Ir a reseña ${i + 1}`}
                style={{
                  width: i === index ? (isMobile ? "18px" : "26px") : "8px",
                  height: "8px",
                  borderRadius: "999px",
                  border: "none",
                  background: i === index ? "#ffffff" : "rgba(255,255,255,0.35)",
                  cursor: "pointer",
                  transition: "all 220ms ease",
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Siguiente reseña"
            style={{
              width: isMobile ? "36px" : "46px",
              height: isMobile ? "36px" : "46px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.08)",
              color: "#ffffff",
              fontSize: isMobile ? "14px" : "18px",
              cursor: "pointer",
              padding: 0,
              lineHeight: 1,
            }}
          >
            →
          </button>
        </div>
        <div
          style={{
            marginTop: isMobile ? "10px" : "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            color: "rgba(255,255,255,0.72)",
            fontSize: isMobile ? "11px" : "12px",
          }}
        >
          <img
            src="/isotipo.svg"
            alt="Flikker"
            style={{ width: "14px", height: "14px" }}
          />
          <span>Powered by Flikker</span>
        </div>
      </section>
    </main>
  );
}