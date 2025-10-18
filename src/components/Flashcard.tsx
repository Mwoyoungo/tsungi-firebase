import React, { useState } from 'react';

interface FlashcardProps {
  front: string;
  back: string;
  color: string;
  chapter: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ front, back, color, chapter }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard-container" onClick={handleFlip}>
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
        {/* Front of card */}
        <div className="flashcard-face flashcard-front" style={{ backgroundColor: color }}>
          <div className="flashcard-content">
            <div className="chapter-badge">{chapter}</div>
            <div className="question-text">
              <p>{front}</p>
            </div>
            <div className="tap-hint">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-sm">
                <path d="M7 10v12"/>
                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/>
              </svg>
              <span>Tap to reveal</span>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="flashcard-face flashcard-back" style={{ backgroundColor: color }}>
          <div className="flashcard-content">
            <div className="chapter-badge">{chapter}</div>
            <div className="answer-text">
              <div className="acronym-label">Acronym</div>
              <h2 className="acronym">{back}</h2>
            </div>
            <div className="tap-hint">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-sm">
                <path d="M7 10v12"/>
                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/>
              </svg>
              <span>Tap to flip back</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .flashcard-container {
          perspective: 1000px;
          width: 100%;
          height: 70vh;
          min-height: 500px;
          max-height: 600px;
          cursor: pointer;
          user-select: none;
        }

        .flashcard {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
          transform-style: preserve-3d;
        }

        .flashcard.flipped {
          transform: rotateY(180deg);
        }

        .flashcard-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-center;
          padding: 48px 40px;
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.15),
            0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .flashcard-front {
          background: ${color};
        }

        .flashcard-back {
          background: ${color};
          transform: rotateY(180deg);
        }

        .flashcard-content {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          color: white;
        }

        .chapter-badge {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          padding: 8px 20px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .question-text,
        .answer-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px;
        }

        .question-text p {
          font-size: 28px;
          font-weight: 600;
          line-height: 1.5;
          max-width: 800px;
        }

        .acronym-label {
          font-size: 16px;
          font-weight: 500;
          opacity: 0.9;
          margin-bottom: 16px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .acronym {
          font-size: 64px;
          font-weight: 900;
          letter-spacing: 4px;
          margin: 0;
          text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .tap-hint {
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: 0.7;
          font-size: 14px;
          font-weight: 500;
        }

        .tap-hint svg {
          width: 20px;
          height: 20px;
        }

        @media (max-width: 768px) {
          .flashcard-container {
            height: 65vh;
            min-height: 450px;
          }

          .flashcard-face {
            padding: 32px 24px;
            border-radius: 20px;
          }

          .question-text p {
            font-size: 22px;
          }

          .acronym {
            font-size: 48px;
          }

          .chapter-badge {
            font-size: 12px;
            padding: 6px 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Flashcard;
