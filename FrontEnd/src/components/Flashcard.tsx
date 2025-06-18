import React, { useState } from 'react';
import { IonCard, IonCardContent, IonButton, IonIcon, IonAlert } from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';
import { FlashcardInterface } from '../utils/FlashcardInterface';
import './Flashcard.css';

const Flashcard: React.FC<FlashcardInterface> = ({ pregunta, respuesta, explicacion }) => {
  const [flipped, setFlipped] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div
      className={`flashcard-container ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="flashcard-inner">
        <IonCard className="flashcard-front">
          <IonCardContent>{pregunta}</IonCardContent>
        </IonCard>

        <IonCard className="flashcard-back">
          {explicacion && (
            <div className="info-button-container">
              <IonButton
                fill="clear"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAlert(true);
                }}
              >
                <IonIcon slot="icon-only" icon={informationCircleOutline} />
              </IonButton>
            </div>
          )}
          <IonCardContent>{respuesta}</IonCardContent>
        </IonCard>
      </div>

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Explicación Detallada'}
        message={explicacion}
        buttons={['Entendido']}
      />
    </div>
  );
};

export default Flashcard;