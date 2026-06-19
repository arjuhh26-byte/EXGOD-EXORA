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

  let approvedPlayers = [];

for (const key of registrations) {
  const data = await db.get(key);

  if (data?.status === "approved") {
    approvedPlayers.push(data);
  }
}

await interaction.reply({
  content:
    `Found ${approvedPlayers.length} approved players.`,
  ephemeral: true
});

  }
};