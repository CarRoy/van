const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
  let helpEmbed = new Discord.RichEmbed()
    .setDescription("Help")
    .setColor("#7289DA")
    .addField("Moderation Commands", "**warn** - `!warn @mention [reason]`\n**warnlevel** - `!warnlevel @mention`\n**tempmute** - `!tempmute @mention [time]`\n**kick** - `!kick @mention [reason]`\n**ban** - `!ban @mention [reason]`\n**addrole** - `!addrole @mention @role`\n**removerole** - `!removerole @mention @role`\n**report** - `!report @mention [reason]`")
    .addField("Fun Commands", "**reddit** - `!reddit [subreddit]`\n**ping** - `!ping`\n**hug** - `!hug @mention`\n**reply** - `!reply`\n**avatar** - `!avatar`")
    .setFooter("Van | Don't use [] in commands. | Requested by: " + msg.author.username);

  msg.channel.send(helpEmbed)
}

module.exports.help = {
  name:"help"
}
