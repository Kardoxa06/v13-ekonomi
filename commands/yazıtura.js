const { MessageActionRow } = require("discord.js");
const { MessageButton } = require("discord.js");
const { MessageEmbed } = require("discord.js")
const db = require("croxydb");
const bakiye = require("./bakiye");

module.exports = {
    name:"yazıtura",
    description: 'Belirttiğiniz miktar ile yazı tura oyunu oynarsınız.',
    type:'CHAT_INPUT',
    category:"action",
    options: [
        {
            name:"seçim",
            description:"Oynamak istediğiniz tarafı seçin (yazı/tura).",
            type:3,
            choices:[
                {
                    name: "Yazı",
                    value: "y"
                },
                {
                    name: "Tura",
                    value: "t"
                },
            ],
            required:true
        },
        {
            name:"miktar",
            description:"Oynamak istediğiniz miktarı girin.",
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

          const miktar = interaction.options.getInteger("miktar")
          const member = interaction.member 
          

        
        if(miktar > 50000){
            const xd = new MessageEmbed()
            .setTitle("Banka!")
            .setThumbnail(member.user.avatarURL({dynamic: true, size: 2048}))
            .setDescription(`Maalesef belirttiğiniz miktar (**${miktar}**) maksimum oyun limitini (**50.000** <:kardoxacash:1059035542970445824> ) aştığı için oynayamadınız! `)
            .setColor("RED")
            .setFooter({text: "Kardoxa 💖"})
            .setTimestamp()
            interaction.reply({embeds: [xd], ephemeral: false})
            return
        }
        const bakiye = db.fetch(`bakiye_${member.id}`) || "0"

        if(miktar > bakiye || !bakiye){
            const xd = new MessageEmbed()
            .setTitle("Banka!")
            .setThumbnail(member.user.avatarURL({dynamic: true, size: 2048}))
            .setDescription(`Maalesef belirttiğiniz miktar (**${miktar}**) bakiyenizden (**${bakiye}** <:kardoxacash:1059035542970445824> ) fazla olduğu için oynayamadınız! `)
            .setColor("RED")
            .setFooter({text: "Kardoxa 💖"})
            .setTimestamp()
            interaction.reply({embeds: [xd], ephemeral: false})
            return
        }
        if(bakiye == miktar) db.set(`bakiye_${member.id}`, "0")
        if(bakiye > miktar) db.add(`bakiye_${member.id}`, -miktar)
        const iddia = ["1","1","2","1","2","1","2","2","2"]
        const sonuc = iddia[Math.floor(Math.random()*iddia.length)]
        const secim = interaction.options.getString("seçim")
        cvp = " "
        cvpters = " "
        if(secim == "y") cvp = "<:kardoxacoin:1058663115451015218> (yazı)" 
        if(secim == "y") cvpters = "<:kardoxacoin2:1058875411267862548> (tura)"
        if(secim == "t") cvp = "<:kardoxacoin2:1058875411267862548> (tura)"
        if(secim == "t") cvpters = "<:kardoxacoin:1058663115451015218> (yazı)"

        if(sonuc == "2"){
            const xd = new MessageEmbed()
            .setTitle("Banka!")
            .setThumbnail(member.user.avatarURL({dynamic: true, size: 2048}))
            .setDescription(`Maalesef.. Yazı tura attın ve ${cvpters} geldi **${miktar}** <:kardoxacash:1059035542970445824>  kaybettin.`)
            .setColor("RED")
            .setFooter({text: "Kardoxa 💖"})
            .setTimestamp()
            interaction.reply({embeds: [xd], ephemeral: false})
        }
        if(sonuc == "1"){
            const xd = new MessageEmbed()
            .setTitle("Banka!")
            .setThumbnail(member.user.avatarURL({dynamic: true, size: 2048}))
            .setDescription(`Tebrikler! Yazı tura attın ve ${cvp} geldi **${miktar*2}** <:kardoxacash:1059035542970445824> kazandın.`)
            .setColor("GREEN")
            .setFooter({text: "Kardoxa 💖"})
            .setTimestamp()
            interaction.reply({embeds: [xd], ephemeral: false})
            db.add(`bakiye_${member.id}`, miktar*2)
        }
        

        
        


        
        
    }
}