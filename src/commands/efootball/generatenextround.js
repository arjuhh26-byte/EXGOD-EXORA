import {
  SlashCommandBuilder,
  PermissionFlagsBits
} from "discord.js";

import { db } from "../../utils/database.js";

export default {
  data: new SlashCommandBuilder()
    .setName("generatenextround")
    .setDescription("Generate next round fixtures")
    .setDefaultMemberPermissions(
      PermissionFlagsBits.Administrator
    ),

  async execute(interaction) {

    const matchKeys =
      await db.list("match:");

    await interaction.reply({
      content:
        `Found ${matchKeys.length} matches.`,
      ephemeral: true
    });

  }
};