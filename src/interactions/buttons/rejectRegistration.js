export default {
  name: "reject_registration",

  async execute(interaction) {

    await interaction.reply({
      content: "❌ Registration Rejected",
      ephemeral: true
    });

  }
};