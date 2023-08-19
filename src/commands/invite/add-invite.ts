import { CommandInteraction, CommandInteractionOption,EmbedBuilder,PermissionFlagsBits,User} from "discord.js";
import bot from "../../classes/bot";
import {inviteClient} from "../../index";

export default {
    name: "add-invite",
    category: "invite",
    description: "Adds Bonus Invite to a User",
    default_member_permissions:[PermissionFlagsBits.ManageGuild.toString()],
    options: [
        {
         name:"user",
         description:"User you want to add bonus",
         type:6, 
         required:true
        },
        {
        name:"count",
        description:"Bonus Amount You Want to Add",
        type: 4,
        required:true
        }
    ],
    run: async (client: bot, interaction: CommandInteraction, args: Array<String | CommandInteractionOption>) => {
      await interaction.deferReply();
      if(!interaction.memberPermissions?.has(PermissionFlagsBits.ManageGuild))return interaction.editReply({content:`> **🔴 Insufficient permissions for this command.**`})
      try{
        var member = interaction.guild?.members.cache.get(`${interaction.options.get("user")?.value}`)?.user as User;
     
      var count: number = parseInt(interaction.options.get("count")?.value as string);
      inviteClient.inviteAdd(`${interaction.guild?.id}`,member,count);

  
    interaction.editReply({embeds:[new EmbedBuilder().setColor("#00ff00").setDescription(`> **Added \`${count}\` Invites from User ${member}**`)]})
    }catch(err){
    interaction.editReply({embeds:[new EmbedBuilder().setColor("#ff000").setDescription(`> **Error; ${err}**`)]})
    }



    }
}