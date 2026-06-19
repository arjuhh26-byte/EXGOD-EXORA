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

const fixtureChannel =
await interaction.client.channels.fetch(
process.env.FIXTURE_CHANNEL_ID
);

for (const fixture of fixtures) {

const player1 = fixture.player1;
const player2 = fixture.player2;

const matchMessage =
await fixtureChannel.send({
content:
`🏆 MATCH ${fixture.match}

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
  `match:${fixture.match}`,
  {
    round: 1,
    match: fixture.match,
    player1: player1.slot,
    player2: player2?.slot || null,
    winner: null,
    messageId: matchMessage.id
  }
);

await interaction.reply({
  content:
    `✅ Generated ${fixtures.length} matches.`,
  ephemeral: true
});

  }
};