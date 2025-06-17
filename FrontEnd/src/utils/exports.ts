import jsPDF from 'jspdf';
import { FlashcardInterface } from './FlashcardInterface'; // Asegúrate que la ruta a tu interfaz sea correcta

/**
 * Exporta un array de flashcards a un archivo JSON.
 * @param flashcards El array de flashcards a exportar.
 */
export const exportarJSON = (flashcards: FlashcardInterface[]) => {
  if (flashcards.length === 0) {
    alert("No hay flashcards para exportar. ¡Genera algunas primero!");
    return;
  }

  const jsonString = JSON.stringify(flashcards, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'flashcards-herencia-java.json';
  document.body.appendChild(a);
  a.click();
  
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Exporta un array de flashcards a un archivo PDF.
 * @param flashcards El array de flashcards a exportar.
 */
export const exportarPDF = (flashcards: FlashcardInterface[]) => {
  if (flashcards.length === 0) {
    alert("No hay flashcards para exportar. ¡Genera algunas primero!");
    return;
  }

  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4'
  });

  const margin = 15;
  const pageHeight = doc.internal.pageSize.getHeight();
  const usableWidth = doc.internal.pageSize.getWidth() - (2 * margin);
  let y = margin;

  doc.setFontSize(18);
  doc.text("Flashcards de Herencia en Java", doc.internal.pageSize.getWidth() / 2, y, { align: 'center' });
  y += 10;

  flashcards.forEach((flashcard, index) => {
    const preguntaText = `Pregunta ${index + 1}: ${flashcard.pregunta}`;
    const respuestaText = `Respuesta: ${flashcard.respuesta}`;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');

    const preguntaLines = doc.splitTextToSize(preguntaText, usableWidth);
    
    if (y + (preguntaLines.length * 5) > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }

    doc.text(preguntaLines, margin, y);
    y += preguntaLines.length * 5 + 3;

    doc.setFont('helvetica', 'normal');
    const respuestaLines = doc.splitTextToSize(respuestaText, usableWidth);
    
    if (y + (respuestaLines.length * 5) > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }

    doc.text(respuestaLines, margin, y);
    y += respuestaLines.length * 5 + 5;

    if (index < flashcards.length - 1) {
      if (y > pageHeight - margin) {
          doc.addPage();
          y = margin;
      }
      doc.setDrawColor(200);
      doc.line(margin, y, usableWidth + margin, y);
      y += 5;
    }
  });

  doc.save('flashcards-herencia-java.pdf');
};