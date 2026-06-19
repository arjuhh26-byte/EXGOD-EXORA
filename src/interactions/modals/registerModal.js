export default {
  name: "register_modal",

  async execute(interaction) {

    const ingameName =
      interaction.fields.getTextInputValue("ingame_name");

    const phoneNumber =
      interaction.fields.getTextInputValue("phone_number");

    await interaction.reply({
      content:
`✅ Registration Submitted

Ingame Name: ${ingameName}
Phone Number: ${phoneNumber}

Please wait for admin verification.`,
      ephemeral: true
    });
  }
};