import {
  ChannelType,
  PermissionFlagsBits
} from "discord.js";

export default {
  name: "register_modal",

  async execute(interaction) {

    const ingameName =
      interaction.fields.getTextInputValue("ingame_name");

    const phoneNumber =
      interaction.fields.getTextInputValue("phone_number");

    const channelName = `registration-${ingameName}`
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-");

    const registrationChannel =
      await interaction.guild.channels.create({
        name: channelName,
        type: ChannelType.GuildText,
        parent: process.env.REGISTRATION_CATEGORY_ID,

        permissionOverwrites: [
          {
            id: interaction.guild.roles.everyone.id,
            deny: [PermissionFlagsBits.ViewChannel]
          },
          {
            id: interaction.user.id,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.ReadMessageHistory
            ]
          },
          {
            id: process.env.EFOOTBALL_ADMIN_ROLE_ID,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.ManageChannels,
              PermissionFlagsBits.ReadMessageHistory
            ]
          }
        ]
      });

    await registrationChannel.send({
      content:
`📸 **Upload Required**

• YouTube Subscription Screenshot
• EXGOD Instagram Follow Screenshot
• Partner Follow Screenshot

━━━━━━━━━━━━━━

🎮 Ingame Name: ${ingameName}
📱 Phone Number: ${phoneNumber}

👤 Discord: ${interaction.user}

🟡 Status: Pending Review`
    });

    await interaction.reply({
      content:
`✅ Registration Submitted

Your review channel has been created:

${registrationChannel}`,
      ephemeral: true
    });
  }
};