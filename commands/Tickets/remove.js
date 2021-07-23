const Discord = require('discord.js');
const config = require('../../config.js');

module.exports = {
    name: "remove",
    description: "Removes a user from the ticket.",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();

        if (!message.member.roles.cache.some(r => [config.supportTeamID, config.ticketOverwatch, config.adminID].includes(r.id)))
            return message.reply("You do not have permisson to use this command.");
        if(message.channel.parentID !== config.ticketCategory) return message.reply('You may only use Ticket Commands in active Report Tickets');
   
        let everyoneid = message.guild.roles.everyone.id;

        const usertoremove = message.mentions.users.first();
        if (!usertoremove) return message.reply('Please mention who to remove from the ticket.');

        const embed = new Discord.MessageEmbed()
          .setTitle(`User Removed`)
          .setColor('#e93020')
          .setDescription(`${message.author} You have removed ${usertoremove} to the ticket`)
            if (config.logoEnabled === true) {
                embed.setFooter(`${message.guild.name} | Made by Foaf#0001`, config.logoURL)
            } else {
                embed.setFooter(`${message.guild.name} | Made by Foaf#0001`)
            }

          message.channel.updateOverwrite(usertoremove, {
              SEND_MESSAGES: false,
              VIEW_CHANNEL: false,
              READ_MESSAGE_HISTORY: false
          });
          
          message.channel.send(embed)
    }
}