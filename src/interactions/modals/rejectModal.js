import { db } from "../../utils/database.js";

export default {
  name: "reject_modal",

  async execute(interaction) {

if (
  !interaction.member.permissions.has(
    PermissionFlagsBits.Administrator
  )
) {
  return interaction.reply({
    content: "❌ You don't have permission to use this button.",
    ephemeral: true
  });
}

    const reason =
      interaction.fields.getTextInputValue(
        "reject_reason"
      );

    const registration = await db.get(
      `registration:${interaction.channel.id}`
    );

    if (!registration) {
      return interaction.reply({
        content: "❌ Registration data not found.",
        ephemeral: true
      });
    }
if (registration.status === "rejected") {
  return interaction.reply({
    content: "⚠️ This registration is already rejected.",
    ephemeral: true
  });
}
if (registration.status === "approved") {
  return interaction.reply({
    content: "⚠️ This registration is already approved.",
    ephemeral: true
  });
}
    registration.status = "rejected";
    registration.reason = reason;

    await db.set(
      `registration:${interaction.channel.id}`,
      registration
    );

   const user =
  await interaction.client.users.fetch(
    registration.discordId
  );

await user.send(
  `❌ Registration Rejected\n\nReason:\n${reason}`
);
const logChannel =
  await interaction.client.channels.fetch(
    process.env.REGISTRATION_LOG_CHANNEL_ID
  );

await logChannel.send(
  `❌ **REGISTRATION REJECTED**

👤 User: <@${registration.discordId}>
🎮 Ingame Name: ${registration.ingameName}
📱 Phone: ${registration.phoneNumber}

📝 Reason:
${reason}

🛡 Rejected By: ${interaction.user}`
);
await interaction.reply({
  content: `❌ Registration Rejected\n\nReason:\n${reason}\n\n🗑️ Channel will be deleted in 10 seconds.`,
  ephemeral: true
});

setTimeout(async () => {
  try {
    await interaction.channel.delete();
  } catch (err) {
    console.error(err);
  }
}, 10000);

  }
};