import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSpinner,
  IonText,
  IonIcon,
  IonCol,
  IonGrid,
  IonRow
} from '@ionic/react';
import { caretBackOutline, caretForwardOutline } from 'ionicons/icons';
import './Home.css';
import Flashcard from '../components/Flashcard';
import { FlashcardInterface } from '../utils/FlashcardInterface';
import { exportarJSON, exportarPDF } from '../utils/exports';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flashcardsBatch, setFlashcardsBatch] = useState<FlashcardInterface[]>([]);

  /**
   * Genera un lote de flashcards llamando a la API de Ollama múltiples veces.
   */
  const generarLoteQA = async (numberOfFlashcards: number) => {
    if (loading) return;

    setLoading(true);
    setFlashcardsBatch([]);
    setCurrentIndex(0);

    try {
      const res = await fetch("http://localhost:3001/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count: numberOfFlashcards }),
      });

      if (!res.ok) {
          throw new Error(`El servidor respondió con el estado ${res.status}`);
      }
      
      const data = await res.json();
      
      if (data.flashcards && Array.isArray(data.flashcards)) {
        setFlashcardsBatch(data.flashcards);
      } else {
        console.warn("La respuesta de la API no contiene un lote de flashcards válido.", data);
        setFlashcardsBatch([]);
      }

    } catch (error) {
      console.error("Error al generar el lote de flashcards:", error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Generador de flashcards para herencia en OOP</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="main-container flashcard-stack">
          {loading && (
            <div className="loading-container">
              <IonSpinner name="lines-small"></IonSpinner>
              <IonText>Generando...</IonText>
            </div>
          )}
          
          
            {flashcardsBatch.length > 0 && (
              <Flashcard
                key={currentIndex}
                pregunta={flashcardsBatch[currentIndex].pregunta}
                respuesta={flashcardsBatch[currentIndex].respuesta}
              />
            )}

          {/* Navegación entre flashcards */}
          {!loading && flashcardsBatch.length > 0 && (
            <div className="navigation-container">
              <IonButton
                className="nav-button"
                fill="clear"
                onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                disabled={currentIndex === 0}
              >
                <IonIcon icon={caretBackOutline} slot="icon-only" />
              </IonButton>
              
              <span className="navigation-counter">
                {currentIndex + 1} / {flashcardsBatch.length}
              </span>
              
              <IonButton
                className="nav-button"
                fill="clear"
                onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, flashcardsBatch.length - 1))}
                disabled={currentIndex === flashcardsBatch.length - 1}
              >
                <IonIcon icon={caretForwardOutline} slot="icon-only" />
              </IonButton>
            </div>
          )}

          {!loading && flashcardsBatch.length === 0 && (
            <div className="placeholder-container">
              <Flashcard 
                pregunta='Genera las flashcards con los botones' 
                respuesta='Genera las flashcards con los botones'
              />
            </div>
          )}
        </div>

        <IonGrid className="ion-padding ion-text-center menu-botones">
            <IonRow>
              <IonCol size="12">
                <IonButton expand="block" onClick={() => generarLoteQA(1)} disabled={loading}>
                  {loading ? 'Generando...' : 'Generar Flashcard'}
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonButton expand="block" onClick={() => generarLoteQA(5)} disabled={loading}>
                  {loading ? 'Generando...' : 'Generar Lote de Flashcards'}
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonButton expand="block" onClick={()=>exportarPDF(flashcardsBatch)} disabled={loading}>
                  {loading ? 'Generando...' : 'Exportar a PDF'}
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonButton expand="block" onClick={()=>{exportarJSON(flashcardsBatch)}} disabled={loading}>
                  {loading ? 'Generando...' : 'Exportar a JSON'}
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;