import { CSSProperties } from "react";

export interface FlashcardInterface {
  pregunta: string;
  respuesta: string;
  style?: CSSProperties;
}