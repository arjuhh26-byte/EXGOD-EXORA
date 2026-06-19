import {
  SlashCommandBuilder,
  PermissionFlagsBits
} from "discord.js";

import { db } from "../../utils/database.js";

export default {
  data: new SlashCommandBuilder()
    .setName("winner")
    .setDescription("Set match winner")

    .addIntegerOption(option =>
      option
        .setName("match")
        .setDescription("Match number")
        .setRequired(true)
    )

    .addStringOption(option =>
      option
        .setName("slot")
        .setDescription("Winner slot number")
        .setRequired(true)
    )

    .setDefaultMemberPermissions(
      PermissionFlagsBits.Administrator
    ),

  async execute(interaction) {

    const matchNumber =
      interaction.options.getInteger("match");

    const winnerSlot =
      interaction.options.getString("slot");

    const matchData = await db.get(
      `match:${matchNumber}`
    );

    if (!matchData) {
      return interaction.reply({
        content: "❌ Match not found.",
        ephemeral: true
      });
    }

    await db.set(
      `match:${matchNumber}`,
      {
        ...matchData,
        winner: winnerSlot
      }
    );

    await interaction.reply({
      content:
        `✅ Winner saved for Match ${matchNumber}\n🎟 Winner: ${winnerSlot}`,
      ephemeral: true
    });

  }
};