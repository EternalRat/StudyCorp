import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { API } from '../../utils';
import { IUser } from '../../utils/interface';
import first_ticket_msg from '../../assets/first_ticket_msg.png';
import take_screen from '../../assets/take_screen.png';
import blacklist_ticket from '../../assets/blacklist_ticket.png';
import forum_discord from '../../assets/forum_discord.png';

export function Guide() {
  const [user, setUser] = useState<IUser>({
    username: '',
    discordId: '',
    avatar: '',
  });
  const [error, setError] = useState<Boolean>(false);
  const [loadingUser, setLoadingUser] = useState<Boolean>(false);
  require('./index.css');

  useEffect(() => {
    API.getUser()
      .then(({ data }) => {
        setUser(data);
        setLoadingUser(true);
      })
      .catch((err) => setError(true));
  }, []);

  if (error) {
    return <Navigate to="/"></Navigate>;
  }
  if (!loadingUser) {
    return (
      <>
        <div className="home">
          <Navbar menu={2} user={user}></Navbar>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar menu={2} user={user}></Navbar>
      <div className="home">
        <div className="profile-home">
          <div className="profile-details">
            <div className="title">
              Nouvel arrivant chez StudyCorp ? Ce guide te permettra de faire
              tes premiers pas sur le serveur !
            </div>
            <div className="details">
              <div className="s-title">I. Le grade de vendeur</div>
              <div className="desc">
                Tu as été pris ? Fécilitaion ! Tu es désormais vendeur chez
                nous. Le grade le plus bas est celui de vendeur.
                <br />
                Si ton travail est exemplaire, tu pourra bénéficier du grade de{' '}
                <span style={{ color: 'green' }}>
                  {' '}
                  <b> vendeur confirmé </b>
                </span>
                . Celui ci permet d'être plus autonomne et ne nécéssite pas la
                présence
                <br />
                d'un staff pour pouvoir donner la permission au client de
                déposer un avis.
              </div>
              <div className="s-title">II. Les tickets</div>
              <div className="desc">
                Lorsqu'un client ouvre un ticket, il y a 2 possibilités :<br />
                ▷ Aucun vendeur n'est mentionné :<br />
                Dans ce cas, vous êtes libre de prendre la commande. Cependant,
                pour une question d'équité entre tous, il est nécéssaire
                d'attendre quelques heures voir si d'autres vendeurs souhaitent
                proposer un devis.
                <br />
                ▷ Un vendeur est mentionné : <br />
                Vous avez l'interdiction de prendre le ticket. Seul le vendeur
                qui a été mentionné par le client peut décider de ne pas
                s'occuper du ticket et le laisser à un autre.
                <br />
              </div>
              <div className="desc">
                Vous souhaitez prendre un ticket ? Parfait !<br />
                Sur le premier message du salon, vous avez un bouton bleu
                "Take". Celui ci vous permet de vous assigner le ticket et le
                rendre privé.
                <br />
                <img alt="msg" src={first_ticket_msg} /> <br />
                En dessous des boutons, si le client est blacklist, vous en
                serez informé ainsi que le motif du blacklist. Dans ce cas ci,
                je ne suis pas blacklist.
                <br />
                <img alt="msg" src={blacklist_ticket} />
                <br />
                Une fois votre ticket assigné, vous pouvez réaliser la commande
                comme bon vous semble. Notez tout de même que vous pouvez
                demander l'intervention du staff ou réouvrir le ticket au
                besoin.
                <br />
                <img alt="msg" src={take_screen} />
                <br />
              </div>
              <div className="desc">
                Votre commande est finie ? Parfait !<br />▷ Si vous avez le
                grade{' '}
                <span style={{ color: 'green' }}>
                  {' '}
                  <b> vendeur confirmé </b>
                </span>
                , vous pouvez autoriser le dépot d'un avis grâce à la commande :
                <br />
                <b>+addavis @utilisateur </b>
                <br />
                Celui ci aura 48H pour déposer son avis grâce à la commande qui
                est indiquée dans le message du salon.
                <br />▷ Si vous n'avez pas le grade{' '}
                <span style={{ color: 'green' }}>
                  {' '}
                  <b> vendeur confirmé </b>
                </span>
                , vous pouvez mentionner un membre du staff qui aurotisera le
                client à déposer un avis.
                <br />
              </div>
              <div className="s-title">III. Conseils</div>
              <div className="desc">
                ▷ Demandez un accompte ! C'est une sécurité au cas où le client
                viendrai à quitter ou ne pas payer. Vous pouvez demander 25 à
                50% du montant total généralement.
                <br />
                ▷ Ne prennez pas de ticket si vous n'avez pas les compétences !
                Cela vaudra une mauvaise expérience au client et un avis négatif
                sur vous !<br />
                ▷ Vous pouvez revoir vos ticket dans la section "Tickets" du
                site !<br />
              </div>
              <div className="s-title">IV. Créez un portefolio</div>
              <div className="desc">
                Dans le salon <b>"Nos créations"</b>, vous pouvez créer un petit
                portefolio pour vos créations.
                <br />
                <img alt="msg" src={forum_discord} />
                <br />
                Sur l'exemple ci-dessus, vous mettez votre titre, par exemple
                "Créations de HybrideTV" ou "Portefolio de HybrideTV". Une
                petite description concernant ce que vous faites, etc..
                <br />
                N'oubliez pas de mettre un tag ! Par exemple, le tag{' '}
                <b>Graphisme</b> est entouré.
                <br />
                Créez ensuite votre post, et vous pourrez poster des screens,
                etc.. de vos créations.
                <br />
                <div className="warning">
                  Attention : les liens sont strictement interdit sauf accord.
                  Aucune publicité n'est tolérée.
                </div>
              </div>
            </div>
          </div>
          <hr></hr>
        </div>
      </div>
    </>
  );
}
