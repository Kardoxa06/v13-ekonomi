const { MessageActionRow } = require("discord.js");
const { MessageButton } = require("discord.js");
const { MessageEmbed } = require("discord.js")
const db = require("croxydb")

module.exports = {
    name:"bakiye-düzenle",
    description: 'Kardoxa özel komut.',
    type:'CHAT_INPUT',
    category:"action",
    options: [
        {
            name:"işlem",
            description:"Yapılacak işlemi seçin.",
            type:3,
            required:true,
            choices: [
                {
                    name: "Çıkart",
                    value: "ç"
                },
                {
                    name: "Ekle",
                    value: "e"
                },
                {
                    name: "Sıfırla",
                    value: "s"
                },
            ]
        },
        {
            name:"kullanıcı",
            description:"Bakiyesi düzenlenecek kullanıcıyı seçin.",
            type:6,
            required:false
        },
        {
            name:"miktar",
            description:"Eklenecek veya çıkartılacak miktarı girin.",
            type:3,
            required:false
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
          const member = interaction.options.getMember("kullanıcı") || interaction.member
          const secim = interaction.options.getString("işlem")
          const miktar = interaction.options.getString("miktar")
          const membak = db.fetch(`bakiye_${member.id}`)
        
          // <:icon_tic:1035295531297148978> 
          // <:icon_x:1035295501135904838> 

        
        if(secim == "e"){
            if(!miktar){
                const x = new MessageEmbed()
                .setTitle("Hata!")
                .setDescription(`<:icon_x:1035295501135904838> Bakiye ekleme işlemi yapmak için **miktar** belirtmelisiniz!`)
                .setColor("RED")
                .setFooter({text: "Kardoxa 💖"})
                .setTimestamp()
                interaction.reply({embeds: [x], ephemeral: false})
                return
            }
            db.add(`bakiye_${member.id}`, miktar)
            const x = new MessageEmbed()
            .setTitle("Başarılı!")
            .setDescription(`<:icon_tic:1035295531297148978> Kullanıcının (${member}) bakiyesine **${miktar}** <:kardoxacash:1059035542970445824>  eklendi!`)
            .setColor("GREEN")
            .setFooter({text: "Kardoxa 💖"})
            .setTimestamp()
            interaction.reply({embeds: [x], ephemeral: false})
        }
        if(secim == "ç"){
            if(!miktar){
                const x = new MessageEmbed()
                .setTitle("Hata!")
                .setDescription(`<:icon_x:1035295501135904838> Bakiye çıkartma işlemi yapmak için **miktar** belirtmelisiniz!`)
                .setColor("RED")
                .setFooter({text: "Kardoxa 💖"})
                .setTimestamp()
                interaction.reply({embeds: [x], ephemeral: false})
                return
            }
            if(miktar >= membak){
                const x = new MessageEmbed()
                .setTitle("Hata!")
                .setDescription(`<:icon_x:1035295501135904838> Belirttiğiniz miktar kullanıcının bakiyesine **eşit** veya daha **yüksek**! Kullanıcının bakiyesini sıfırlamak için **sıfırla** seçeneğini kullanabilirsiniz.`)
                .setColor("RED")
                .setFooter({text: "Kardoxa 💖"})
                .setTimestamp()
                interaction.reply({embeds: [x], ephemeral: false})
                return
            }
            db.add(`bakiye_${member.id}`, -miktar)
            const x = new MessageEmbed()
            .setTitle("Başarılı!")
            .setDescription(`<:icon_tic:1035295531297148978> Kullanıcının (${member}) bakiyesinden **${miktar}** <:kardoxacash:1059035542970445824>  çıkartıldı!`)
            .setColor("GREEN")
            .setFooter({text: "Kardoxa 💖"})
            .setTimestamp()
            interaction.reply({embeds: [x], ephemeral: false})

        }
        if(secim == "s"){
            db.set(`bakiye_${member.id}`, "0")
            const x = new MessageEmbed()
            .setTitle("Başarılı!")
            .setDescription(`<:icon_tic:1035295531297148978> Kullanıcının (${member}) bakiyesi sıfırlandı!`)
            .setColor("GREEN")
            .setFooter({text: "Kardoxa 💖"})
            .setTimestamp()
            interaction.reply({embeds: [x], ephemeral: false})

        }
        


        
        
    }
}