const { MessageActionRow } = require("discord.js");
const { MessageButton } = require("discord.js");
const { MessageEmbed } = require("discord.js")
const db = require("croxydb")

module.exports = {
    name:"davet",
    description: 'Botumuzu sunucunuza ekleyerek bizlere destek olabilirsiniz.',
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
          
        const embed = new MessageEmbed()
        .setTitle("Botumuzu sunucunuza davet edin!")
        .setThumbnail(interaction.member.user.avatarURL({dynamic: true, size: 2048}))
        .setAuthor({ name: client.user.username ,iconURL: client.user.avatarURL({dynamic:true})})
        .setURL("https://discordapp.com/oauth2/authorize?client_id=1058435671414538421&permissions=1074120776&scope=bot")
        .setDescription(`Botumuzu **yönetici** yetkisi ile davet etmek için [tıklayın](https://discordapp.com/oauth2/authorize?client_id=1058435671414538421&permissions=1074120776&scope=bot)
        Botumuzu **yetkisiz** şekilde davet etmek için [tıklayın](https://discordapp.com/oauth2/authorize?client_id=1058435671414538421&permissions=1074120776&scope=bot)
        
        \`Not:\` **Yetkisiz şekilde davet etmek bazen sıkıntılar yaratabilir. Yönetici yetkisi ile davet etmeniz şiddetle tavsiye edilir!**`)
        .setColor("BLUE")
        .setFooter({text: "Kardoxa 💖"})
        .setTimestamp()
        interaction.reply({embeds:[embed]})
        


        
        
    }
}