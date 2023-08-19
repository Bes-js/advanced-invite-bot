import { CommandInteraction, CommandInteractionOption} from "discord.js";
import bot from "../../classes/bot";
import {inviteClient} from "../../index";
import config from "../../config.json";
import canvafy from "canvafy";
export default {
    name: "leaderboard",
    category: "invite",
    description: "Shows Information of the Leaderboard",
    options: [],
    run: async (client: bot, interaction: CommandInteraction, args: Array<String | CommandInteractionOption>) => {
      await interaction.deferReply();
      var invites = inviteClient.getGuildInvites(`${interaction.guild?.id}`,10);
      if(invites.length < 1)return interaction.editReply({content:`data yok`})
      

     var data: object[] = [];
     invites.filter(x => interaction.guild?.members.cache.get(x.user)).forEach((x,i) => { data.push({ top: (i+1), avatar: `${interaction.guild?.members.cache.get(x.user)?.user.displayAvatarURL({extension:"png",size:2048})}`, tag: `${interaction.guild?.members.cache.get(x.user)?.user.username}`, score: x.invites })})

     const leaderboard = await new canvafy.Top()
       .setBackground("image", config.inviteImage.Background)
       .setOpacity(0.8)
       .setScoreMessage("Invites;")
       .setUsersData(data)
       .setabbreviateNumber(true)
       .build()
     
     

return interaction.editReply({files:[{attachment:leaderboard}]})

    }
}