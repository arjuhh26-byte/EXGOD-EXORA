import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} from "discord.js";

export default {
  name: "register_now",

  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId("register_modal")
      .setTitle("EFOOTBALL Registration");

    const teamName = new TextInputBuilder()
      .setCustomId("team_name")
      .setLabel("Team Name")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const captainName = new TextInputBuilder()
      .setCustomId("captain_name")
      .setLabel("Captain Name")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const captainId = new TextInputBuilder()
      .setCustomId("captain_id")
      .setLabel("Captain Discord ID")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    modal.addComponents(
      new ActionRowBuilder().addComponents(teamName),
      new ActionRowBuilder().addComponents(captainName),
      new ActionRowBuilder().addComponents(captainId)
    );

    await interaction.showModal(modal);
  }
};