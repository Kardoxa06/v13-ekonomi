const { MessageActionRow } = require("discord.js");
const { MessageButton } = require("discord.js");
const { MessageEmbed } = require("discord.js")
const db = require("croxydb")
const ms = require("ms");
const moment = require("moment");
moment.locale('tr');
require('moment-duration-format');

module.exports = {
    name:"günlüködül",
    description: 'Belirli bir miktarda günlük ödülünüzü alırsınız.',
    type:'CHAT_INPUT',
    category:"action",
    options: [],
    run: async (client, interaction) => {
        if(interaction.channel == null){
            const yetkinyok = new MessageEmbed()
            .setTitle("Hata!")
            .setDescription(`<:icon_x:1035295501135904838> Komutları DM üzerinde kullanamazsınız!`)
            .setColor("BLACK")
            .setFooter({text: "Kardoxa 💖"})
            .setTimestamp()
            interaction.reply({embeds: [yetkinyok], ephemeral: false})
            return
          }

          

          const member = interaction.member
        
          // <:icon_tic:1035295531297148978> 
          // <:icon_x:1035295501135904838> 

        if(db.fetch(`gunluk_${interaction.member.id}`)){
            const x = db.fetch(`gunluk_${member.id}`) - Date()
            const kalan = moment.duration(db.fetch(`gunluk_${member.id}`)-Date.now()).format("HH:mm").split(":")
            const xd = new MessageEmbed()
            .setTitle("Banka!")
            .setThumbnail(member.user.avatarURL({dynamic: true, size: 2048}))
            .setDescription(`Maalesef günlük ödülünüzü zaten almışsınız. Tekrar almanız için **${kalan[0]} saat ${kalan[1]} dakika** süresince beklemeniz gerek!`)
            .setColor("RED")
            .setFooter({text: "Kardoxa 💖"})
            .setTimestamp()
            interaction.reply({embeds: [xd], ephemeral: false})
            return
        }


        db.add(`bakiye_${member.id}`, 250)
        db.set(`gunluk_${member.id}`, Date.now()+require('ms')('24h'))
        const embed = new MessageEmbed()
        .setTitle("Banka!")
        .setThumbnail(member.user.avatarURL({dynamic: true, size: 2048}))
        .setDescription(`Günlük ödülünüzü aldınız. **250 <:kardoxacash:1059035542970445824>** hesabınıza eklendi!
        Güncel bakiyeniz: **${db.fetch(`bakiye_${interaction.member.id}`)}** <:kardoxacash:1059035542970445824>`) 
        .setColor("GREEN")
        .setFooter({text: "Kardoxa 💖"})
        .setTimestamp()
        interaction.reply({embeds:[embed]})

        setTimeout(() => {
            db.delete(`gunluk_${member.id}`)
        }, ms("24h"));
        


        
        
    }
}