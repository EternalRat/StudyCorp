export interface IUser {
    username?: string;
    discordId?: string;
    avatar?: string;
    email?: string;
}

export interface IBlacklist {
    pseudo: string;
    userid: string;
    motif: string;
}

export interface ITicket {
    avatar: string;
    idticket: number;
    pris: number;
    pseudo: string;
    timestamp: number;
    userid: number;
}

export interface IMessage {
    avatar: string;
    content: string;
    idticket: number;
    timestamp: number;
    userId: string;
    userPseudo: string;
}

export interface IVWarns {
    userId: number;
    pseudo: string;
    reason: string;
}

export interface IWarns extends IVWarns {
    guildId: string;
    warnDate: Array<any>;
    userTag: Array<any>;
}