import { useState } from "react";
import styles from "./EnvelopeCard.module.css";

const EnvelopeCard = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => setShowContent(true), 1200);
    }
  };

  const handleNext = () => {
    setShowContent(false);
    setTimeout(() => onNext(), 500);
  };

  return (
    <div className={styles.container}>
      {/* Envelope Animation - Ẩn khi hiện nội dung */}
      {!showContent && (
        <div className={styles.envelopeWrapper} onClick={handleOpen}>
          <div className={`${styles.envelope} ${isOpen ? styles.open : ""}`}>
            {/* Nắp thư */}
            <div className={styles.flap}></div>

            {/* Thân thư */}
            <div className={styles.body}></div>

            {/* Giấy thư bên trong */}
            <div
              className={`${styles.letter} ${isOpen ? styles.letterPull : ""}`}
            >
              {!isOpen && <div className={styles.clickHint}>💌 Nhấp để mở</div>}
            </div>
          </div>
        </div>
      )}

      {/* Nội dung thư - Hiển thị giữa màn hình */}
      {showContent && (
        <div className={`${styles.contentOverlay} ${styles.fadeIn}`}>
          <div className={`${styles.letterPaper} ${styles.scaleIn}`}>
            <h2 className={styles.title}>Gửi Bé iuu của anh ❤️</h2>

            <div className={styles.message}>
            <p>
                Thực sự là có rất nhiều điều anh muốn nói với em, nhưng mà bây giờ mình không thể nói chuyện
                trực tiếp với nhau được nên anh sẽ gửi những gì mà trong lòng anh muốn nói cho em qua đây ☺️.
              </p>
              <p>
                Trời sắp bắt đầu trở lạnh rồi đó em. Mỗi lần đi ra ngoài em nhớ mặc quần áo ấm vào nhé, đừng để bị cảm lạnh đó 😖.
              </p>
              <p>
              Sắp đến kỳ thi rồi, anh biết em đang áp lực và lo lắng lắm.
                Nhưng anh tin em sẽ làm tốt thôi! Nhớ ăn uống đầy đủ đừng có bỏ bữa, ngủ đủ
                giấc, đừng thức khuya quá. Sức khỏe của em quan trọng hơn bất
                cứ điều gì, nhớ đó nha bé iuu của anh 💕
              </p>
              <p>
                Dù không ở bên, anh vẫn luôn nghĩ về em và cổ vũ cho em mỗi ngày.
                Cố gắng lên nhé em, mọi chuyện sẽ ổn thôi. Anh luôn ở đây,
                luôn tin tưởng và yêu thương em 🥰.
              </p>
              <p className={styles.signature}>
                Yêu bé nhiều lắm lắm luôn🥰
                <br />
              </p>
            </div>

            <button className={styles.nextButton} onClick={handleNext}>
              Tiếp →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnvelopeCard;
