/* FISAI Gym landing: language toggle (ES default, EN) + app link. Fails soft: the page
   is complete Spanish HTML without any of this. */
;(function () {
  var APP_URL = 'https://gym-95-217-188-12.sslip.io'

  var EN = {
    'meta.title': 'FISAI Gym — your gym & body-weight coach',
    'meta.desc': 'FISAI Gym: routines with automatic progression, 1,300+ animated exercises, body-weight tracking and stats. No passwords, no ads, your data on your server.',
    'nav.skip': 'Skip to content',
    'nav.features': 'Features', 'nav.screens': 'Screens', 'nav.access': 'Access', 'nav.install': 'Install',
    'nav.open': 'Open the app',
    'hero.kicker': 'Gym & body-weight coach',
    'hero.title': 'Your workouts.<br>Your weights.<br>Your data.',
    'hero.lead': 'FISAI Gym tells you what to lift today, bumps the weight when it is time and keeps every set, weigh-in and record — on your own server, with no third-party accounts and no ads.',
    'hero.open': 'Open FISAI Gym', 'hero.access': 'Request access',
    'hero.fine': 'Runs in the browser and installs as an app on iPhone and Android. No passwords: sign in with your fingerprint, face or PIN.',
    'hero.alt': 'FISAI Gym home screen on a phone',
    'features.title': 'Built on the gym floor.',
    'features.sub': 'What you need between sets, and nothing else.',
    'f1.t': 'Automatic progression',
    'f1.p': 'Linear, Greyskull, double progression or time-based: the app picks today\u2019s weight and reps from what you did last time.',
    'f2.t': '1,300+ animated exercises',
    'f2.p': 'Every exercise with an animation, the muscles involved and instructions in Spanish and English. Add your own too.',
    'f3.t': 'Rest timer',
    'f3.p': 'Countdown between sets with a sound and a notification, even with the screen locked.',
    'f4.t': 'Body weight & stats',
    'f4.p': 'Log your weight and watch the trend, estimated 1RM, weekly volume and muscle balance.',
    'f5.t': 'No passwords',
    'f5.p': 'Passkey sign-in: fingerprint, Face ID or your device PIN. Nothing to remember, nothing to leak.',
    'f6.t': 'Your data, your server',
    'f6.p': 'Everything lives on the FISAI server and syncs across your devices. Export whenever you like; no telemetry.',
    'screens.title': 'Five screens, and that\u2019s the app.',
    's.home': 'Home', 's.plan': 'Plan', 's.stats': 'Progress', 's.library': 'Exercises', 's.history': 'History',
    'access.title': 'Invite-only access',
    'access.p': 'FISAI Gym is private: you need an invite code to create your profile. Ask your coach or the FISAI team, then set it up in under a minute with your phone\u2019s fingerprint or face.',
    'access.cta': 'I have a code — sign in',
    'install.title': 'Install it as an app',
    'install.sub': 'No app store: add it to your home screen from the browser.',
    'ios.1': 'Open FISAI Gym in Safari.',
    'ios.2': 'Tap Share, then \u201cAdd to Home Screen\u201d.',
    'ios.3': 'Launch it from the icon: full screen and notifications.',
    'and.1': 'Open FISAI Gym in Chrome.',
    'and.2': 'Tap the \u22ee menu, then \u201cInstall app\u201d.',
    'and.3': 'Done: it works like any other app.',
    'foot.based': 'Based on', 'foot.source': 'source code',
    'foot.media': 'Exercise images \u00a9 Gym visual, used under the terms of the hasaneyldrm/exercises-dataset.',
  }

  // Spanish is what the HTML ships with; capture it once so switching back is lossless.
  var ES = {}
  function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn) }
  each('[data-i18n]', function (el) { ES[el.getAttribute('data-i18n')] = el.innerHTML })
  each('[data-i18n-content]', function (el) { ES[el.getAttribute('data-i18n-content')] = el.getAttribute('content') })
  each('[data-i18n-alt]', function (el) { ES[el.getAttribute('data-i18n-alt')] = el.getAttribute('alt') })

  function apply(lang) {
    var d = lang === 'en' ? EN : ES
    each('[data-i18n]', function (el) { var v = d[el.getAttribute('data-i18n')]; if (v != null) el.innerHTML = v })
    each('[data-i18n-content]', function (el) { var v = d[el.getAttribute('data-i18n-content')]; if (v != null) el.setAttribute('content', v) })
    each('[data-i18n-alt]', function (el) { var v = d[el.getAttribute('data-i18n-alt')]; if (v != null) el.setAttribute('alt', v) })
    each('.lang [data-lang]', function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)) })
    document.documentElement.lang = lang
    try { localStorage.setItem('fisai-lang', lang) } catch (e) {}
  }

  var lang = 'es'
  try {
    var q = new URLSearchParams(location.search).get('lang')
    lang = q || localStorage.getItem('fisai-lang') || ((navigator.language || 'es').slice(0, 2) === 'en' ? 'en' : 'es')
  } catch (e) {}
  if (lang !== 'es') apply(lang)
  each('.lang [data-lang]', function (b) { b.addEventListener('click', function () { apply(b.getAttribute('data-lang')) }) })

  each('.app-link', function (a) { a.href = APP_URL })
  var y = document.getElementById('year'); if (y) y.textContent = String(new Date().getFullYear())
})()
