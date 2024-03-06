import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { API } from '../../utils';
import { IUser, IVWarns, IWarns } from '../../utils/interface';

interface Admin {
  dUsers: Array<IUser>;
  vwList: Array<IVWarns>;
  wUsers: Array<IWarns>;
}

export function Admin() {
  const [user, setUser] = useState<IUser>({
    username: '',
    discordId: '',
    avatar: '',
  });
  const [loadingUser, setLoadingUser] = useState<Boolean>(false);
  const [loadingAdmin, setLoadingAdmin] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  const [logged, setLogged] = useState<Boolean>(true);
  const [admin, setAdmin] = useState<Admin>({
    dUsers: [],
    vwList: [],
    wUsers: [],
  });
  require('./index.css');
  useEffect(() => {
    API.getUser()
      .then(({ data }) => {
        setUser(data);
        setLoadingUser(true);
      })
      .catch((err) => setError(true));
    API.getAdmins()
      .then(({ data }) => {
        setAdmin(data);
        setLoadingAdmin(true);
      })
      .catch((err) => {
        if (err.response.status === 401) setLogged(false);
        setError(true);
      });
  }, []);
  if (error) {
    return <Navigate to={!logged ? '/' : '/blacklist'}></Navigate>;
  }
  if (!loadingUser && !loadingAdmin) {
    return (
      <>
        <div className="home">
          <Navbar menu={4} user={user}></Navbar>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar menu={4} user={user}></Navbar>
      <div className="home">
        <div className="admin-home">
          <div className="admin">
            <u>
              <b>Liste des vendeurs/staffs ayant des avertissements</b>
            </u>
            <div className="admin-vwarns">
              <div className="vwarns">
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: '30%' }}>Pseudo</th>
                      <th>Motif</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admin.vwList &&
                      admin.vwList.map((warn, index) => {
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
            <hr></hr>
            <u>
              <b>Liste des utilisateurs s'étant connecté au moins une fois</b>
            </u>
            <div className="admin-connexion">
              <div className="connexion">
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: '30%' }}>Pseudo</th>
                      <th>ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admin.dUsers &&
                      admin.dUsers.map((user, index) => {
                        return (
                          <tr key={index}>
                            <th>{user.username}</th>
                            <th>{user.discordId}</th>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
            <hr></hr>
            <u>
              <b> Liste des personnes ayant des avertissements</b>
            </u>
            <div className="admin-warns">
              <div className="warns">
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: '30%' }}>Pseudo</th>
                      <th>Raison</th>
                      <th>Averti par</th>
                      <th>Averti le</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admin.wUsers &&
                      admin.wUsers.map((warn, index) => {
                        const date = new Date(warn.warnDate[0]);
                        return (
                          <tr key={index}>
                            <th>{warn.userId}</th>
                            <th>{warn.reason}</th>
                            <th>{warn.userTag.join(', ')}</th>
                            <th>
                              {date.getDate()}/{date.getMonth() + 1}/
                              {date.getFullYear()}
                            </th>
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
