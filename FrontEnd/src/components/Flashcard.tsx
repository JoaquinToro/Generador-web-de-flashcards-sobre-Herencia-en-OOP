import React, { useState, CSSProperties } from 'react'; // Import CSSProperties here
import './Flashcard.css';
import { IonCard, IonCardContent } from '@ionic/react';
import { FlashcardInterface } from '../utils/FlashcardInterface';

const Flashcard: React.FC<FlashcardInterface> = ({ pregunta, respuesta, style }) => { // Destructure 'style' prop
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flashcard-container ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
      style={style}
    >
      <div className="flashcard-inner">
        <IonCard className="flashcard-front">
          <IonCardContent>{pregunta}</IonCardContent>
        </IonCard>
        <IonCard className="flashcard-back">
          <IonCardContent>{respuesta}</IonCardContent>
        </IonCard>
      </div>
    </div>
  );
};

export default Flashcard;