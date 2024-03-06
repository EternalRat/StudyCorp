import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { TicketList } from '../../components/TicketList';
import { TicketView } from '../../components/TicketView';
import { API } from '../../utils';
import { IMessage, ITicket, IUser } from '../../utils/interface';

export function Ticket() {
  const [user, setUser] = useState<IUser>({
    username: '',
    discordId: '',
    avatar: '',
  });
  const [tickets, setTickets] = useState<Array<ITicket>>();
  const [error, setError] = useState<Boolean>(false);
  const [idTicket, setIdTicket] = useState<number>(-1);
  const [messages, setMessages] = useState<Array<IMessage>>();
  const [loadingUser, setLoadingUser] = useState<Boolean>(false);
  const [loadingTickets, setLoadingTickets] = useState<Boolean>(false);
  const [loadingMessages, setLoadingMessages] = useState<Boolean>(true);
  require('./index.css');
  useEffect(() => {
    API.getUser()
      .then(({ data }) => {
        setUser(data);
        setLoadingUser(true);
      })
      .catch((err) => setError(true));
    API.getTicket()
      .then(({ data }) => {
        setTickets(data.t);
        setLoadingTickets(true);
      })
      .catch((err) => setError(true));
  }, []);
  if (error) {
    return <Navigate to="/"></Navigate>;
  }
  if (!loadingUser && !loadingTickets) {
    return (
      <>
        <div className="home">
          <Navbar menu={1} user={user}></Navbar>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar menu={1} user={user}></Navbar>
      <div className="home">
        <div className="ticket-home">
          <div className="tickets">
            <div className="ticket-list">
              Liste de vos tickets
              <div className="ticket-container">
                {tickets && (
                  <TicketList
                    tickets={tickets}
                    idTicket={setIdTicket}
                    selected={idTicket}
                    setMessage={setMessages}
                    setLoading={setLoadingMessages}
                  ></TicketList>
                )}
              </div>
            </div>
            <hr></hr>
            <div className="ticket-view">
              Vision du transcript
              <div className="ticket-view-container">
                {loadingMessages === false ? (
                  <TicketView messages={messages!}></TicketView>
                ) : idTicket === -1 ? (
                  ''
                ) : (
                  'Loading ticket messages...'
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
