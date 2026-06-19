import {
  SlashCommandBuilder,
  PermissionFlagsBits
} from "discord.js";

import { db } from "../../utils/database.js";

export default {
  data: new SlashCommandBuilder()
    .setName("setslots")
    .setDescription("Set maximum tournament slots")
    .addIntegerOption(option =>
      option
        .setName("limit")
        .setDescription("Maximum slots")
        .setRequired(true)
        .setMinValue(1)
    )
    .setDefaultMemberPermissions(
      PermissionFlagsBits.Administrator
    ),

  async execute(interaction) {

    const limit =
      interaction.options.getInteger("limit");

    await db.set(
      "efootball:max_slots",
      limit
    );

    await interaction.reply({
      content:
        `✅ Maximum slots set to ${limit}`,
      ephemeral: true
    });

  }
};