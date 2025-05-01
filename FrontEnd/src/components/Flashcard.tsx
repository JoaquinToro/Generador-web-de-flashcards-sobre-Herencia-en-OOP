import React, { useState } from 'react';
import './Flashcard.css';
import { IonCard, IonCardContent } from '@ionic/react';
import { FlashcardInterface } from '../utils/FlashcardInterface';

const Flashcard: React.FC<FlashcardInterface> = ({ frontText, backText }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`flashcard-container ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
      <div className="flashcard-inner">
        <IonCard className="flashcard-front">
          <IonCardContent>{frontText}</IonCardContent>
        </IonCard>
        <IonCard className="flashcard-back">
          <IonCardContent>{backText}</IonCardContent>
        </IonCard>
      </div>
    </div>
  );
};

export default Flashcard;