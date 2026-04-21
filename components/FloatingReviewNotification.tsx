"use client";

import { useEffect, useState } from "react";
import isotipo from "@/isotipo.svg";
type Review = {
  name: string;
  rating: number;
  ago: string;
};

const reviews: Review[] = [
  { name: "Paula Pizzano", rating: 5, ago: "hace 4 días" },
  { name: "Cindy Maqueira", rating: 5, ago: "hace 1 semana" },
  { name: "Marcelo", rating: 5, ago: "hace 9 días" },
  { name: "Its NatyG", rating: 5, ago: "hace 5 horas" },
  { name: "Martin Herrera", rating: 5, ago: "hace 1 día" },
  { name: "Eugenia Villar", rating: 5, ago: "hace 4 días" },
  { name: "Julián Moreno", rating: 5, ago: "hace 4 días" },
  { name: "Magda", rating: 5, ago: "hace 4 días" },
  { name: "Agustina Machín", rating: 5, ago: "hace 4 días" },
  { name: "Florencia Lorenzo", rating: 5, ago: "hace 4 días" },
  { name: "Kym Centeno", rating: 5, ago: "hace 4 días" },
  { name: "Pothiti Kriaris", rating: 5, ago: "hace 4 días" },
  { name: "Marcelo Gaggero", rating: 5, ago: "hace 4 días" },
  { name: "Lucía", rating: 5, ago: "hace 4 días" },
  { name: "Victoria Apollonia", rating: 5, ago: "hace 4 días" },
  { name: "Sofia Sena", rating: 5, ago: "hace 4 días" },
  { name: "Cynthia Falconi", rating: 5, ago: "hace 4 días" },
  { name: "Gonzalo Martín Peralta Gadea", rating: 5, ago: "hace 4 días" },
  { name: "Leonardo Waserman", rating: 5, ago: "hace 4 días" },
  { name: "Alejandra Valdez", rating: 5, ago: "hace 4 días" },
  { name: "Caro Juárez", rating: 5, ago: "hace 4 días" },
  { name: "Caro Alonzo", rating: 5, ago: "hace 1 semana" },
  { name: "German Faller", rating: 5, ago: "hace 1 semana" },
  { name: "Aron Machado", rating: 5, ago: "hace 1 semana" },
  { name: "Rodrigo Velázquez", rating: 5, ago: "hace 1 semana" },
  { name: "Fiorella Borche", rating: 5, ago: "hace 1 semana" },
  { name: "Christian Ferrer", rating: 5, ago: "hace 1 semana" },
  { name: "Laila Luraschi", rating: 5, ago: "hace 1 semana" },
  { name: "Marcela Batistessa", rating: 5, ago: "hace 1 semana" },
  { name: "Paula Bernera", rating: 5, ago: "hace 1 semana" },
  { name: "Maitê Tiemi", rating: 5, ago: "hace 1 semana" },
  { name: "Federico Vico", rating: 5, ago: "hace 1 semana" },
  { name: "Cesar Alvarez", rating: 5, ago: "hace 1 semana" },
  { name: "Sabri Duarte", rating: 5, ago: "hace 1 semana" },
  { name: "Matias Mendez", rating: 5, ago: "hace 2 semanas" },
  { name: "Florencia Mocchi", rating: 5, ago: "hace 2 semanas" },
  { name: "Facu Manzi", rating: 5, ago: "hace 2 semanas" },
  { name: "Alejandra Martino", rating: 5, ago: "hace 2 semanas" },
  { name: "Gerardo Abal", rating: 5, ago: "hace 2 semanas" },
  { name: "Lysergic", rating: 5, ago: "hace 2 semanas" },
  { name: "Mayte Otero", rating: 5, ago: "hace 2 semanas" },
  { name: "Capucha SRL", rating: 5, ago: "hace 3 semanas" },
  { name: "Gastón Haller", rating: 5, ago: "hace 3 semanas" },
  { name: "Fabrizio Rodriguez", rating: 5, ago: "hace 3 semanas" },
  { name: "Sebastián Agarrayúa", rating: 5, ago: "hace 1 mes" },
  { name: "Equis De", rating: 5, ago: "hace 3 meses" },
  { name: "Daniel Antuoni", rating: 5, ago: "hace 4 meses" },
  { name: "Victoria Ciomei", rating: 5, ago: "hace 7 meses" },
  { name: "Jorge Sanguinet", rating: 5, ago: "hace 7 meses" },
  { name: "Claudia Ruiz", rating: 5, ago: "hace 7 meses" },
  { name: "mateo mendez", rating: 5, ago: "hace 7 meses" },
  { name: "Richard Sanguinet", rating: 5, ago: "hace 7 meses" },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div
      style={{
        color: "#FAAB4B",
        fontSize: "14px",
        letterSpacing: "2px",
        lineHeight: 1,
      }}
    >
      {"★".repeat(rating)}
    </div>
  );
}

export default function FloatingReviewNotification() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  // ACA
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const showNotification = () => {
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 6000);
    };

    showNotification();

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 6000);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const review = reviews[index];

  return (
    <div
      style={{
        position: "fixed",
        left: isMobile ? "12px" : "16px",
        bottom: isMobile ? "12px" : "16px",
        zIndex: 9999,
        transform: visible ? "translateY(0px)" : "translateY(24px)",
        opacity: visible ? 1 : 0,
        pointerEvents: "none",
        transition: "all 280ms ease",
      }}
    >
      <div
        style={{
          minWidth: isMobile ? "220px" : "260px",
          maxWidth: isMobile ? "280px" : "320px",
          background: "#DCE2F0",
          color: "#000441",
          borderRadius: isMobile ? "16px" : "18px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
          padding: isMobile ? "12px 14px" : "14px 16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          border: "1px solid rgba(0, 4, 65, 0.08)",
        }}
      >
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "12px",
            background: "#9188F5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <img
            src={isotipo.src}
            alt="Flikker"
            style={{ width: "20px", height: "20px" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div
            style={{
              fontSize: isMobile ? "13px" : "14px",
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            {review.name} dejó {review.rating} estrellas
          </div>

          <Stars rating={review.rating} />

          <div
            style={{
              fontSize: isMobile ? "11px" : "12px",
              color: "rgba(0, 4, 65, 0.72)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexWrap: "wrap",
            }}
          >
            <span>{review.ago}</span>
            <span>•</span>
            <span>Powered by Flikker</span>
          </div>
        </div>
      </div>
    </div>
  );
}