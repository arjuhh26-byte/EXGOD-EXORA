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

let nextRoundFixtures = [];

for (
let i = 0;
i < winners.length;
i += 2
) {

nextRoundFixtures.push({
match:
nextRoundFixtures.length + 1,
player1: winners[i],
player2: winners[i + 1] || null
});

}

await interaction.reply({
content:
`✅ Generated ${nextRoundFixtures.length} next round matches.`,
ephemeral: true
});


  }
};