const {EmbedBuilder} = require("discord.js");
const {LOGS_CHANNEL} = require("../../config.json");

module.exports = {
  name: "roleUpdate",
  async execute(oldRole, newRole) {
    const logsChannel = LOGS_CHANNEL;
    const channel = newRole.guild.channels.cache.get(logsChannel);

    if (!channel) {
      return;
    }


    //checks updates in role properties
    const updates = [];
    
    if(oldRole.name !== newRole.name){
      updates.push(`Name : "${oldRole.name}" => "${newRole.name}"`);
    }
    
    if(oldRole.hexColor !== newRole.hexColor){
      updates.push(`Color : "${oldRole.hexColor}" => "${newRole.hexColor}"`);
    }
    
    if(oldRole.hoist !== newRole.hoist){
      let oldHoist = oldRole.hoist ? 'Yes' : 'No';
      let newHoist = newRole.hoist ? 'Yes' : 'No';
      updates.push(`Hoist : ${oldHoist} => ${newHoist}`);
    }
    
    if(oldRole.mentionable !== newRole.mentionable){
      let oldMentionable = oldRole.mentionable ? 'Yes' : 'No';
      let newMentionable = newRole.mentionable ? 'Yes' : 'No';
      updates.push(`Mentionable : ${oldMentionable} => ${newMentionable}`);
    }


    //checks updates in role permissions
    if(!oldRole.permissions.equals(newRole.permissions)){
      const addedPermissions = newRole.permissions.missing(oldRole.permissions);
      const removedPermissions = oldRole.permissions.missing(newRole.permissions);

      if(addedPermissions.length > 0){
        updates.push(`Added Permissions : ${addedPermissions.join(' , ')}`);
      }
      
      if(removedPermissions.length > 0){
        updates.push(`Removed Permissions : ${removedPermissions.join(' , ')}`);
      }
    }

    
    //logs updated roles
    const logsEmbed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("🎭 Role Updated")
      .addFields({name: "Role", value: `> ${newRole}`})
      .addFields({name: "ID", value: `> ${newRole.id}`})
      .addFields({name: "Updates", value: `> ${updates.join(`\n\n> `)}`})
      .setTimestamp()
      .setFooter({text: 'Log System'})

    channel.send({embeds: [logsEmbed]});
  }
}
