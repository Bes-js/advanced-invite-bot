import bot from "../classes/bot";
import { CommandInteractionOption, Interaction } from "discord.js";

export default function interactionCreate(client: bot, interaction: Interaction) {
if (!interaction.isCommand()) return;

    const args: Array<CommandInteractionOption> = [];
    interaction.options.data.forEach(v => args.push(v));

    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    command.run(client, interaction, args);
}