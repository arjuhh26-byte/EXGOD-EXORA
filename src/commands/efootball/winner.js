import {
  SlashCommandBuilder,
  PermissionFlagsBits
} from "discord.js";

import { db } from "../../utils/database.js";

export default {
  data: new SlashCommandBuilder()
    .setName("winner")
    .setDescription("Set match winner")

    .addIntegerOption(option =>
      option
        .setName("match")
        .setDescription("Match number")
        .setRequired(true)
    )

    .addStringOption(option =>
      option
        .setName("slot")
        .setDescription("Winner slot number")
        .setRequired(true)
    )

    .setDefaultMemberPermissions(
      PermissionFlagsBits.Administrator
    ),

  async execute(interaction) {

    const matchNumber =
      interaction.options.getInteger("match");

    const winnerSlot =
      interaction.options.getString("slot");

      const registrations =
  await db.list("registration:");

let winnerData = null;

for (const key of registrations) {
  const data = await db.get(key);

  if (data?.slot === winnerSlot) {
    winnerData = data;
    break;
  }
}

    const matchData = await db.get(
      `match:${matchNumber}`
    );

    if (!matchData) {
      return interaction.reply({
        content: "❌ Match not found.",
        ephemeral: true
      });
    }

  await db.set(
  `match:${matchNumber}`,
  {
    ...matchData,
    winner: winnerData
  }
);

const fixtureChannel =
  await interaction.client.channels.fetch(
    process.env.FIXTURE_CHANNEL_ID
  );

const matchMessage =
  await fixtureChannel.messages.fetch(
    matchData.messageId
  );

await matchMessage.edit({
  content:
`🏆 MATCH ${matchNumber}

Player 1
🎟 ${matchData.player1}

VS

Player 2
🎟 ${matchData.player2 || "BYE"}

✅ WINNER
🎟 ${winnerSlot}`
}); 

    await interaction.reply({
      content:
        `✅ Winner saved for Match ${matchNumber}\n🎟 Winner: ${winnerSlot}`,
      ephemeral: true
    });

  }
};