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

   let winners = [];

for (const key of matchKeys) {

  const matchData =
    await db.get(key);

  if (matchData?.winner) {
    winners.push(matchData.winner);
  }

}

await interaction.reply({
  content:
    `Found ${winners.length} winners.`,
  ephemeral: true
});

  }
};