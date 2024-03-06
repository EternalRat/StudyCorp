import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BlacklistUser } from '../../components/BlacklistUser';
import Navbar from '../../components/Navbar';
import { API } from '../../utils';
import { IBlacklist, IUser } from '../../utils/interface';

export function Blacklist() {
  const [user, setUser] = useState<IUser>({
    username: '',
    discordId: '',
    avatar: '',
  });
  const [blacklist, setBlacklist] = useState<Array<IBlacklist>>();
  const [error, setError] = useState<Boolean>(false);
  const [loadingBlacklist, setLoadingBlacklist] = useState<Boolean>(false);
  const [loadingUser, setLoadingUser] = useState<Boolean>(false);
  const [username, setUsername] = useState<string>();
  const [id, setId] = useState<string>();
  const [motif, setMotif] = useState<string>();
  require('./index.css');
  useEffect(() => {
    API.getUser()
      .then(({ data }) => {
        setUser(data);
        setLoadingUser(true);
      })
      .catch((err) => setError(true));
    API.getBlacklist()
      .then(({ data }) => {
        setBlacklist(data.blacklistedUser);
        setLoadingBlacklist(true);
      })
      .catch((err) => setError(true));
  }, []);
  if (error) {
    return <Navigate to="/"></Navigate>;
  }
  if (!loadingBlacklist && !loadingUser) {
    return (
      <>
        <div className="home">
          <Navbar menu={0} user={user}></Navbar>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar menu={0} user={user}></Navbar>
      <div className="home">
        <div className="blacklist-home">
          <div className="blacklist-list">
            <div className="tab-blacklist">
              {
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>
                        <input
                          type="text"
                          placeholder="Recherche pseudo"
                          className="input"
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                        />
                      </th>
                      <th>
                        <input
                          type="text"
                          placeholder="Recherche ID"
                          className="input"
                          onChange={(e) => {
                            setId(e.target.value);
                          }}
                        />
                      </th>
                      <th></th>
                    </tr>
                    <tr>
                      <th>#</th>
                      <th>Pseudo</th>
                      <th>ID</th>
                      <th>Motif</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blacklist &&
                      blacklist.map((blacklistedUser, index) => {
                        if (username || id || motif) {
                          if (
                            username &&
                            username !== '' &&
                            blacklistedUser.pseudo.includes(username)
                          )
                            return (
                              <BlacklistUser
                                key={index}
                                blacklistedUser={blacklistedUser}
                                index={index}
                              ></BlacklistUser>
                            );
                          if (
                            id &&
                            id !== '' &&
                            blacklistedUser.userid.includes(id)
                          )
                            return (
                              <BlacklistUser
                                key={index}
                                blacklistedUser={blacklistedUser}
                                index={index}
                              ></BlacklistUser>
                            );
                          if (
                            motif &&
                            motif !== '' &&
                            blacklistedUser.motif.includes(motif)
                          )
                            return (
                              <BlacklistUser
                                key={index}
                                blacklistedUser={blacklistedUser}
                                index={index}
                              ></BlacklistUser>
                            );
                        } else
                          return (
                            <BlacklistUser
                              key={index}
                              blacklistedUser={blacklistedUser}
                              index={index}
                            ></BlacklistUser>
                          );
                        return '';
                      })}
                  </tbody>
                </table>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
