import { useState, useEffect, useMemo } from "react";
import styles from "./HeartIntro.module.css";

const HeartIntro = ({ onComplete }) => {
  const [phase, setPhase] = useState("initial"); // initial -> forming -> complete

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("forming"), 2000);
    const timer2 = setTimeout(() => {
      setPhase("complete");
      setTimeout(() => onComplete(), 1000);
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  // Tính toán vị trí các trái tim
  const hearts = useMemo(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Scale để trái tim chiếm 70-80% chiều cao màn hình
    const heartScale = (window.innerHeight * 0.75) / 40;

    return Array.from({ length: 100 }, (_, i) => {
      const heart = {
        id: i,
        initialX: Math.random() * window.innerWidth,
        initialY: Math.random() * window.innerHeight,
        finalX: 0,
        finalY: 0,
      };

      if (i < 60) {
        // 60 trái tim tạo viền trái tim lớn
        const angle = (i / 60) * Math.PI * 2;
        const t = angle;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t)
        );

        heart.finalX = centerX + x * heartScale;
        heart.finalY = centerY + y * heartScale;
      } else {
        // 40 trái tim tạo chữ T viết hoa (chiếm 60% kích thước trái tim)
        const index = i - 60;
        const tScale = heartScale * 0.6;

        if (index < 15) {
          // Thanh ngang của chữ T (rộng hơn, 15 trái tim)
          heart.finalX = centerX - 7 * tScale + index * tScale;
          heart.finalY = centerY - 10 * tScale;
        } else {
          // Thanh dọc của chữ T (dài hơn, 25 trái tim, ở giữa)
          heart.finalX = centerX;
          heart.finalY = centerY - 10 * tScale + (index - 14) * tScale;
        }
      }

      return heart;
    });
  }, []);

  return (
    <div className={styles.container}>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`${styles.heart} ${
            phase === "initial" ? styles.twinkle : ""
          }`}
          style={{
            left: `${phase === "initial" ? heart.initialX : heart.finalX}px`,
            top: `${phase === "initial" ? heart.initialY : heart.finalY}px`,
            opacity: phase === "complete" ? 0 : 1,
            transform: phase === "complete" ? "scale(0)" : "scale(1)",
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

export default HeartIntro;
