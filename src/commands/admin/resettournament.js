import {
  SlashCommandBuilder,
  PermissionFlagsBits
} from "discord.js";

import { db } from "../../utils/database.js";

export default {
  data: new SlashCommandBuilder()
    .setName("resettournament")
    .setDescription(
      "Reset all tournament registrations"
    )
    .setDefaultMemberPermissions(
      PermissionFlagsBits.Administrator
    ),

  async execute(interaction) {

    const registrations =
      await db.list("registration:");

    for (const key of registrations) {
      await db.delete(key);
    }

    await db.set(
      "efootball:slot_counter",
      0
    );
const slotChannel = await interaction.client.channels.fetch(
  process.env.SLOT_LIST_CHANNEL_ID
);

const slotMessage = await slotChannel.messages.fetch(
  process.env.SLOT_LIST_MESSAGE_ID
);

await slotMessage.edit({
  content:
    "🎟 **TOURNAMENT SLOT LIST**\n\nNo registrations yet."
});
    await interaction.reply({
      content:
        "✅ Tournament data reset successfully.\n\n• All registrations removed\n• Slot counter reset",
      ephemeral: true
    });

  }
};