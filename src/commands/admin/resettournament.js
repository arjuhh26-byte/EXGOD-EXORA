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
const matchKeys =
  await db.list("match:");

for (const key of matchKeys) {
  await db.delete(key);
}

await db.delete("current_round");
await db.delete("tournament_finished");

const slotChannel = await interaction.client.channels.fetch(
  process.env.SLOT_LIST_CHANNEL_ID
);

const slotMessage = await slotChannel.messages.fetch(
  process.env.SLOT_LIST_MESSAGE_ID
);

await interaction.reply({
  content:
   "✅ Tournament data reset successfully.\n\n• All registrations removed\n• All matches removed\n• Tournament rounds reset\n• Slot counter reset",
  ephemeral: true
});

  }
};