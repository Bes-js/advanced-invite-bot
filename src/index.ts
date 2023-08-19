import bot from './classes/bot';
import config from './config.json';
import InviteManager from 'discord-invite';

const client = new bot({intents: [33619]});
const inviteClient = new InviteManager(client);
export {inviteClient};

client.login(config.token);