import {
  SlashCommandBuilder,
  PermissionFlagsBits
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("generatefixtures")
    .setDescription("Generate tournament fixtures")
    .setDefaultMemberPermissions(
      PermissionFlagsBits.Administrator
    ),

  async execute(interaction) {

    await interaction.reply({
      content:
        "🏆 Fixture generation system is starting...",
      ephemeral: true
    });

  }
};