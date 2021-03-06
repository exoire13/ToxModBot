const { MessageEmbed } = require('discord.js');
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

        let user = args.slice(0).join(" ");

        let member = message.mentions.users.first() || client.users.cache.get(user) || client.users.cache.find(u => u.username === user);

        if (!member) member = message.author;

        CASES.find({ userID: member.id }, (err, res) => {

            if (res.length === 0) {

                let PositiveTrust = new MessageEmbed()
                 .setTitle('User Trust/Reputation Score!')
                 .setColor(Colors.Primary)
                 .setDescription(`${member} is 100% safe with 0 active cases/infractions!`)
                 .setTimestamp()
                 .setFooter(Embeds.Footer, Images.Animated)

                return message.channel.send(PositiveTrust)
            
            } else {

                let perc = 100 - (res.length + 5);

                if (perc === 0) {

                    perc = 0;
                }
                
                let NegativeTrust = new MessageEmbed()
                 .setTitle('User Trust/Reputation Score!')
                 .setColor(Colors.Error)
                 .setDescription(`${member} is ${perc} safe with  ${res.length} active cases/infractions!`)
                 .setTimestamp()
                 .setFooter(Embeds.Footer, Images.Animated)

                return message.channel.send(NegativeTrust)
            }
        })   
    } catch (err) {

        let ErrorEmbed = new MessageEmbed()
         .setTitle('Internal Error | Hmmm')
         .setColor(Colors.Error)
         .setDescription('Something went wrong here, Please try again or Contact my Dev Team.')
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

          console.log(err);

        return message.channel.send(ErrorEmbed);

    }
}

module.exports.help = {
    name: 'reputation',
    category: 'rep',
    aliases: ['viewrep', 'rep', 'safe', 'safe-check'],
    description: 'Check a Users Trust Score based on their amount of Global Cases/Infractions.',
    example: '``reputation <@User>``'
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ['EMBED_LINKS', 'SEND_MESSAGES'],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
