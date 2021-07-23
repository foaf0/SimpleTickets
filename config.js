/*
 ____   ___ _____     ____             __ _                       _   _                 
| __ ) / _ \_   _|   / ___|___  _ __  / _(_) __ _ _   _ _ __ __ _| |_(_) ___  _ __  ___ 
|  _ \| | | || |    | |   / _ \| '_ \| |_| |/ _` | | | | '__/ _` | __| |/ _ \| '_ \/ __|
| |_) | |_| || |    | |__| (_) | | | |  _| | (_| | |_| | | | (_| | |_| | (_) | | | \__ \
|____/ \___/ |_|     \____\___/|_| |_|_| |_|\__, |\__,_|_|  \__,_|\__|_|\___/|_| |_|___/
                                            |___/                                       
                                            
*/

module.exports = {

        token: "", // Required | Bot Token, See: https://discord.com/developers/applications
        prefix: "!", // Required | Prefix to use to run commands

        adminID: "", // Required | Admin Role ID
        ticketOverwatch: "", // Required | Role ID of role that will overwatch tickets
        supportTeam: "", // Required | Ticket Support Team Role ID
        ticketCategory: "", // Required | ID of Category where tickets are created
        ticketLogs: "", // Required | ID of Channel where tickets are logged to

        embedTitle: "Server Name Tickets", // Required | Title of the embed where users open tickets

        logoEnabled: true,
        logoURL: "https://cdn.discordapp.com/attachments/853389464277876747/867948408298696745/512x512.png", // Optional | Link to logo if you leave this blank make sure "logoEnabled" is false

}