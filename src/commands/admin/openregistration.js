import {
  SlashCommandBuilder,
  PermissionFlagsBits
} from "discord.js";

import { db } from "../../utils/database.js";

export default {
  data: new SlashCommandBuilder()
    .setName("openregistration")
    .setDescription("Open tournament registration")
    .setDefaultMemberPermissions(
      PermissionFlagsBits.Administrator
    ),

  async execute(interaction) {

    await db.set(
      "efootball:registration_open",
      true
    );

    await interaction.reply({
      content: "✅ Registration opened.",
      ephemeral: true
    });

  }
};