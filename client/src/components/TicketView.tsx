import { IMessage } from '../utils/interface';
import { decode } from 'html-entities';

interface props {
    messages: Array<IMessage>;
}

export function TicketView({messages}: props) {
    require('./TicketView.css');
    return <>
        {messages.map((message) => {
            console.log(message);
            const encodedMessage = Buffer.from(message.content, 'utf-8').toString();
            const date = new Date(message.timestamp);
            return <div key={message.timestamp} className="message">
                <div className="message-user-avatar"><img alt={message.userPseudo} src={`https://cdn.discordapp.com/avatars/${message.userId}/${message.avatar}.png`}></img></div>
                <div className="message-user">
                    <div className="message-user-information">
                        <div className="message-user-name">{message.userPseudo}</div>
                        <div className="message-user-date">{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</div>
                    </div>
                    <div className="message-content">{decode(encodedMessage)}</div>
                </div>
            </div>;
        })}
    </>;
}