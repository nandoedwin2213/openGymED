// Ready-to-send WhatsApp welcome text for a new client: benefits + the four sign-up steps with
// their personal invite code filled in. Spanish only — it is what the coach forwards to clients.

// The sign-up link must point at the instance that issued the code, so callers pass their origin.
export function inviteMessage(code, appUrl) {
  return [
    '¡Hola! 👋 Te doy la bienvenida a *FISAI Gym*, la app con la que vamos a llevar tu entrenamiento de forma ordenada y segura.',
    '',
    '*¿Qué te da?*',
    '✅ Tu rutina siempre a la mano, con series, pesos y descansos',
    '✅ Te dice cuánto subir cada semana (progresión automática)',
    '✅ Historial, récords personales y gráficas de tu progreso y peso corporal',
    '✅ Temporizador de descanso y recordatorios de entrenamiento',
    '✅ Sin contraseñas: entras con tu huella o tu cara. Tus datos son solo tuyos, sin publicidad.',
    '',
    '*Cómo empezar (1 minuto):*',
    '1️⃣ Abre en tu celular: ' + appUrl,
    '2️⃣ Toca *«Crear perfil nuevo»*',
    '3️⃣ Escribe tu nombre y pega este código: *' + code + '* (es personal y de un solo uso)',
    '4️⃣ Toca *«Crear passkey»* y confirma con huella, cara o PIN. ¡Listo!',
    '',
    '*Tip:* instálala como app: en iPhone toca Compartir → «Añadir a pantalla de inicio»; en Android toca ⋮ → «Instalar app». La próxima vez entras con *«Iniciar sesión con passkey»*.',
    '',
    '¿Dudas? Escríbeme por aquí. ¡A entrenar! 💪',
  ].join('\n')
}

export const whatsappShareUrl = (code, appUrl) => 'https://wa.me/?text=' + encodeURIComponent(inviteMessage(code, appUrl))
