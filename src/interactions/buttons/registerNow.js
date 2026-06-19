import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} from "discord.js";

import { db } from "../../utils/database.js";

export default {
  name: "register_now",

  async execute(interaction) {
    const isOpen = await db.get(
  "efootball:registration_open"
);

if (isOpen === false) {
  return interaction.reply({
    content:
      "❌ Registration is currently closed.",
    ephemeral: true
  });
}
    const modal = new ModalBuilder()
      .setCustomId("register_modal")
      .setTitle("EFOOTBALL Registration");

    const ingameName = new TextInputBuilder()
      .setCustomId("ingame_name")
      .setLabel("Ingame Name")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const phoneNumber = new TextInputBuilder()
      .setCustomId("phone_number")
      .setLabel("Phone Number")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    modal.addComponents(
      new ActionRowBuilder().addComponents(ingameName),
      new ActionRowBuilder().addComponents(phoneNumber)
    );

    await interaction.showModal(modal);
  }
};