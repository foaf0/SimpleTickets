const Discord = require('discord.js');
const config = require('../../config');
const disbut = require('discord-buttons');

module.exports = {
    name: "setup",
    description: "Sets up the Create a Ticket Embed!",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();

        if (!message.member.roles.cache.some(r => [config.adminID].includes(r.id)))
            return message.reply("You need the Admin Role to use this command!").then(m => m.delete({ timeout: 5000 }));

        // Ticket Embed
        const ticketEmbed = new Discord.MessageEmbed()
            .setTitle(`${config.embedTitle}`)
            .setDescription(`\`\`\`Use the button to create a ticket!\`\`\``)
            .setColor('#FF4649')

        // Ticket Button
        const createRow = new disbut.MessageActionRow()
            createButton = new disbut.MessageButton()
                .setStyle('red')
                .setLabel('Create a Ticket')
                .setID('gKwBvQhLvW')

            createRow.addComponent(createButton)

        await message.channel.send({
            embed: ticketEmbed,
            component: createRow
        })
    }
}