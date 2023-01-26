module.exports = (client, interaction) => {
    console.log(`[${client.user.tag}] Giriş Yapıldı!`);
    client.user.setPresence({activities: [{name:"Kardoxa 💗 Aboneler", type: "LISTENING"}], status:"dnd"});   
};