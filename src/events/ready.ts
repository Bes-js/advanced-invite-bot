import bot from "../classes/bot";
import { ActivityType,PresenceData} from "discord.js";
import config from "../config.json";

export default async function ready(client: bot) {

    const presenceData: PresenceData = {activities:[{name:config.botPresence.name,type:ActivityType.Watching}]};
    client.user?.setPresence(presenceData);
    
    const slashCommands = [], commands = client.commands.toJSON();

    for (let i = 0; i < commands.length; i++) {
        const { name, description, options } = commands[i];
       slashCommands.push({name, description, options, type: 1});
    }

    if (slashCommands.length > 0) await client.application?.commands.set(slashCommands);

    console.log(`🟢 ${client.user?.username} Ready!`);
}