const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;
const OLLAMA_API_URL = process.env.OLLAMA_API_URL || "http://localhost:11434/api/generate";
const MODEL_NAME = "FlashcardsJavaHerenciaGPT";
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

function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}


async function generarFlashcardUnica(rol, tipo, ejemplo, tarea, dificultad, historialPreguntas) {
    const historialString = historialPreguntas.size > 0
        ? `Por favor, asegúrate de que la pregunta no sea similar a ninguna de las siguientes: ${[...historialPreguntas].join(', ')}`
        : "";

    const prompt = `
                    ${rol}
                    ${tipo}

                    ### REGLAS DE ORO ###
                    1. Tu única salida debe ser un objeto JSON válido y nada más. Sin texto introductorio, sin disculpas, solo el JSON.
                    2. Sigue el ejemplo de formato y tono proporcionado para generar la flashcard.
                    3. Presta especial atención a la guía de contenido para cada campo JSON.

                    ### EJEMPLO DE FORMATO Y TONO ###
                    ${ejemplo}

                    // --- COMIENZA LA PETICIÓN DETALLADA ---

                    ### TAREA: GENERAR UNA FLASHCARD DE JAVA ###

                    **1. Guía de contenido para cada campo del JSON:**

                    * **"pregunta"**:
                        * **Para un concepto:** Debe ser una pregunta clara, directa y que invite a la reflexión. Ejemplo: "¿Qué es la sobrecarga de métodos y en qué se diferencia de la sobrescritura?".
                        * **Para un ejercicio práctico:** Debe contener **dos partes claras**:
                            1.  Un **Enunciado** conciso que describa el problema a resolver.
                            2.  Un bloque de **Código a completar**, presentando el contexto y un comentario como \`// Tu código aquí\` para guiar al estudiante.

                    * **"respuesta"**:
                        * **Para un concepto:** La respuesta directa y precisa a la pregunta.
                        * **Para un ejercicio práctico:** Debe contener **únicamente el código final y correcto** que soluciona el problema planteado en la pregunta. ¡Sin explicaciones aquí! Solo el código.

                    * **"explicacion"**:
                        * **Para un concepto:** Una analogía, un caso de uso o un "pro-tip" que ayude a memorizar y entender profundamente la respuesta.
                        * **Para un ejercicio práctico:** Aquí es donde brillas como mentor. Explica el *porqué* de la solución. Menciona los conceptos clave de Java aplicados (ej. "Se usa la palabra clave 'extends' para heredar de la clase Animal...") y resalta las buenas prácticas (ej. "La anotación '@Override' es crucial para asegurar que estamos sobrescribiendo correctamente y no creando un método nuevo por error.").

                    * **"tema"**: El concepto general de Java que se está evaluando (ej. "Herencia", "Polimorfismo", "Interfaces").

                    * **"dificultad"**: El nivel de dificultad que se te ha asignado.

                    **2. Petición Específica:**

                    * **Concepto a tratar:** "${tarea}"
                    * **Nivel de dificultad:** "${dificultad}"

                    **3. Historial de flashcards recientes (para no repetir):**
                    ${historialString}

                    **Ahora, genera el objeto JSON de la flashcard.**
                    `;

    console.log(prompt)

    const response = await fetch(OLLAMA_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: MODEL_NAME,
            prompt: prompt,
            stream: false,
            options: {
                temperature: 0.5,
                top_p: 1.5,
                repetition_penalty: 1.2
            }
        }),
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const data = await response.json();
    if (!data.response) throw new Error("API response missing 'response' field.");
    const jsonString = data.response.match(/\{[\s\S]*\}/m);
    if (!jsonString) throw new Error("No JSON object found in response.");
    const flashcard = JSON.parse(jsonString[0]);
    if (typeof flashcard.pregunta !== 'string' || typeof flashcard.respuesta !== 'string') {
        throw new Error("Invalid flashcard structure.");
    }
    console.log(flashcard)
    return flashcard;
}

app.post("/api/flashcards", async (req, res) => {
    const count = parseInt(req.body.count, 10) || 1;
    const rol = req.body.rol || 'System: Eres un mentor de programación ingenioso y un experto en Java. Tu misión es crear flashcards que no solo sean correctas, sino también memorables usando analogías y ejemplos prácticos.'
    const tipo = req.body.tipo || 'Mantén un balance entre conceptos teóricos y ejercicios prácticos de programación'
    const ejemplo = req.body.ejemplo || ''
    console.log(`[Request] Petición para generar un lote de ${count} flashcard(s).`);

    const nuevasFlashcards = [];
    const preguntasDelLoteActual = new Set();
    const MAX_INTENTOS_TOTALES = count * 3;
    let intentosTotales = 0;

    let temasBarajados = shuffleArray([...TEMAS]);
    let listaDeTareas = [];
    for (let i = 0; i < count; i++) {
        listaDeTareas.push({
            tema: temasBarajados[i % temasBarajados.length],
            dificultad: DIFICULTADES[Math.floor(Math.random() * DIFICULTADES.length)]
        });
    }

    try {
        for (const tarea of listaDeTareas) {
            if (intentosTotales >= MAX_INTENTOS_TOTALES) {
                console.warn("[Warning] Se alcanzó el máximo de intentos totales. Devolviendo lote parcial.");
                break;
            }
            intentosTotales++;
            
            let exitoEnTarea = false;
            let reintentosPorTarea = 0;
            const MAX_REINTENTOS_POR_TAREA = 3;

            while (!exitoEnTarea && reintentosPorTarea < MAX_REINTENTOS_POR_TAREA) {
                 if (intentosTotales >= MAX_INTENTOS_TOTALES) break;
                 
                 try {
                     const flashcard = await generarFlashcardUnica(rol, tipo, ejemplo,tarea.tema, tarea.dificultad, preguntasDelLoteActual);

                     if (!preguntasDelLoteActual.has(flashcard.pregunta)) {
                         preguntasDelLoteActual.add(flashcard.pregunta);
                         nuevasFlashcards.push(flashcard);
                         console.log(`[Batch] Flashcard #${nuevasFlashcards.length} (${tarea.tema}) generada y añadida.`);
                         exitoEnTarea = true; 
                     } else {
                         console.log(`[Batch] Pregunta repetida para el tema "${tarea.tema}", reintentando...`);
                         reintentosPorTarea++;
                         intentosTotales++;
                     }
                 } catch (generationError) {
                     console.warn(`[Batch] Error en un intento de generación: ${generationError.message}`);
                     reintentosPorTarea++;
                     intentosTotales++;
                 }
            }
        }

        if (nuevasFlashcards.length < count) {
            console.warn(`[Warning] Lote finalizado. Solo se generaron ${nuevasFlashcards.length} de ${count} flashcards únicas.`);
        }

        res.json({ flashcards: nuevasFlashcards });

    } catch (error) {
        console.error("[API Error] Error crítico al generar el lote:", error);
        res.status(500).json({ error: "No se pudo completar la generación del lote de flashcards." });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});