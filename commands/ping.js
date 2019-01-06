const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
  const ping = Math.round(client.ping);
  msg.channel.send(ping + "ms :ping_pong:")
  }

module.exports.help = {
  name: "ping"  
}
