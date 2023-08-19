import bot from "../classes/bot";
import { GuildMember,User,EmbedBuilder,TextChannel,Invite} from "discord.js";
import {inviteClient} from "../index";
import canvafy from "canvafy";
import config from "../config.json"
export default async function memberJoin(client: bot, member:GuildMember,inviter:User,invite:Invite) {

   var log = client.channels.cache.get(config.inviteLogChannel) as TextChannel;
   if(!log || log == undefined)return console.error("An Error Occurred in Invite Log Channel.")
    if(!inviter) {
        sendLog(`> **${member.user.username} joined the server, but I couldn't find out who was invited.**`,member,log)
      } else if(member.id == inviter.id) {
        sendLog(`> **${member.user.username} Joined the server by his own invitation! (\` Uses: ${invite.uses} \`)**`,member,log)
      }else if(member.guild.vanityURLCode == inviter.id) {
        sendLog(`> **${member.user.username} Joined Server Using Vanity URL! (\` Uses: ${member.guild.fetchVanityData().then(x=> x.uses)} \`)**`,member,log)
      } else {
        inviteClient.inviteAdd(member.guild.id, inviter,1);
        sendLog(`> **${member.user.tag} Joined the server! inviter; ${inviter.username} (\` Uses: ${invite.uses} \`)**`,member,log)
      };
}


async function sendLog(description:string,member:GuildMember,channel:TextChannel) {
    try{
    const security = await new canvafy.Security()
    .setAvatar(member.user.displayAvatarURL({extension:"png",forceStatic:true}))
    .setBackground("image", config.inviteImage.Background)
    .setCreatedTimestamp(member.user.createdTimestamp)
    .setSuspectTimestamp(config.inviteImage.SuspectTimestamp)
    .setBorder("#00ff00")
    .setLocale(config.inviteImage.LocaleCode)
    .setAvatarBorder("#fff")
    .setOverlayOpacity(config.inviteImage.OverlayOpacity)
    .build();  

    const embed = new EmbedBuilder()
    .setColor("#00ff00")
    .setImage("attachment://security.png")
    .setDescription(description)
    .setTimestamp();

    if(config.inviteImage.SendImage){
    channel.send({embeds:[embed],files:[{attachment:security,name:"security.png"}]});
    }else{
    channel.send({embeds:[embed]})  
    }
    }catch(err){
    console.error("An Error Occurred in Canvas Picture Or Invite Log Channel, I Could Not Send The Message.")
    }
}