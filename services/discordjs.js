const Discord = require('discord.js');
const client = new Discord.Client();

if (!(process.env.NODE_ENV === "production")) {
    require('dotenv').config();
}

const WH_CB_ID = process.env.WEBHOOK_CONFESSIONBOT_CLIENT_ID;
const WH_CB_T = process.env.WEBHOOK_CONFESSIONBOT_CLIENT_TOKEN;
const webhookClient = new Discord.WebhookClient(WH_CB_ID, WH_CB_T);

function newConfession(userName, userColor, image, url) {

    var data = image.split(',')[1]; 
    var buf = new Buffer.from(data)//.toString('base64');
    const file = new Discord.MessageAttachment(buf, 'img.jpeg');
    const embed = new Discord.MessageEmbed()
	.setImage('attachment://img.jpeg')
    .setColor(userColor)
    .setURL(url);
    
    webhookClient.send('', {
        username: userName,
        embeds: [embed],
    });
}

module.exports = newConfession;
