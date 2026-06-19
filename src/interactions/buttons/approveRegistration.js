import { db } from "../../utils/database.js";

export default {
  name: "approve_registration",

  async execute(interaction) {

    const registration = await db.get(
      `registration:${interaction.channel.id}`
    );

    if (!registration) {
      return interaction.reply({
        content: "❌ Registration data not found.",
        ephemeral: true
      });
    }

    await interaction.reply({
      content: "✅ Registration Approved",
      ephemeral: true
    });

  }
};