export default {
  name: "register_modal",

  async execute(interaction) {

    const teamName =
      interaction.fields.getTextInputValue("team_name");

    const captainName =
      interaction.fields.getTextInputValue("captain_name");

    const captainId =
      interaction.fields.getTextInputValue("captain_id");

    await interaction.reply({
      content:
`✅ Registration Submitted

Team: ${teamName}
Captain: ${captainName}
Discord ID: ${captainId}`,
      ephemeral: true
    });
  }
};