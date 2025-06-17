const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const app=express();
const port=3001;

app.use(cors());
app.use(bodyParser.json());

const TEMAS = [
    // --- 1. Conceptos Fundamentales y Teoría ---
    "qué es la herencia (relación 'es-un')",
    "superclase vs. subclase (clase padre vs. hija)",
    "la palabra clave 'extends'",
    "la clase Object como raíz de la jerarquía",
    "herencia simple vs. herencia multinivel",
    "herencia jerárquica",
    "ventajas de la herencia (reutilización de código)",
    "desventajas de la herencia (acoplamiento fuerte)",
    "el principio de 'Composición sobre Herencia'",

    // --- 2. Palabras Clave y Modificadores ---
    "el método 'super()' para invocar constructores",
    "la palabra clave 'super' para invocar métodos",
    "la palabra clave 'final' en clases (prevenir herencia)",
    "la palabra clave 'final' en métodos (prevenir sobrescritura)",
    "clases abstractas y la palabra clave 'abstract'",
    "métodos abstractos en herencia",
    "el modificador de acceso 'protected'",
    "el operador 'instanceof' en jerarquías",

    // --- 3. Polimorfismo y Métodos ---
    "polimorfismo en tiempo de ejecución con herencia",
    "sobrescritura de métodos (@Override)",
    "reglas para la sobrescritura de métodos",
    "ocultamiento de métodos (Method Hiding) con 'static'",
    "diferencia entre sobrescritura y sobrecarga",
    "tipos de retorno covariantes",
    "herencia y los métodos 'equals()', 'hashCode()' y 'toString()'",
    
    // --- 4. Constructores y Ciclo de Vida ---
    "herencia y el orden de ejecución de constructores",
    "la cadena de llamadas a constructores (constructor chaining)",
    "bloques de inicialización en la herencia",

    // --- 5. Casting y Tipos ---
    "upcasting (casting implícito a superclase)",
    "downcasting (casting explícito a subclase)",
    "la excepción ClassCastException",

    // --- 6. Interfaces y Herencia Múltiple ---
    "herencia múltiple de tipo (implementando interfaces)",
    "resolución del 'problema del diamante' con interfaces",
    "herencia entre interfaces con 'extends'",
    "métodos 'default' y 'static' en interfaces y herencia",

    // --- 7. Características de Java Moderno ---
    "herencia y Records (Java 14+)",
    "Sealed Classes y la palabra clave 'permits' (Java 17+)",
    "Pattern Matching para instanceof (Java 16+)",
    "herencia en el contexto de Generics (tipos comodín)",

    // --- 8. Patrones de Diseño y Principios SOLID ---
    "herencia en el patrón Template Method",
    "herencia en el patrón Factory Method",
    "herencia en el patrón Strategy",
    "herencia en el patrón Decorator",
    "el Principio de Sustitución de Liskov (LSP)",

    // --- 9. Casos de Uso Prácticos y Frameworks ---
    "herencia en componentes de GUI (ej. Swing, JavaFX)",
    "herencia en el manejo de excepciones personalizadas",
    "herencia en el framework Spring (ej. configuraciones base)",
    "herencia para crear clases de test base en JUnit",
    
    // --- 10. Tipos de Ejercicios de Código ---
    "ejercicio de código para predecir la salida (polimorfismo)",
    "ejercicio de código para encontrar un error de compilación",
    "ejercicio de código para depurar una ClassCastException",
    "ejercicio de código sobre la cadena de constructores",
    "ejercicio de código para refactorizar usando una clase abstracta",
    "ejercicio de código sobre el ocultamiento de variables (shadowing)"
];
const DIFICULTADES = ["básico", "intermedio", "avanzado"];

app.post("/api/generate-qa", async (req, res) => {
  console.log("Click! Ahora se va a generar la cosa (espero)");

  try {
    let { subtema, dificultad } = req.query;

    // Si no se proporcionan, los elegimos al azar.
    if (!subtema) {
        subtema = TEMAS[Math.floor(Math.random() * TEMAS.length)];
    }
    if (!dificultad) {
        dificultad = DIFICULTADES[Math.floor(Math.random() * DIFICULTADES.length)];
    }
    const promptA = `
                    System: Eres un experto en Java y un generador de flashcards para estudiantes de programación. Tu única función es crear una flashcard en formato JSON. Responde únicamente con el objeto JSON y nada más.

                    User: Genera una flashcard sobre herencia en Java. El concepto específico es: "${subtema}". La flashcard debe ser de dificultad "${dificultad}". El formato JSON debe contener estrictamente las claves "pregunta" y "respuesta".

                    Ejemplo de salida deseada:
                    {
                      "pregunta": "¿Un ejemplo de pregunta sobre ${subtema}?",
                      "respuesta": "Un ejemplo de respuesta detallada y precisa.",
                      "tema": "Tema de la pregunta",
                      "dificultad": "Dificultad de la pregunta"
                    }

                    Tu turno:
                    `;
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "FlashcardsJavaHerenciaGPT",
        prompt: promptA,
        options: {
                    temperature: 0.1,
                    top_p: 0.9,
                    repetition_penalty: 1.15
                },
        stream: false,
      }),
    });

    const data = await response.json();
    console.log("Respuesta completa de JavaHerenciaGPT: ", data);

    if (data.response) {
      let flashcard = null;

      try {
        // Intentar convertir a JSON
        flashcard = JSON.parse(data.response.trim());
      } catch (jsonError) {
        console.error("Error al parsear el JSON:", jsonError);
        return res.status(500).json({ error: "El modelo no devolvió un JSON válido." });
      }

      // Si el parseo fue exitoso, devolver el objeto JSON
      res.json({ output: flashcard });
      console.log("Respuesta formateada de JavaHerenciaGPT:", flashcard);
    } else {
      res.status(500).json({ error: "No se encontró la respuesta esperada en la API." });
    }
  } catch (error) {
    console.error("Error al conectar con Ollama:", error);
    res.status(500).json({ error: "Error al generar con Ollama" });
  }
});

  
  app.listen(port, () => {
    console.log(`Servidor backend escuchando en http://localhost:${port}...`);
  });