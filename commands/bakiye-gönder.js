const { MessageActionRow } = require("discord.js");
const { MessageButton } = require("discord.js");
const { MessageEmbed } = require("discord.js")
const db = require("croxydb")

module.exports = {
    name:"bakiye-gönder",
    description: 'Bir başka kullanıcıya bakiye gönderebilirsiniz.',
    type:'CHAT_INPUT',
    category:"action",
    options: [
        {
            name:"kullanıcı",
            description:"Bakiye göndermek istediğiniz kullanıcıyı seçin.",
            type:6,
            required:true
        },
        {
            name:"miktar",
            description:"Göndermek istediğiniz miktarı girin.",
            type:4,
            required:true
        },
    ],
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

          
          const member = interaction.options.getMember("kullanıcı") 
          const miktar = interaction.options.getInteger("miktar")
        
          // <:icon_tic:1035295531297148978> 
          // <:icon_x:1035295501135904838> 

        if(miktar > db.fetch(`bakiye_${interaction.member.id}`)){
            const xd = new MessageEmbed()
            .setTitle("Banka!")
            .setThumbnail(member.user.avatarURL({dynamic: true, size: 2048}))
            .setDescription(`Maalesef göndermek istediğin miktar (**${miktar}**) kadar bakiyeye (**${db.fetch(`bakiye_${interaction.member.id}`)}**) sahip değilsin!`)
            .setColor("RED")
            .setFooter({text: "Kardoxa 💖"})
            .setTimestamp()
            interaction.reply({embeds: [xd], ephemeral: false})
            return
        }
        if(member == interaction.member){
            const xd = new MessageEmbed()
            .setTitle("Banka!")
            .setThumbnail(member.user.avatarURL({dynamic: true, size: 2048}))
            .setDescription(`Maalesef kendinize bakiye gönderecek kadar yalnız olmadığını düşünüyoruz! Bu yüzden işlem iptal edildi`)
            .setColor("RED")
            .setFooter({text: "Kardoxa 💖"})
            .setTimestamp()
            interaction.reply({embeds: [xd], ephemeral: false})
            return
        }


        db.add(`bakiye_${member.id}`, miktar)
        if(db.fetch(`bakiye_${interaction.member.id}`) == `${miktar}`) db.set(`bakiye_${interaction.member.id}`, "0")
        if(db.fetch(`bakiye_${interaction.member.id}`) < `${miktar}`) db.add(`bakiye_${interaction.member.id}`, -miktar)
        const embed = new MessageEmbed()
        .setTitle("Banka!")
        .setThumbnail(member.user.avatarURL({dynamic: true, size: 2048}))
        .setDescription(`${member} kullanıcısına ${miktar} <:kardoxacash:1059035542970445824> gönderildi!
        Güncel bakiyeniz: **${db.fetch(`bakiye_${interaction.member.id}`)}** <:kardoxacash:1059035542970445824>`)
        .setColor("GREEN")
        .setFooter({text: "Kardoxa 💖"})
        .setTimestamp()
        interaction.reply({embeds:[embed]})
        


        
        
    }
}