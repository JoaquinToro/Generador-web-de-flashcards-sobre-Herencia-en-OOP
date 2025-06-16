const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const app=express();
const port=3001;

app.use(cors());
app.use(bodyParser.json());

const subtemasHerenciaJava = [
    "qué es la herencia",
    "la palabra clave 'extends'",
    "herencia de constructores",
    "el método 'super()'",
    "sobrescritura de métodos (Method Overriding)",
    "clases abstractas y herencia",
    "interfaces y herencia",
    "polimorfismo con herencia",
    "la clase Object en Java",
    "ventajas de la herencia",
    "desventajas de la herencia",
    "final en herencia (clases y métodos)",
    "herencia múltiple en Java (y sus limitaciones)",
    "casting en herencia (upcasting y downcasting)"
];

app.post("/api/generate-qa", async (req, res) => {
  console.log("Click! Ahora se va a generar la cosa (espero)");

  try {
    const subtemaAleatorio = subtemasHerenciaJava[Math.floor(Math.random() * subtemasHerenciaJava.length)];
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "JavaHerenciaGPT_JSON_V2",
        prompt: `Crea solamente una flashcard sobre herencia en Java en formato JSON con una pregunta y una respuesta como claves. El tema debe ser ${subtemaAleatorio}`,
        temperature: 0.2,
        top_p: 1.0,
        repetition_penalty: 1.1,
        num_predict: 128,
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