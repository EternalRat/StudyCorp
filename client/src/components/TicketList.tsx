import { API } from '../utils';
import { ITicket } from '../utils/interface';

interface props {
    tickets: Array<ITicket>;
    idTicket: any;
    selected: number | undefined;
    setMessage: any;
    setLoading: any;
};

export function TicketList({tickets, idTicket, selected, setMessage, setLoading}: props) {
    return <>
        {tickets.map((ticket) => {
            const date = new Date(ticket.timestamp);
            return <div key={ticket.idticket} onClick={() => {
                idTicket(ticket.idticket);
                setLoading(true);
                API.getTicketMessages(ticket.idticket.toString()).then(({data}) => {
                    setMessage(data.tm);
                    setLoading(false);
                }).catch(err => console.log(err));
            }} className={`ticket ${selected === ticket.idticket ? 'selected' : ''}`} id={ticket.idticket.toString()}>Ticket de {ticket.pseudo} • {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</div>;
        })}
    </>;
}