import { useState, useEffect } from "react";
import styles from "./FinalScreen.module.css";
// Import GIF từ assets
import heartGif from "../../assets/heart.gif";

const FinalScreen = () => {
  const [showGif, setShowGif] = useState(false);
  const [showText, setShowText] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [gifError, setGifError] = useState(false);

  const fullText =
    "Chúc Bé iuu của anh luôn khoẻ mạnh, ngủ ngon, ăn ngon miệng và thi thật tốt! Anh tin em sẽ làm được, cố lên nha! ❤️💪✨";

  useEffect(() => {
    setShowGif(true);
    setTimeout(() => setShowText(true), 1500);
  }, []);

  // Typing effect
  useEffect(() => {
    if (showText && displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [showText, displayedText]);

  return (
    <div className={styles.container}>
      {/* GIF or Fallback Emoji */}
      {showGif && (
        <div className={`${styles.gifContainer} ${styles.spinIn}`}>
          {!gifError ? (
            <img
              src={heartGif}
              alt="Love GIF"
              className={styles.gif}
              onError={() => setGifError(true)}
            />
          ) : (
            <div className={styles.fallbackEmoji}>💖</div>
          )}
        </div>
      )}

      {/* Text with Typing Effect */}
      {showText && (
        <div className={`${styles.textContainer} ${styles.fadeInUp}`}>
          <h1 className={styles.message}>
            {displayedText}
            {displayedText.length < fullText.length && (
              <span className={styles.cursor}>|</span>
            )}
          </h1>

          {/* Floating Hearts */}
          <div className={styles.heartsContainer}>
            {[...Array(20)].map((_, i) => (
              <span
                key={i}
                className={styles.floatingHeart}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                ❤️
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalScreen;
