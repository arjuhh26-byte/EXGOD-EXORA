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
  content: `:📸 *Registration Verification Process*

To ensure a fair and secure registration process, all participants are required to complete the following verification steps and submit valid screenshots as proof.

1️⃣ *Follow Our Instagram Partner Page*

Follow the Instagram page below and upload a screenshot showing that you have successfully followed the account.

https://www.instagram.com/simplebrandpromotors/

2️⃣ *Subscribe to Our YouTube Channel*

Subscribe to the YouTube channel below and upload a screenshot confirming your subscription.

https://youtube.com/@gamerblack-yt

3️⃣ *Join Our Official WhatsApp Group*

Join the WhatsApp group through the link below and upload a screenshot showing that you have joined successfully.

https://chat.whatsapp.com/KchuW8Qn925EVnLHkw7h1P

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