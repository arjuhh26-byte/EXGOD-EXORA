import {
  SlashCommandBuilder,
  PermissionFlagsBits
} from "discord.js";

import { db } from "../../utils/database.js";

export default {
  data: new SlashCommandBuilder()
    .setName("closeregistration")
    .setDescription("Close tournament registration")
    .setDefaultMemberPermissions(
      PermissionFlagsBits.Administrator
    ),

  async execute(interaction) {

    await db.set(
      "efootball:registration_open",
      false
    );

    await interaction.reply({
      content: "❌ Registration closed.",
      ephemeral: true
    });

  }
};