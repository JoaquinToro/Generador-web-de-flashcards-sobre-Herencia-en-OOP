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
    [PERSONALIDADES.INGENIERO_SENIOR]: {
        [TIPOS_DE_CONTENIDO.CONCEPTOS_TEORICOS]: `
Ejemplo de Salida Deseada:
{
  "pregunta": "¿Cuál es el 'code smell' o riesgo de mantenibilidad asociado a una jerarquía de herencia excesivamente profunda (ej. 6+ niveles)?",
  "respuesta": "El riesgo principal es el 'acoplamiento frágil' o 'fragile base class problem'.",
  "explicacion": "Un cambio en una superclase de alto nivel puede tener efectos impredecibles y romper subclases lejanas, haciendo el refactoring peligroso. En entornos profesionales, a menudo se prefiere la composición sobre la herencia para evitar este problema de acoplamiento fuerte.",
  "tema": "desventajas de la herencia (acoplamiento fuerte)",
  "dificultad": "avanzado"
}`,
        [TIPOS_DE_CONTENIDO.EJERCICIOS_PRACTICOS]: `
Ejemplo de Salida Deseada:
{
  "pregunta": "Este código es propenso a 'ClassCastException' y usa un patrón obsoleto. ¿Cómo se reescribe de forma segura y idiomática en Java 16+?\\n\\nObject obj = new Gato();\\nif (obj instanceof Perro) {\\n  Perro p = (Perro) obj;\\n  p.ladrar();\\n}",
  "respuesta": "if (obj instanceof Perro p) {\\n  p.ladrar();\\n}",
  "explicacion": "Se usa 'Pattern Matching for instanceof' (JEP 394). Esto elimina la necesidad del casting explícito y la variable 'p' solo existe dentro del scope del 'if', previniendo la ClassCastException de forma segura y mejorando la legibilidad del código.",
  "tema": "Pattern Matching para instanceof (Java 16+)",
  "dificultad": "intermedio"
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
    [PERSONALIDADES.WIZARD_DIVERTIDO]: {
        [TIPOS_DE_CONTENIDO.CONCEPTOS_TEORICOS]: `
Ejemplo de Salida Deseada:
{
  "pregunta": "Un hechicero quiere que su Grifo sea 'Volador' y 'Acuático', pero la magia antigua prohíbe tener más de un padre (herencia). ¿Qué artefacto arcano de Java le permite adquirir múltiples conjuntos de habilidades?",
  "respuesta": "Debe usar los 'Pactos de Interfaz', es decir, implementar interfaces ('implements').",
  "explicacion": "Un Grifo puede heredar su linaje de un solo padre ('extends Animal'), pero puede firmar múltiples pactos ('implements Volador, Acuatico'), prometiendo así manifestar todas las habilidades (métodos) que dichos pactos requieren.",
  "tema": "herencia múltiple de tipo (interfaces)",
  "dificultad": "intermedio"
}`,
        [TIPOS_DE_CONTENIDO.EJERCICIOS_PRACTICOS]: `
Ejemplo de Salida Deseada:
{
  "pregunta": "Un Mago Oscuro disfrazó a sus esbirros. El siguiente encantamiento invoca 'atacar()' en su horda. ¿Cuál será la manifestación exacta en la consola?\\n\\n'abstract class Monstruo { abstract void atacar(); }'\\n'class Orco extends Monstruo { void atacar() { System.out.println(\\"¡GARRAZO!\\"); } }'\\n'class Goblin extends Monstruo { void atacar() { System.out.println(\\"¡PINCHAZO!\\"); } }'\\n\\nMonstruo[] horda = {new Goblin(), new Orco()};\\nfor(Monstruo m : horda) { m.atacar(); }",
  "respuesta": "La salida en la consola será:\\n¡PINCHAZO!\\n¡GARRAZO!",
  "explicacion": "¡Este es el poder arcano del Polimorfismo! En tiempo de ejecución, Java no mira el tipo de la referencia ('Monstruo'), sino la verdadera naturaleza del objeto en memoria ('Goblin', 'Orco') para invocar el hechizo ('método') correcto.",
  "tema": "polimorfismo en tiempo de ejecución",
  "dificultad": "básico"
}`
    }
};