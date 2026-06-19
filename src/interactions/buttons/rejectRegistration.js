import {
ModalBuilder,
TextInputBuilder,
TextInputStyle,
ActionRowBuilder
} from "discord.js";

export default {
name: "reject_registration",

async execute(interaction) {

if (
  !interaction.member.permissions.has(
    PermissionFlagsBits.Administrator
  )
) {
  return interaction.reply({
    content: "❌ You don't have permission to use this button.",
    ephemeral: true
  });
}

const modal = new ModalBuilder()
  .setCustomId("reject_modal")
  .setTitle("Reject Registration");

const reasonInput = new TextInputBuilder()
  .setCustomId("reject_reason")
  .setLabel("Reason")
  .setStyle(TextInputStyle.Paragraph)
  .setRequired(true);

const row = new ActionRowBuilder()
  .addComponents(reasonInput);

modal.addComponents(row);

await interaction.showModal(modal);

}
};
