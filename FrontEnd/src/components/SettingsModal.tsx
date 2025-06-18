import React, { useEffect } from 'react';
import {
  IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
  IonContent, IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption
} from '@ionic/react';
import './SettingsModal.css';
import { EJEMPLOS_GUIADOS, PERSONALIDADES, TIPOS_DE_CONTENIDO } from '../utils/ejemplos';

interface SettingsModalProps {
  isOpen: boolean;
  onDidDismiss: () => void;
  rol: string;
  setRol: (value: string) => void;
  tema: string;
  setTema: (value: string) => void;
  cantidadLote: number;
  setCantidadLote: (value: number) => void;
  setEjemplo:(value: string)=>void
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onDidDismiss,
  rol,
  setRol,
  tema,
  setTema,
  cantidadLote,
  setCantidadLote,
  setEjemplo
}) => {

  useEffect(() => {
    const ejemploSeleccionado = (EJEMPLOS_GUIADOS[rol]?.[tema]) || "";
    
    setEjemplo(ejemploSeleccionado);

  }, [rol, tema, setEjemplo]);

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Configuración de Generación</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDidDismiss}>Cerrar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding settings-modal-content">
        <IonList>
          <IonItem>
            <IonLabel>Estilo de las flashcards</IonLabel>
            <IonSelect value={rol} placeholder="Seleccionar Estilo de Flashcards" onIonChange={e => setRol(e.detail.value)}>
              <IonSelectOption value={PERSONALIDADES.TUTOR_CREATIVO}>Tutor Creativo</IonSelectOption>
              <IonSelectOption value={PERSONALIDADES.PROFESOR_SERIO}>Profesor Serio</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Tema Específico</IonLabel>
            <IonSelect value={tema} placeholder="Seleccionar Tema" onIonChange={e => setTema(e.detail.value)}>
              <IonSelectOption value={TIPOS_DE_CONTENIDO.MIXTO}>Mixto</IonSelectOption>
              <IonSelectOption value={TIPOS_DE_CONTENIDO.EJERCICIOS_PRACTICOS}>Ejercicios Prácticos</IonSelectOption>
              <IonSelectOption value={TIPOS_DE_CONTENIDO.CONCEPTOS_TEORICOS}>Conceptos Teoricos</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Cantidad de Flashcards por Lote</IonLabel>
            <IonInput
              type="number"
              value={cantidadLote}
              min="1"
              max="25"
              onIonChange={(e) => setCantidadLote(parseInt(e.detail.value!, 10) || 1)}
            />
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default SettingsModal;