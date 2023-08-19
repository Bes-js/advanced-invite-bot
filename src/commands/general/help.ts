import { CommandInteraction, CommandInteractionOption,EmbedBuilder,codeBlock} from "discord.js";
import bot from "../../classes/bot";

export default {
    name: "help",
    category: "general",
    description: "Shows All Commands And Their Descriptions",
    options: [],
    run: async (client: bot, interaction: CommandInteraction, args: Array<String | CommandInteractionOption>) => {
    await interaction.deferReply();
    var generalCommands = client.commands.filter(x => x.category == "general").map((data) => `/${data.name} - ${data?.description.length > 0 ? data.description : "Not Found"}`).join("\n");
    var inviteCommands = client.commands.filter(x => x.category == "invite").map((data) => `/${data.name} - ${data?.description.length > 0 ? data.description : "Not Found"}`).join("\n");
    interaction.editReply({embeds:[new EmbedBuilder().setColor("Random").setFooter({text:`by ${interaction.user.username}`,iconURL:interaction.user.displayAvatarURL({forceStatic:true})}).setDescription(codeBlock("fix",`General Commands;\n\n${generalCommands}\n\nInvite Commands;\n\n${inviteCommands}`))]});
    }
}