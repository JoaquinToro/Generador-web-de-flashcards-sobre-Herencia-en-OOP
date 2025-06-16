import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
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
          body: JSON.stringify({}),
        });
        
        const data = await res.json();
        console.log(data)
        console.log(data.output)
        console.log(data.output.pregunta)
        console.log(data.output.respuesta)
        setPregunta(data.output.pregunta)
        setRespuesta(data.output.respuesta)
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
        
        <div className="ion-padding ion-text-center">
          <Flashcard frontText={pregunta} backText={respuesta} />
        </div>
        
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
