const Discord = require('discord.js');
const config = require('../../config.js');

module.exports = {
    name: "rename",
    description: "Renames the active ticket.",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();

        if (!message.member.roles.cache.some(r => [config.supportTeamID, config.ticketOverwatch, config.adminID].includes(r.id)))
            return message.reply("You do not have permisson to use this command.");
        if(message.channel.parentID !== config.ticketCategory) return message.reply('You may only use Ticket Commands in active Tickets');

        const newName = args.join(" ");    
        const embed = new Discord.MessageEmbed()
          .setTitle(`Ticket Renamed`)
          .setColor('#e93020')
          .setDescription(`${message.author} Your ticket has been renamed to ticket-${newName}`)
            if (config.logoEnabled === true) {
                embed.setFooter(`${message.guild.name} | Made by Foaf#0001`, config.logoURL)
            } else {
                embed.setFooter(`${message.guild.name} | Made by Foaf#0001`)
            }

          message.channel.setName(`ticket-${newName}`)
          message.channel.send(embed)
    }
}