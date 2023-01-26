const { MessageActionRow } = require("discord.js");
const { MessageButton } = require("discord.js");
const { MessageEmbed } = require("discord.js")
const db = require("croxydb")

module.exports = {
    name:"kod-kullan",
    description: 'Size verilen özel bakiye kodunu kullanabilirsiniz.',
    type:'CHAT_INPUT',
    category:"action",
    options: [
        {
            name:"kod",
            description:"Size verilen özel bakiye kodunu girin.",
            type:3,
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

          const kod = interaction.options.getString("kod")
        
          // <:icon_tic:1035295531297148978> 
          // <:icon_x:1035295501135904838> 

        
        if(!db.fetch(`${kod}`)){
            const xd = new MessageEmbed()
            .setTitle("Hata!")
            .setDescription(`<:icon_x:1035295501135904838> Belirttiğin kod (**${kod}**) eksik veya yanlış! Lütfen kodu kontrol et!`)
            .setColor("RED")
            .setFooter({text: "Kardoxa 💖"})
            .setTimestamp()
            interaction.reply({embeds: [xd], ephemeral: false})
            return
        }
        miktar = db.fetch(`${kod}`)
        db.add(`bakiye_${interaction.member.user.id}`, miktar)
        db.delete(`${kod}`)

        const embed = new MessageEmbed()
        .setTitle("Başarılı!")
        .setColor("GREEN")
        .setTimestamp()
        .setFooter({text: "Kardoxa 💖"})
        .setDescription(`<:icon_tic:1035295531297148978> **${miktar}** <:kardoxacash:1059035542970445824> değerinde kod (**${kod}**) kullanımınız başarılı! **${miktar}** <:kardoxacoin:1058663115451015218> başarıyla hesabınıza eklendi!`)
        interaction.reply({embeds:[embed]})
        


        
        
    }
}