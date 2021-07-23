const Discord = require('discord.js');
const config = require('../../config.js');

module.exports = {
    name: "close",
    description: "Closes an active ticket.",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();

        if (!message.member.roles.cache.some(r => [config.supportTeamID, config.ticketOverwatch, config.adminID].includes(r.id)))
            return message.reply("You do not have permisson to use this command.");
        if(message.channel.parentID !== config.ticketCategory) return message.reply('You may only use Ticket Commands in active Report Tickets');

        const logchannel = message.guild.channels.cache.find((ch) => ch.id === config.ticketLogs);

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);

        const log = new Discord.MessageEmbed()
            .setTitle('Ticket Closed')
            .setColor('#e93020')
            .addField('Ticket Handler:', `${message.author}`)
            .addField(`Ticket ID`, `${message.channel.id}`)
            .addField(`Date`, `${today.toLocaleDateString()}`)
            if (config.logoEnabled === true) {
                log.setFooter(`${message.guild.name} | Made by Foaf#0001`, config.logoURL)
            } else {
                log.setFooter(`${message.guild.name} | Made by Foaf#0001`)
            }

        await logchannel.send(log)
        message.channel.delete()
    }
}