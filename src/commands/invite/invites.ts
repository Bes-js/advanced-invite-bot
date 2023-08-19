import { CommandInteraction, CommandInteractionOption,EmbedBuilder,User} from "discord.js";
import bot from "../../classes/bot";
import {inviteClient} from "../../index";

export default {
    name: "invites",
    category: "invite",
    description: "Shows Invitation Information of the Specified User",
    options: [
        {
         name:"user",
         description:"Select the User You Want to View Invitation Information",
         type:6, 
         required:false
        }
    ],
    run: async (client: bot, interaction: CommandInteraction, args: Array<String | CommandInteractionOption>) => {
      await interaction.deferReply();
      var member = interaction.guild?.members.cache.get(`${interaction.options.get("user")?.value}`)?.user as User || interaction.user;
      var invites = inviteClient.getMemberInvites(`${interaction.guildId}`,member);


      interaction.editReply({embeds:[new EmbedBuilder().addFields([{name:`Account Date`,value:`<t:${Math.floor(member.createdTimestamp/1000)}>`,inline:true},{name:`Discord Lookup`,value:`[Click Here!](https://discordlookup.com/user/${member.id})`,inline:true}]).setColor("Random").setThumbnail(member.displayAvatarURL({forceStatic:true})).setDescription(`> **${member} User has \`${invites}\` Invitations.**`)]})
      



    }
}