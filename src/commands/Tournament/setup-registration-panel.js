import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("setup-registration-panel")
    .setDescription("Setup EFOOTBALL registration panel")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  category: "tournament",

  async execute(interaction) {

    const embed = new EmbedBuilder()
      .setTitle("🏆 EXGOD EFOOTBALL TOURNAMENT")
      .setDescription("Click below to register.")
      .setColor(0x00AE86);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("register_now")
        .setLabel("Register Now")
        .setStyle(ButtonStyle.Success)
    );

    await interaction.channel.send({
      embeds: [embed],
      components: [row]
    });

    await interaction.reply({
      content: "✅ Registration panel created.",
      ephemeral: true
    });
  }
};