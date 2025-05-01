const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const app=express();
const port=3001;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/generate-qa", async (req, res) => {
  
    console.log("Click! Ahora se va a generar la cosa (espero)")
    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gemma2:2b",
          prompt: `Crea una pregunta y su respuesta sobre herencia en programación orientada a objetos.
                    Separa las preguntas de las respuestas con una coma, así "pregunta,respuesta". 
                    Se breve.`,
          stream: false,
        }),
      });
  
      const data = await response.json();
      
      // Imprimir toda la respuesta para depurar
      console.log("Respuesta completa de Gemma: ", data);

      // Asegúrate de que `data.response` existe y es lo que esperas
      if (data.response) {
        res.json({ output: data.response });
        console.log("Respuesta de Gemma: ", data.response);
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