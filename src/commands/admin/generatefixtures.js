import {
  SlashCommandBuilder,
  PermissionFlagsBits
} from "discord.js";

import { db } from "../../utils/database.js";

export default {
  data: new SlashCommandBuilder()
    .setName("generatefixtures")
    .setDescription("Generate tournament fixtures")
    .setDefaultMemberPermissions(
      PermissionFlagsBits.Administrator
    ),

  async execute(interaction) {

  const registrations =
  await db.list("registration:");

await interaction.reply({
  content:
    `Found ${registrations.length} registrations.`,
  ephemeral: true
});

  }
};