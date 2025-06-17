export const PERSONALIDADES = {
  TUTOR_CREATIVO: `System: Eres un mentor de programación ingenioso y un experto en Java. Tu misión es crear flashcards que no solo sean correctas, sino también memorables usando analogías y ejemplos prácticos.`,
  PROFESOR_SERIO: `System: Eres un catedrático universitario de Ciencias de la Computación especializado en Java. Tu objetivo es la precisión técnica y la rigurosidad académica. Genera flashcards formales y detalladas en formato JSON.`,
  WIZARD_DIVERTIDO: `System: Eres el "Java Wizard", un mago que crea desafíos y acertijos sobre programación en Java. Formula flashcards como si fueran pequeños puzzles o misiones divertidas.`,
  INGENIERO_SENIOR: `System: Eres un Ingeniero de Software Senior con 15 años de experiencia. Enfócate en la aplicación práctica, el rendimiento y los errores comunes en entornos de producción. Sé directo y preciso.`
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
  "respuesta": "Significa que tomas la receta base de la abuela (el método de la superclase), pero le añades tu propio toque secreto. La anotación '@Override' es como poner una nota adhesiva que dice 'Ojo, esta es mi versión mejorada', asegurando que no te equivocaste al copiar el nombre de la receta original.",
  "tema": "sobrescritura de métodos (@Override)",
  "dificultad": "intermedio"
}`,
    [TIPOS_DE_CONTENIDO.EJERCICIOS_PRACTICOS]: `
Ejemplo de Salida Deseada:
{
  "pregunta": "Nuestro 'Coche' hereda de 'Vehiculo', pero al llamar a 'coche.acelerar()', no hace nada. ¿Qué hechizo falta en el método 'acelerar' de Coche para que use la magia de su padre Vehiculo?\\n\\nclass Vehiculo { public void acelerar() { setVelocidad(getVelocidad() + 10); } }\\nclass Coche extends Vehiculo { public void acelerar() { /* ¿Qué va aquí? */ } }",
  "respuesta": "Falta la invocación al poder ancestral: ¡super.acelerar()! Para reutilizar la lógica de la superclase dentro de un método sobrescrito, debes llamar explícitamente a 'super.metodo()'.",
  "tema": "la palabra clave 'super' para invocar métodos",
  "dificultad": "básico"
}`
  },
  [PERSONALIDADES.INGENIERO_SENIOR]: {
    [TIPOS_DE_CONTENIDO.CONCEPTOS_TEORICOS]: `
Ejemplo de Salida Deseada:
{
  "pregunta": "En términos de diseño de API y mantenibilidad, ¿cuál es el 'code smell' o riesgo asociado a una jerarquía de herencia excesivamente profunda (ej. 6 niveles o más)?",
  "respuesta": "El riesgo principal es el 'acoplamiento frágil' (fragile base class problem). Un cambio en una superclase de alto nivel puede tener efectos impredecibles y romper subclases muy lejanas en la jerarquía, haciendo el refactoring peligroso y costoso. Se prefiere la composición para evitar este problema.",
  "tema": "desventajas de la herencia (acoplamiento fuerte)",
  "dificultad": "avanzado"
}`,
    [TIPOS_DE_CONTENIDO.EJERCICIOS_PRACTICOS]: `
Ejemplo de Salida Deseada:
{
  "pregunta": "Este código lanza una 'ClassCastException'. ¿Cuál es la forma idiomática y segura en Java (16+) de reescribirlo para evitar la excepción y mejorar la legibilidad?\\n\\nObject obj = new Gato();\\nif (obj instanceof Perro) {\\n  Perro p = (Perro) obj; // Lanza ClassCastException\\n  p.ladrar();\\n}",
  "respuesta": "Usando 'Pattern Matching for instanceof' (JEP 394), se reescribe como: 'if (obj instanceof Perro p) { p.ladrar(); }'. El casting es implícito y la variable 'p' solo existe dentro del scope del if, previniendo la ClassCastException de forma segura y concisa.",
  "tema": "Pattern Matching para instanceof (Java 16+)",
  "dificultad": "intermedio"
}`
  },
  [PERSONALIDADES.PROFESOR_SERIO]: {
    [TIPOS_DE_CONTENIDO.CONCEPTOS_TEORICOS]: `
