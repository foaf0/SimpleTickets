const config = require('./config');
const Discord = require('discord.js');
const {
    Client,
    Collection
} = require("discord.js");
const client = new Client({
    intents: ['GUILDS', 'GUILD_MESSAGES']
});
const disbut = require('discord-buttons');
disbut(client);

client.commands = new Collection();
client.aliases = new Collection();
["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

// Starting System
client.on("ready", () => {
    console.log(`Logged in as "${client.user.username}", System Starting!`);
    console.log(`
  __        ____            
 (  '_    /_ /  '_ / _ _/ _ 
__)///)/)((-(  /( /((- /_)  
      /     
      Made by: Foaf#0001                
        `)
    console.log(`System Started, Have Fun!`);
});

// Checks for New Tickets
client.on('clickButton', async (button) => {
    button.reply.defer()
    if (button.id == 'gKwBvQhLvW') {
        const user = await button.guild.members.cache.get(button.clicker.user.id);
        const everyoneid = button.guild.roles.everyone.id;
        const creator = user.user;

        button.guild.channels.create(`ticket-${creator.username}`, {
            parent: config.ticketCategory,
            permissionOverwrites: [{
                    id: config.supportTeam,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                },
                {
                    id: config.adminID,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "MANAGE_MESSAGES", "MANAGE_CHANNELS", "MANAGE_ROLES"]
                },
                {
                    id: config.ticketOverwatch,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "MANAGE_MESSAGES", "MANAGE_CHANNELS", "MANAGE_ROLES"]
                },
                {
                    id: creator.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                },
                {
                    id: everyoneid,
                    deny: ["VIEW_CHANNEL"]
                }
            ],
            type: 'text'
        }).then(async channel => {

            const ticketChannel = channel

            const ticketEmbed = new Discord.MessageEmbed()
                .setColor('#e93020')
                .setTitle(`${creator.username}'s Ticket`)
                .setDescription(`<@${creator.id}> Thanks for creating a ticket, somone will be with you shortly.`)
            if (config.logoEnabled === true) {
                ticketEmbed.setFooter(`${button.guild.name} | Made by Foaf#0001`, config.logoURL)
            } else {
                ticketEmbed.setFooter(`${button.guild.name} | Made by Foaf#0001`)
            }

            ticketChannel.send(ticketEmbed)
            ticketChannel.send(`<@${creator.id}><@${config.supportTeamID}>`).then(m => m.delete({
                timeout: 50
            }))
        })
    }
})

// Command Handler
client.on("message", async message => {
    if (message.author.bot) return;

    const prefix = `${config.prefix}`;

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command)
        command.run(client, message, args);
});

// Logging into the BOT
client.login(config.token);