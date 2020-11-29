const Discord = require('discord.js');
const client = new Discord.Client();

if (!(process.env.NODE_ENV === "production")) {
    require('dotenv').config();
}

const WH_CB_ID = process.env.WEBHOOK_CONFESSIONBOT_CLIENT_ID;
const WH_CB_T = process.env.WEBHOOK_CONFESSIONBOT_CLIENT_TOKEN;
const webhookClient = new Discord.WebhookClient(WH_CB_ID, WH_CB_T);

function newConfession(userName, userColor, base_url, code, maintext, sign) {
    const embed = new Discord.MessageEmbed()
    .setTitle(`${sign} just posted a new confession`)
    .setDescription(`${maintext} [read more](${base_url}/posts/${code})`)
	.setImage(`${base_url}/img/thumb/${code}`)
    .setColor(userColor);
    
    webhookClient.send('', {
        username: userName,
        avatarURL: `https://robohash.org/${userName}?set=set2&bgset=bg2`,
        embeds: [embed],
    });
}

module.exports = newConfession;