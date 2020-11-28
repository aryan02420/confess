const Discord = require('discord.js');
const client = new Discord.Client();

if (!(process.env.NODE_ENV === "production")) {
    require('dotenv').config();
}

const WH_CB_ID = process.env.WEBHOOK_CONFESSIONBOT_CLIENT_ID;
const WH_CB_T = process.env.WEBHOOK_CONFESSIONBOT_CLIENT_TOKEN;
const webhookClient = new Discord.WebhookClient(WH_CB_ID, WH_CB_T);

function newConfession(userName, userColor, base_url, code) {
    const embed = new Discord.MessageEmbed()
    .setTitle('new confession')
	.setImage(`${base_url}/img/thumb/${code}`)
    .setColor(userColor)
    .setURL(`${base_url}/posts/${code}`);
    
    webhookClient.send('', {
        username: userName,
        embeds: [embed],
    });
}

module.exports = newConfession;