import {
  ChannelType,
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} from "discord.js";

import { db } from "../../utils/database.js";
export default {
  name: "register_modal",

  async execute(interaction) {

    const ingameName =
      interaction.fields.getTextInputValue("ingame_name");

    const phoneNumber =
      interaction.fields.getTextInputValue("phone_number");
      const registrations = await db.list("registration:");

for (const key of registrations) {
  const data = await db.get(key);

  if (
    data?.discordId === interaction.user.id &&
    data?.status === "approved"
  ) {
    return interaction.reply({
      content: `❌ You are already registered.

🎟 Slot Number: ${data.slot}`,
      ephemeral: true
    });
  }
}

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
const row = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId("approve_registration")
      .setLabel("Approve")
      .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
      .setCustomId("reject_registration")
      .setLabel("Reject")
      .setStyle(ButtonStyle.Danger)
  );

await db.set(
  `registration:${registrationChannel.id}`,
  {
    ingameName,
    phoneNumber,
    discordId: interaction.user.id,
    status: "pending",
    slot: null
  }
);

await registrationChannel.send({
  content: `:camera_with_flash: **Upload Required**

• YouTube Subscription Screenshot
• EXGOD Instagram Follow Screenshot
• Partner Follow Screenshot

━━━━━━━━━━━━━━

:video_game: Ingame Name: ${ingameName}
:mobile_phone: Phone Number: ${phoneNumber}

:bust_in_silhouette: Discord: ${interaction.user}

:yellow_circle: Status: Pending Review`,
  components: [row]
});

await interaction.reply({
  content: `:white_check_mark: Registration Submitted

Your review channel has been created:

${registrationChannel}`,
  ephemeral: true
});

  }
};