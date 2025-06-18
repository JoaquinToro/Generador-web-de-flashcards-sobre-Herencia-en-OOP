import { CSSProperties } from "react";

export interface FlashcardInterface {
  pregunta: string;
  respuesta: string;
  tema?: string;
  dificultad?: string;
  style?: CSSProperties;
  explicacion?: string;
}