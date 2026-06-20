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

const currentRound =
  (await db.get("current_round")) || 1;

const nextRound =
  currentRound + 1;

const matchKeys =
  await db.list("match:");

let winners = [];

for (const key of matchKeys) {

  const matchData =
    await db.get(key);

  if (
    matchData?.round === currentRound &&
    matchData?.winner
  ) {
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

const fixtureChannel =
  await interaction.client.channels.fetch(
    process.env.FIXTURE_CHANNEL_ID
  );

await fixtureChannel.send(

`━━━━━━━━━━
🏆 ROUND ${nextRound}
━━━━━━━━━━`
);

for (const fixture of nextRoundFixtures) {

  const player1 = fixture.player1;
  const player2 = fixture.player2;

  const matchMessage =
    await fixtureChannel.send({
      content:

`🏆 ROUND ${nextRound} - MATCH ${fixture.match}

Player 1
🎟 ${player1.slot}
🎮 ${player1.ingameName}
📱 ${player1.phoneNumber}

VS

${
player2
? `Player 2
🎟 ${player2.slot}
🎮 ${player2.ingameName}
📱 ${player2.phoneNumber}`
: "🎉 BYE"
}

Status: Pending`
});

  await db.set(
    `match:${nextRound}:${fixture.match}`,
    {
      round: nextRound,
      match: fixture.match,
      player1,
      player2,
      winner: null,
      messageId: matchMessage.id
    }
  );

}

await db.set(
  "current_round",
  nextRound
);

await interaction.reply({
  content:
    `✅ Generated ${nextRoundFixtures.length} matches for Round ${nextRound}.`,
  ephemeral: true
});

}
};