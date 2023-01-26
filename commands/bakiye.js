const { MessageActionRow } = require("discord.js");
const { MessageButton } = require("discord.js");
const { MessageEmbed } = require("discord.js")
const db = require("croxydb")

module.exports = {
    name:"bakiye",
    description: 'Bakiyenizi veya başka bir kullanıcının bakiyesini görüntüleyin.',
    type:'CHAT_INPUT',
    category:"action",
    options: [
        {
            name:"kullanıcı",
            description:"Bakiyesini görüntülemek istediğiniz kullanıcıyı seçin.",
            type:6,
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

          
          const member = interaction.options.getMember("kullanıcı") || interaction.member
        
          // <:icon_tic:1035295531297148978> 
          // <:icon_x:1035295501135904838> 

        
        if(!db.fetch(`bakiye_${member.id}`)){
            const xd = new MessageEmbed()
            .setTitle("Banka!")
            .setThumbnail(member.user.avatarURL({dynamic: true, size: 2048}))
            .setDescription(`${member} kullanıcısının bakiyesi: **0** <:kardoxacash:1059035542970445824> !`)
            .setColor("BLUE")
            .setFooter({text: "Kardoxa 💖"})
            .setTimestamp()
            interaction.reply({embeds: [xd], ephemeral: false})
            return
        }
        bakiye = db.fetch(`bakiye_${member.id}`)

        const embed = new MessageEmbed()
        .setTitle("Banka!")
        .setThumbnail(member.user.avatarURL({dynamic: true, size: 2048}))
        .setDescription(`${member} kullanıcısının bakiyesi: **${bakiye}** <:kardoxacash:1059035542970445824> !`)
        .setColor("BLUE")
        .setFooter({text: "Kardoxa 💖"})
        .setTimestamp()
        interaction.reply({embeds:[embed]})
        


        
        
    }
}