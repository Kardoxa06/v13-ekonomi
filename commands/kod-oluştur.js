const { MessageActionRow } = require("discord.js");
const { MessageButton } = require("discord.js");
const { MessageEmbed } = require("discord.js")
const db = require("croxydb")

module.exports = {
    name:"kod-oluştur",
    description: 'Belirtilen miktar bakiye için bir kod oluşturur.',
    type:'CHAT_INPUT',
    category:"action",
    options: [
        {
            name:"miktar",
            description:"Kod için miktarı girin.",
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

          if(interaction.member.id !== "1017017120107806770"){
            const yetkinyok = new MessageEmbed()
            .setTitle("Hata!")
            .setDescription(`<:icon_x:1035295501135904838> Bu komutu yalnızca **Kardoxa** kullanabilir!`)
            .setColor("BLACK")
            .setFooter({text: "Kardoxa 💖"})
            .setTimestamp()
            interaction.reply({embeds: [yetkinyok], ephemeral: false})
            return
          }
          const miktar = interaction.options.getString("miktar")
        
          // <:icon_tic:1035295531297148978> 
          // <:icon_x:1035295501135904838> 

          var randomPsw = "";
            
            var character = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            var lengthPsw = 6;
            for (var i = 0; i < lengthPsw; i++) {
                var numPws = Math.floor(Math.random() * character.length);
                randomPsw += character.substring(numPws, numPws + 1);
            }

        db.set(`${randomPsw}`, miktar)
        const embed = new MessageEmbed()
        .setTitle("Başarılı!")
        .setDescription(`<:icon_tic:1035295531297148978> **${miktar}** <:kardoxacash:1059035542970445824>  değerinde kod oluşturuldu!
        **Kod:** \`${randomPsw}\``)
        .setColor("GREEN")
        .setFooter({text: "Kardoxa 💖"})
        .setTimestamp()
        interaction.reply({embeds:[embed], ephemeral:true})


        
        
    }
}