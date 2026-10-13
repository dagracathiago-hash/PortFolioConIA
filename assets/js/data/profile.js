/**
 * DATOS · Perfil personal y sección "Sobre mí".
 * Editá este archivo para cambiar los textos de presentación.
 */
window.Portfolio.data.profile = {
  name: 'Thiago Da Graca',
  initials: 'TD',
  role: 'Desarrollador Java Junior',

  /**
   * Foto de perfil (opcional). Guardala en assets/img/ y poné la ruta, por ejemplo:
   *   photo: 'assets/img/thiago.jpg'
   * Si queda en null se muestra el monograma "TD".
   */
  photo: null,

  /** Párrafos de "Sobre mí". El primero se muestra más grande (entradilla). */
  about: [
    'Soy Thiago, estudiante de tercer año de la Licenciatura en Sistemas en la Universidad Nacional de Lanús. Mi lenguaje principal es Java y me gusta escribir código que otra persona pueda leer, entender y mantener.',
    'Durante la carrera trabajé en equipo con Git (ramas por funcionalidad y pull requests), modelé bases de datos relacionales en MySQL, resolví problemas de concurrencia en C/C++ con semáforos, mutex y prevención de deadlocks, y diseñé una arquitectura modular en cuatro capas para un sistema municipal.',
    'Además trabajé más de dos años atendiendo público como vendedor, mientras estudiaba. Esa experiencia me enseñó a escuchar a quien usa un producto, a trabajar por objetivos y a resolver reclamos de verdad, algo que también se aplica a desarrollar software.',
    'Busco mi primera experiencia profesional como desarrollador junior, trainee o pasante, en un equipo donde pueda aportar y seguir creciendo.'
  ],

  /** Datos rápidos de la tarjeta lateral. `icon` es el nombre de un <symbol id="i-…"> del sprite. */
  facts: [
    { icon: 'map-pin', label: 'Ubicación', value: 'Lanús, Buenos Aires' },
    { icon: 'graduation-cap', label: 'Estudios', value: 'Lic. en Sistemas · UNLa' },
    { icon: 'calendar', label: 'Egreso estimado', value: '2028' },
    { icon: 'globe', label: 'Idiomas', value: 'Español nativo · Inglés B2+' },
    { icon: 'briefcase', label: 'Busco', value: 'Pasantía · Trainee · Junior' }
  ]
};
