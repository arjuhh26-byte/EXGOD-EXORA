import { PermissionFlagsBits } from "discord.js";
import { db } from "../../utils/database.js";

export default {
  name: "resetslot",
  description: "Reset eFootball slot counter",
  defaultMemberPermissions:
    PermissionFlagsBits.Administrator,

  async execute(interaction) {

    await db.set(
      "efootball:slot_counter",
      0
    );

    await interaction.reply({
      content: "✅ Slot counter has been reset to 0.",
      ephemeral: true
    });

  }
};