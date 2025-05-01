import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import Flashcard from '../components/Flashcard';

const Home: React.FC = () => {
  
  const [pregunta, setPregunta] = useState('Pregunta');
  const [respuesta, setRespuesta] = useState('Respuesta'); 
  const [loading, setLoading] = useState(false); 

  //LLamar a Ollama y generar la pregunta y respuesta
  const generarQA = async () => {
    if(loading){
      console.log("Generando...")
    }else{
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3001/api/generate-qa", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        
        const data = await res.json();
        console.log(data.output)
        setPregunta(data.output.split(",")[0])
        setRespuesta(data.output.split(",")[1]);
      } catch (error) {
        console.error("Error al obtener la respuesta:", error);
        setRespuesta("Error al generar la pregunta y respuesta.");
      }
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
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Flashcard frontText={pregunta} backText={respuesta} />
        <div className="ion-padding ion-text-center">
          <IonButton onClick={generarQA} className="ion-text-center">
            Presione para generar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
