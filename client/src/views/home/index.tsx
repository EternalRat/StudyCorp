import Wave from 'react-wavify';
import logo from '../../assets/logo.png';
import config from '../../config.json';

export function Home() {
  require('./index.css');
  return (
    <div className="homepage">
      <div className="div-title">
        <span className="title">Bienvenue sur StudyCorp</span>
      </div>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="div-connexion">
        <span className="subtitle">Souhaitez-vous</span>
        <div className="choice">
          <a href={config.api_url}>
            <div className="button">Postuler</div>
          </a>
          <div className="or-div">
            <hr />
            <div>
              <span>OU</span>
            </div>
            <hr />
          </div>
          <a href={config.api_url + '/auth'}>
            <div className="button">Se connecter</div>
          </a>
        </div>
        <span className="msg-error">
          Si vous rencontrez un problème, rendez vous sur le discord.
        </span>
      </div>
      <Wave
        fill="url(#gradient)"
        style={{
          position: 'absolute',
          bottom: 0,
          zIndex: 0,
          height: '37.5%',
          overflowY: 'hidden',
        }}
        options={{
          height: 0,
          amplitude: 30,
          speed: 0.25,
          points: 2,
        }}
      >
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="10%" stopColor="#80d8a5" />
            <stop offset="90%" stopColor="#028b5e" />
          </linearGradient>
        </defs>
      </Wave>
    </div>
  );
}
