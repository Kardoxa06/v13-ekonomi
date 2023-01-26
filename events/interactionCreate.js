const {CLient, CommandInteraction} = require("discord.js");
const fs = require("fs");

/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
module.exports = (client, interaction) => {
    if (interaction.isCommand()){
    try {
      fs.readdir("./commands/", (err, files) => {
        if (err) throw err;

        files.forEach(async (f) => {
          const command = require(`../commands/${f}`);
          if (
            interaction.commandName.toLowerCase() === command.name.toLowerCase()
          ) {
            return command.run(client, interaction);
          }
        });
      });
    } catch (err) {
      console.error(err);
    }
  }
    if (interaction.isContextMenu()){
      try {
        fs.readdir("./menu/", (err, files) => {
          if (err) throw err;
  
          files.forEach(async (f) => {
            const command = require(`../menu/${f}`);
            if (
              interaction.commandName.toLowerCase() === command.name.toLowerCase()
            ) {
              return command.run(interaction);
            }
          });
        });
      } catch (err) {
        console.error(err);
      }
    }
};