const Discord = require('discord.js');
const CASES = require('@Database/cases');
const SERVERS = require('@Database/servers');
const CLOCK = require('@Database/clock');
const moment = require('moment');
const fetch = require('node-fetch');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

const BotLists = require('@Settings/botlists');

module.exports.run = async (client, message, args, params) => {

    try {

        let guilds = await client.shard.broadcastEval('this.guilds.cache.size').then(x => x.reduce((a, b) => b + a));
        let users =  await client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)').then(x => x.reduce((a, b) => b + a));
        let channels = await client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.channels.cache.size, 0)').then(x => x.reduce((a, b) => b + a));

        let embed = new Discord.MessageEmbed()
         .setAuthor('Tox Mod Statistics', client.user.displayAvatarURL({ dynamic: true }))
         .setColor(Colors.Secondary)
         .setThumbnail(client.user.displayAvatarURL({ dynamic: true}))
         .setDescription('Some kinda useful info')
         .addField('Created On', `${moment(client.user.createdAt).format("MM/DD/YYYY HH:mm:ss A")}`, true)
         .addField('Bot Owner', `[Toxic Dev](https://discordapp.com/users/510065483693817867)`, true)
         .addField('Bot Version', '``v2.0.0-Beta``', true)
         .addField('Discord.js', ```v${Discord.version}```, true)
         .addField('Ping/Latency', ```${client.ws.ping}ms```, true)
         .addField('Made Using', 'Node, Javascript, EJS', true)
         .addField('Total Guilds', ```${guilds}```, true)
         .addField('Total Users', ```${users}```, true)
         .addField('Total Channels', ```${channels}```, true)
         .addField('Total Shards', ```${client.shard.count}```, true)
         .addField('Total Commands', ```${client.commands.size}```, true)
         .addField('Useful Links', `[Dashboard](https://toxmod.xyz/dashboard) | [Support](https://toxmod.xyz/discord) | [Docs](https://docs.toxmod.xyz)`, true)
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

         return message.channel.send(embed);


    } catch (err) {

        let ErrorEmbed = new Discord.MessageEmbed()
         .setTitle('Internal Error | Hmmm')
         .setColor(Colors.Error)
         .setDescription('Something went wrong here, Please try again or Contact my Dev Team.')
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

        return message.channel.send(ErrorEmbed);
    }
}

module.exports.help = {
    name: 'stats',
    category: 'info',
    aliases: ['bi', 'bs', 'statistics'],
    description: 'View some Statistics for Tox Mod',
    example: '``stats``'
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ["EMBED_LINKS"],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}