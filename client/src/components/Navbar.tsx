import { useEffect, useState } from 'react';
import { IUser } from '../utils/interface';
import admin from '../assets/admin.png';
import archive from '../assets/archive.png';
import blacklist from '../assets/blacklist.png';
import profile from '../assets/profile.png';

import { API } from '../utils';

interface INavbar {
  menu: number;
  user: IUser;
}

export default function Navbar({ menu, user }: INavbar) {
  const [loading, setLoading] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  useEffect(() => {
    setLoading(true);
    API.isAdmin().then(() => {
      setAdmin(true);
    });
  }, []);
  require('./Navbar.css');
  if (!loading) return <></>;
  return (
    <>
      <div className="navbar" style={{ width: '400px' }}>
        <div className={'navbar-header '}>
          <div className={'user-avatar '}>
            <img src={user!.avatar} alt={user!.username}></img>
          </div>
        </div>
        {
          <div className="user-name">
            Connecté en tant que <b>{user!.username} </b> !
          </div>
        }

        <div className="navbar-body">
          <div className="navbar-items">
            <div className={`navbar-button ${menu === 0 ? 'selected' : ''}`}>
              <a href="/blacklist">
                <img alt="blacklist" src={blacklist}></img>
                {<span>Blacklist</span>}
              </a>
            </div>
            <hr></hr>
            <div className={`navbar-button ${menu === 1 ? 'selected' : ''}`}>
              <a href="/ticket">
                <img alt="ticket" src={archive}></img>
                {<span>Tickets</span>}
              </a>
            </div>
            <hr></hr>
            <div className={`navbar-button ${menu === 2 ? 'selected' : ''}`}>
              <a href="/guide">
                <img alt="guide" src={archive}></img>
                {<span>Guide</span>}
              </a>
            </div>
            <hr></hr>
            <div className={`navbar-button ${menu === 3 ? 'selected' : ''}`}>
              <a href="/profile">
                <img alt="profile" src={profile}></img>
                {<span>Profil</span>}
              </a>
            </div>
            <hr></hr>
            {isAdmin ? (
              <>
                <div
                  className={`navbar-button ${menu === 4 ? 'selected' : ''}`}
                >
                  <a href="/admin">
                    <img alt="admin" src={admin}></img>
                    {<span>Administration</span>}
                  </a>
                </div>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </>
  );
}
