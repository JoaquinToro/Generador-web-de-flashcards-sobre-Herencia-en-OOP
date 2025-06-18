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
  IonRow,
  IonButtons
} from '@ionic/react';
import { caretBackOutline, caretForwardOutline, settingsOutline } from 'ionicons/icons';
import './Home.css';
import Flashcard from '../components/Flashcard';
import SettingsModal from '../components/SettingsModal';
import { FlashcardInterface } from '../utils/FlashcardInterface';
import { exportarJSON, exportarPDF } from '../utils/exports';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [rol, setRol] = useState('System: Eres un mentor de programación ingenioso y un experto en Java. Tu misión es crear flashcards que no solo sean correctas, sino también memorables usando analogías y ejemplos prácticos.');
  const [tema, setTema] = useState('');
  const [ejemplo, setEjemplo] = useState('');
  const [cantidadLote, setCantidadLote] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flashcardsBatch, setFlashcardsBatch] = useState<FlashcardInterface[]>([]);

  /**
   * Genera un lote de flashcards llamando a la API de Ollama múltiples veces.
   */
  const generarLoteQA = async (numberOfFlashcards: number, rol:string, tema:string, ejemplo:string, extra?:string) => {
    if (loading) return;

    setLoading(true);
    setFlashcardsBatch([]);
    setCurrentIndex(0);

    try {
      const res = await fetch("http://localhost:3001/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          count: numberOfFlashcards,
          rol: rol,
          tipo: tema,
          ejemplo: ejemplo,
          extra:extra
        }),
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
          <IonTitle>Generador de Flashcards de Herencia</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowSettingsModal(true)}>
              <IonIcon slot="icon-only" icon={settingsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <SettingsModal
          isOpen={showSettingsModal}
          onDidDismiss={() => setShowSettingsModal(false)}
          rol={rol}
          setRol={setRol}
          tema={tema}
          setTema={setTema}
          cantidadLote={cantidadLote}
          setCantidadLote={setCantidadLote}
          setEjemplo={setEjemplo}
        />
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
                explicacion={flashcardsBatch[currentIndex].explicacion}
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
                <IonButton expand="block" onClick={() => generarLoteQA(1,rol,tema,ejemplo)} disabled={loading}>
                  {loading ? 'Generando...' : 'Generar Flashcard'}
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonButton expand="block" onClick={() => generarLoteQA(cantidadLote,rol,tema,ejemplo)} disabled={loading}>
                  {loading ? 'Generando...' : 'Generar Lote de Flashcards'}
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonButton expand="block" onClick={() => generarLoteQA(cantidadLote,rol,tema,ejemplo, "No repitas el contenido anterior")} disabled={loading}>
                  {loading ? 'Generando...' : 'Regenerar lote actual'}
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow></IonRow>
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