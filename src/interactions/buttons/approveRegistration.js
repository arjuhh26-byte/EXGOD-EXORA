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
    if (registration.status === "approved") {
  return interaction.reply({
    content: `⚠️ This registration is already approved.

🎟 Slot Number: ${registration.slot}`,
    ephemeral: true
  });
}
const slotCounter = await db.increment(
  "efootball:slot_counter"
);

const formattedSlot =
  `#${String(slotCounter).padStart(3, "0")}`;
  registration.status = "approved";
registration.slot = formattedSlot;

await db.set(
  `registration:${interaction.channel.id}`,
  registration
);
   const user = await interaction.client.users.fetch(
  registration.discordId
);

await user.send(
  `✅ Registration Approved

🎟 Slot Number: ${formattedSlot}`
);
await interaction.reply({
  content: `✅ Registration Approved

🎟 Slot Number: ${formattedSlot}`,
  ephemeral: true
});

  }
};