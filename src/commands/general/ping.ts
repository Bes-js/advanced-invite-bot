import { CommandInteraction, CommandInteractionOption,EmbedBuilder} from "discord.js";
import bot from "../../classes/bot";

export default {
    name: "ping",
    category: "general",
    description: "Get the ping of the bot",
    options: [],
    run: async (client: bot, interaction: CommandInteraction, args: Array<String | CommandInteractionOption>) => {
        interaction.reply({embeds:[new EmbedBuilder().setColor("Random").setDescription(`> **My Ping is rigth now \`${client.ws.ping}MS\`**`)]});
    }
}