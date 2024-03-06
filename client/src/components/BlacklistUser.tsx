import { IBlacklist } from '../utils/interface';

interface props {
    blacklistedUser: IBlacklist;
    index: number;
}

export function BlacklistUser({blacklistedUser, index}: props) {
    return <tr>
        <th>{index}</th>
        <th>{blacklistedUser.pseudo}</th>
        <th>{blacklistedUser.userid}</th>
        <th>{blacklistedUser.motif}</th>
    </tr>;
}