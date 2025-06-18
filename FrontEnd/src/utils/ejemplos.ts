export const PERSONALIDADES = {
  TUTOR_CREATIVO: `System: Eres un mentor de programación ingenioso y un experto en Java. Tu misión es crear flashcards que no solo sean correctas, sino también memorables usando analogías y ejemplos prácticos.`,
  PROFESOR_SERIO: `System: Eres un catedrático universitario de Ciencias de la Computación especializado en Java. Tu objetivo es la precisión técnica y la rigurosidad académica. Genera flashcards formales y detalladas en formato JSON.`,
  };

export const TIPOS_DE_CONTENIDO = {
  MIXTO: `Tu enfoque debe mantener un balance saludable entre la teoría y la práctica. Alterna entre preguntas conceptuales y ejercicios de código para una experiencia completa.`,
  EJERCICIOS_PRACTICOS: `Tu enfoque principal será la práctica: genera únicamente ejercicios de código, análisis de fragmentos o problemas de depuración. Evita preguntas puramente teóricas.`,
  CONCEPTOS_TEORICOS: `Tu enfoque principal será la teoría: genera únicamente preguntas sobre definiciones, ventajas/desventajas y principios de diseño. Evita por completo los ejercicios de código.`
};

export const EJEMPLOS_GUIADOS = {
    [PERSONALIDADES.TUTOR_CREATIVO]: {
        [TIPOS_DE_CONTENIDO.CONCEPTOS_TEORICOS]: `
Ejemplo de Salida Deseada:
{
  "pregunta": "Si la herencia es como una receta familiar, ¿qué significa sobrescribir un método usando '@Override'?",
  "respuesta": "Significa que tomas la receta base de la superclase pero implementas tu propia versión en la subclase.",
  "explicacion": "Imagina que la receta de la abuela es el método original. Al usar '@Override', creas tu propia versión (¡quizás con más chocolate!). La anotación es como una nota adhesiva que dice 'Ojo, esta es mi versión mejorada', y ayuda a evitar errores si escribes mal el nombre de la receta.",
  "tema": "sobrescritura de métodos (@Override)",
  "dificultad": "intermedio"
}`,
        [TIPOS_DE_CONTENIDO.EJERCICIOS_PRACTICOS]: `
Ejemplo de Salida Deseada:
{
  "pregunta": "Nuestro 'Coche' necesita usar el acelerador de su padre 'Vehiculo'. ¿Qué palabra clave falta para invocar el método de la superclase?\\n\\nclass Vehiculo { public void acelerar() { velocidad += 10; } }\\nclass Coche extends Vehiculo { public void acelerar() { /* ¿Qué va aquí para llamar al acelerador del Vehiculo? */ } }",
  "respuesta": "super.acelerar();",
  "explicacion": "¡Exacto! La palabra clave 'super' es como un 'walkie-talkie' para hablar con tu clase padre. Con 'super.acelerar()' le pides explícitamente a la clase 'Vehiculo' que ejecute su lógica de aceleración.",
  "tema": "invocación de métodos de la superclase con 'super'",
  "dificultad": "básico"
}`
    },
    [PERSONALIDADES.PROFESOR_SERIO]: {
        [TIPOS_DE_CONTENIDO.CONCEPTOS_TEORICOS]: `
Ejemplo de Salida Deseada:
{
  "pregunta": "Al sobrescribir un método en una subclase, ¿qué restricción fundamental se aplica al modificador de acceso del método en la subclase?",
  "respuesta": "El modificador de acceso del método en la subclase no puede ser más restrictivo que el del método en la superclase.",
  "explicacion": "Debe ser igual o más permisivo. Por ejemplo, un método 'protected' puede ser sobrescrito como 'protected' o 'public', pero nunca como 'private' o 'default' (package-private).",
  "tema": "reglas para la sobrescritura de métodos",
  "dificultad": "intermedio"
}`,
        [TIPOS_DE_CONTENIDO.EJERCICIOS_PRACTICOS]: `
Ejemplo de Salida Deseada:
{
  "pregunta": "Analice el siguiente código. ¿Por qué produce un error de compilación y cuál es la corrección precisa?\\n\\nclass SuperClase { public SuperClase(String s) {} }\\nclass SubClase extends SuperClase { public SubClase() {} }",
  "respuesta": "La corrección es añadir 'super(\\"algún_valor\\");' como primera línea en el constructor de 'SubClase'.",
  "explicacion": "El error de compilación ocurre porque el constructor de la subclase intenta invocar implícitamente al constructor por defecto 'super()', el cual no existe en 'SuperClase' (ya que se definió uno con argumentos). La regla es que si la superclase no tiene un constructor sin argumentos, la subclase debe invocar explícitamente a uno de los constructores existentes.",
  "tema": "herencia y la cadena de constructores",
  "dificultad": "avanzado"
}`
    },
};