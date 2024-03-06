import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { API } from '../../utils';
import { IUser, IVWarns } from '../../utils/interface';

export function Profile() {
  const [user, setUser] = useState<IUser>({
    username: '',
    discordId: '',
    avatar: '',
  });
  const [warns, setWarns] = useState<Array<IVWarns>>();
  const [error, setError] = useState<Boolean>(false);
  const [loadingUser, setLoadingUser] = useState<Boolean>(false);
  const [loadingVWarns, setLoadingVWarns] = useState<Boolean>(false);
  require('./index.css');
  useEffect(() => {
    API.getUser()
      .then(({ data }) => {
        setUser(data);
        setLoadingUser(true);
      })
      .catch((err) => setError(true));
    API.getVWarns()
      .then(({ data }) => {
        setWarns(data.vw);
        setLoadingVWarns(true);
      })
      .catch((err) => setError(true));
  }, []);
  if (error) {
    return <Navigate to="/"></Navigate>;
  }
  if (!loadingUser && !loadingVWarns) {
    return (
      <>
        <div className="home">
          <Navbar menu={3} user={user}></Navbar>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar menu={3} user={user}></Navbar>
      <div className="home">
        <div className="profile-home">
          <div className="profile-details">
            <div className="title">Votre profil</div>
            <div className="details">
              <span>Pseudo: {user.username}</span>
              <span>ID: {user.discordId}</span>
            </div>
          </div>
          <div className="profile-warns">
            <div className="title">Vos avertissements</div>
            <div className="warns-list">
              <div className="tab-warns">
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: '30%' }}>Pseudo</th>
                      <th>Motif</th>
                    </tr>
                  </thead>
                  <tbody>
                    {warns &&
                      warns.map((warn, index) => {
                        return (
                          <tr key={index}>
                            <th>{warn.pseudo}</th>
                            <th>{warn.reason}</th>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