Ejemplo de Salida Deseada:
{
  "pregunta": "Al sobrescribir un método en una subclase, ¿qué restricción fundamental se aplica al modificador de acceso del método sobrescrito en comparación con el de la superclase?",
  "respuesta": "El modificador de acceso del método en la subclase no puede ser más restrictivo que el del método en la superclase; debe ser igual o más permisivo. Por ejemplo, 'protected' puede ser sobrescrito como 'public', pero no como 'private'.",
  "tema": "reglas para la sobrescritura de métodos",
  "dificultad": "intermedio"
}`,
    [TIPOS_DE_CONTENIDO.EJERCICIOS_PRACTICOS]: `
Ejemplo de Salida Deseada:
{
  "pregunta": "Dado el siguiente código, explique por qué se produce un error de compilación y cómo se corregiría de acuerdo a las reglas de inicialización de la herencia en Java.\\n\\nclass SuperClase { public SuperClase(String s) {} }\\nclass SubClase extends SuperClase { public SubClase() { System.out.println(\\"Hola\\"); } }",
  "respuesta": "El error ocurre porque el constructor de 'SubClase' intenta invocar implícitamente al constructor sin argumentos 'super()', el cual no existe en 'SuperClase'. La corrección exige una llamada explícita a un constructor existente, como 'super(\\"valor\\");', como primera línea del constructor de la subclase.",
  "tema": "herencia y el orden de ejecución de constructores",
  "dificultad": "avanzado"
}`
  },
  [PERSONALIDADES.WIZARD_DIVERTIDO]: {
    [TIPOS_DE_CONTENIDO.CONCEPTOS_TEORICOS]: `
Ejemplo de Salida Deseada:
{
  "pregunta": "Un hechicero Java quiere que su Grifo sea 'Volador' y 'Nadador' a la vez, pero la magia antigua prohíbe tener más de un padre (herencia múltiple). ¿Qué artefacto arcano le permite adquirir múltiples habilidades?",
  "respuesta": "Debe usar los 'Pactos de Interfaz' ('implements'). Un hechicero puede heredar su linaje de un solo padre ('extends'), pero puede firmar múltiples pactos ('implements Volador, Nadador'), prometiendo manifestar todas las habilidades (métodos) de dichas interfaces.",
  "tema": "herencia múltiple de tipo (implementando interfaces)",
  "dificultad": "intermedio"
}`,
    [TIPOS_DE_CONTENIDO.EJERCICIOS_PRACTICOS]: `
Ejemplo de Salida Deseada:
{
  "pregunta": "Un Mago Oscuro disfrazó a sus esbirros. El siguiente encantamiento invoca 'atacar()' en su horda. ¿Cuál es el conjuro exacto que se manifestará?\\n\\n'abstract class Monstruo { abstract void atacar(); }'\\n'class Orco extends Monstruo { void atacar() { System.out.println(\\"¡GARRAZO!\\"); } }'\\n'class Goblin extends Monstruo { void atacar() { System.out.println(\\"¡PINCHAZO!\\"); } }'\\n\\nMonstruo[] horda = {new Goblin(), new Orco()};\\nfor(Monstruo m : horda) { m.atacar(); }",
  "respuesta": "El oráculo de la consola revelará la verdadera naturaleza de cada monstruo: ¡PINCHAZO! y luego ¡GARRAZO! Este es el poder del Polimorfismo, que invoca el hechizo de la criatura real, no el del tipo de referencia.",
  "tema": "polimorfismo en tiempo de ejecución con herencia",
  "dificultad": "básico"
}`
  }
};