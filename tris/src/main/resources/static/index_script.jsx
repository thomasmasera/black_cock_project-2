console.log("JS caricato!");

document.querySelector('.register').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('login').style.display = 'none';
  document.getElementById('sign-up').style.display = 'flex';
            
});

// QUESTo è l'import di un componente React per il testo glitch
import './GlitchText.css';

const GlitchText = ({
  children,
  speed = 1,
  enableShadows = true,
  enableOnHover = true,
  className = '',
}) => {
  const inlineStyles = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-5px 0 red' : 'none',
    '--before-shadow': enableShadows ? '5px 0 cyan' : 'none',
  };

  const hoverClass = enableOnHover ? 'enable-on-hover' : '';

  return (
    <div
      className={`glitch ${hoverClass} ${className}`}
      style={inlineStyles}
      data-text={children}
    >
      {children}
    </div>
  );
};

export default GlitchText;
// fino a qui è l'import di un componente React per il testo glitch

document.getElementById('login').addEventListener('submit', function(e) {
  console.log("login intercettato");
  e.preventDefault(); // 🔒 Impedisce il refresh automatico della pagina

  // 🔍 Recupera i valori dai campi input
  let username = document.getElementById('login_username').value;
  let password = document.getElementById('login_password').value;

  // 📨 Crea l’oggetto da inviare
  let loginData = {
    name: username,
    password: password
  };

  // 🔗 Esegue la chiamata API
  fetch('/player/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(data => {
        throw new Error(data.message || 'Errore');
      });
    }
    sessionStorage.setItem('player', username);
    window.location.href = "/lobby.html";
    return response.json();
  })
  .then(data => {
    console.log('Login riuscito!', data);
    // Esempio: salva un token o reindirizza
    // localStorage.setItem('token', data.token);
    // window.location.href = '/dashboard';
  })
  .catch(error => {
    console.error('Errore:', error.message);
    // Mostra messaggio d'errore a schermo
  });
});

document.getElementById('sign-up').addEventListener('submit', function(e) {
    console.log("signup intercettato");
    e.preventDefault();

    let username = document.getElementById('signup_username').value;
    let password = document.getElementById('signup_password').value;

    let loginData = {
        name: username,
        password: password
    };

    fetch('player/new', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.message || 'Errore');
          });
        }
        sessionStorage.setItem('player', username);
        window.location.href = "/lobby.html";
        return response.json();
    })
    .then(data => {
        console.log('Registrazione riuscita!', data);
    })
    .catch(error => {
        console.error('Errore', error.message);
    });
    
});