export default {
  locale: {
    en: 'Englisch',
    de: 'Deutsch',
  },
  app: {
    title: 'WM Tippspiel',
  },
  nav: {
    profile: 'Profile',
    sign_out: 'Abmelden',
    admin: 'Sie sind Admin.',
  },
  ranking: {
    title: 'Ranglisten',
  },
  settings: {
    title: 'Einstellungen',
    change_language: 'Sprache ändern',
    select_language: 'Wähle eine Sprache aus',
  },
  admin: {
    title: 'Admin',
    lead: 'Resultate erfassen',
    create_game: 'Spiel erfassen',
  },
  games: {
    title: 'Tippspiel',
    points: '{points} Punkte',
    rules: {
      tipped_host_score_correctly: 'Korrekte Anzahl Heim-Tore:',
      tipped_guest_score_correctly: 'Korrekte Anzahl Gast-Tore:',
      tipped_winner_correctly: 'Korrekte Sieger:',
      balance_and_winner_correctly: 'Korrekte Tordifferenze + Sieger:',
    },
  },
  teams: {
    title: 'Tippgruppen',
  },
  home: {
    title: 'Weltmeisterschaft 2018 in Russland',
    sub_title: 'Tippspiel',
    description: 'Projekt-Arbeit von David Heimgartner, Gerhard Hirschfeld & Ken Iseli',
  },
  login: {
    title: 'Bitte Anmelden',
    sign_in: 'Anmelden',
    register_link: 'Registrieren',
    reset_password_link: 'Passwort vergessen?',
  },
  forgot_password: {
    title: 'Passwort vergessen',
    submit: 'Passwort zurücksetzen',
    success_title: 'Mail erfolgreich versendet.',
    success_message: 'Es wurde eine E-Mail an <b>%{email}</b> verschickt. Bitte überprüfen Sie Ihre Mailbox.',
  },
  reset_password: {
    title: 'Passwort zurücksetzen',
    submit: 'Passwort zurücksetzen',
    success_title: 'Passwort wurde erfolgreich geändert.',
    success_message: 'Es wurde eine E-Mail an <b>%{email}</b> verschickt. Bitte überprüfen Sie Ihre Mailbox.',
  },
  register: {
    title: 'Registrierung',
    submit: 'Erstellen',
  },
  verification: {
    pending: {
      title: 'Email Bestätigung',
      message: `Sie sollten in Kürze eine Email von uns erhalten. In der Email befinden sich ein Bestätiguns-Link,
      welchen Ihren User bestätigt. Anschliessend können Sie sich bei uns Anmelden`,
    },
    success: {
      title: 'Email Bestätigung',
      message: `Die Bestätigung war erfolgreich. Sie können sich jetzt anmelden.`,
    },
  },
  label: {
    username: 'Username',
    email: 'E-Mail',
    password: 'Passwort',
    password_confirm: 'Passwort bestätigen',
  },
  placeholder: {
    username: 'Username',
    email: 'E-Mail',
    password: 'Passwort',
    password_confirm: 'Passwort bestätigen',
  },
  message: {
    login_successful: 'Sie haben sich erfolgreich angemeldet',
    login_failed: 'Username oder Passwort ist falsch.',
    login_incomplete: 'Bitte geben Sie Username und Passwort an.',
    register_successful: 'Sie haben sich erfolgreich registriert',
    register_failed: 'Sie konnten leider nicht registriert werden.',
    verification_successful: 'Sie wurden erfolgreich verifiziert. Sie können sich nun anmelden und los tippen! :-)',
    verification_failed: 'Leider konnte Ihr Account nicht verifiziert werden.',
    forgot_password_failed: 'Leider kann ihr PW nicht zurückgesetzt werden.',
    reset_password_successful: 'Password wurde erfolgreich zurückgesetzt',
    reset_password_failed: '@:message.forgot_password_failed',
    game_updated_successful: 'Spiel wurde erfoglreich gepflegt',
  },
  connection: {
    server_unavailable: {
      title: 'Server ist nicht erreichbar!',
      message: 'Momentan ist der Server nicht ansprechbar. Bitte versuchen Sie es in ein paar Minuten erneut.',
    },
    offline: {
      title: 'Keine Internet Verbindung!',
      message: 'Bitte stellen Sie sicher, dass Sie eine Internet Verbindung haben und laden Sie dann die Seite neu.',
    },
  },
  action: {
    save: 'Speichern',
  },
};
