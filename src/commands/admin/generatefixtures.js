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
approvedPlayers.sort(
  () => Math.random() - 0.5
);

let fixtures = [];

for (
  let i = 0;
  i < approvedPlayers.length;
  i += 2
) {
  const player1 = approvedPlayers[i];
  const player2 = approvedPlayers[i + 1];

  fixtures.push({
    match: fixtures.length + 1,
    player1,
    player2
  });
}

await interaction.reply({
  content:
    `✅ Generated ${fixtures.length} matches.`,
  ephemeral: true
});

  }
};