const Discord = require('discord.js');
const config = require('../../config.js');

module.exports = {
    name: "add",
    description: "Adds a user to the ticket.",
    run: (client, message, args) => {
        if (message.deletable) message.delete();

        if (!message.member.roles.cache.some(r => [config.supportTeamID, config.ticketOverwatch, config.adminID].includes(r.id)))
            return message.reply("You do not have permisson to use this command.");
        if (message.channel.parentID !== config.ticketCategory) return message.reply('You may only use Ticket Commands in active Report Tickets');

        let everyoneid = message.guild.roles.everyone.id;

        const usertoadd = message.mentions.users.first();
        if (!usertoadd) return message.reply('Please mention who to add to the ticket.');

        const embed = new Discord.MessageEmbed()
            .setTitle(`User Added`)
            .setColor('#e93020')
            .setDescription(`${message.author} You have added ${usertoadd} to the ticket`)
        if (config.logoEnabled === true) {
            embed.setFooter(`${message.guild.name} | Made by Foaf#0001`, config.logoURL)
        } else {
            embed.setFooter(`${message.guild.name} | Made by Foaf#0001`)
        }

        message.channel.updateOverwrite(usertoadd, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
            READ_MESSAGE_HISTORY: true
        });
        
        message.channel.send(embed)
    }
}