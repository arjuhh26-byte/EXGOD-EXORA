import { db } from "../../utils/database.js";

export default {
  name: "approve_registration",

  async execute(interaction) {
    try {

if (!interaction.member.permissions.has("Administrator")) {
  return interaction.reply({
    content: "❌ You don't have permission to use this button.",
    ephemeral: true
  });
}

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

if (registration.status === "rejected") {
  return interaction.reply({
    content: "⚠️ This registration is already rejected.",
    ephemeral: true
  });
}
const maxSlots =
  (await db.get("efootball:max_slots")) || 512;

const currentSlots =
  (await db.get("efootball:slot_counter")) || 0;

if (currentSlots >= maxSlots) {
  return interaction.reply({
    content:
      `❌ Tournament is full.\nMaximum slots: ${maxSlots}`,
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
const member = await interaction.guild.members.fetch(
  registration.discordId
);
const slotChannel = await interaction.client.channels.fetch(
  process.env.SLOT_LIST_CHANNEL_ID
);

const slotMessage = await slotChannel.messages.fetch(
  process.env.SLOT_LIST_MESSAGE_ID
);

const registrations = await db.list("registration:");

let slots = [];

for (const key of registrations) {
  const data = await db.get(key);

  if (data?.status === "approved") {
    slots.push(
      `${data.slot} - ${data.ingameName}`
    );
  }
}
slots.sort((a, b) => {
  const slotA = parseInt(a.match(/\d+/)[0]);
  const slotB = parseInt(b.match(/\d+/)[0]);
  return slotA - slotB;
});

/*
await slotMessage.edit({
  content:
    `🎟 **TOURNAMENT SLOT LIST**\n\n` +
    (slots.length
      ? slots.join("\n")
      : "No registrations yet.")
});
*/
// console.log("SLOT LIST UPDATED");

try {
  console.log("BEFORE ROLE");
  await member.roles.add(
    process.env.EFOOTBALL_PLAYER_ROLE_ID
  );
  console.log("AFTER ROLE");

  console.log("ROLE ADDED SUCCESS");
} catch (err) {
  console.error("ROLE ERROR:", err);
}
console.log("ROLE ADDED");
   const user = await interaction.client.users.fetch(
  registration.discordId
);
console.log(
  "ROLE ID:",
  process.env.EFOOTBALL_PLAYER_ROLE_ID
);

try {
  console.log("BEFORE DM");
  await user.send(
    `✅ Registration Approved

🎟 Slot Number: ${formattedSlot}`
  );
   console.log("AFTER DM");

  console.log("DM SENT");
} catch (err) {
  console.error("DM ERROR:", err);
}

const logChannel = await interaction.client.channels.fetch(
  process.env.REGISTRATION_LOG_CHANNEL_ID
);

console.log("TRYING LOG CHANNEL");
console.log("BEFORE LOG");

await logChannel.send(`✅ **REGISTRATION APPROVED**

👤 User: <@${registration.discordId}>
🎮 Ingame Name: ${registration.ingameName}
📱 Phone: ${registration.phoneNumber}
🎟 Slot: ${formattedSlot}

🛡 Approved By: ${interaction.user}`);

console.log("AFTER LOG");

console.log("LOG SENT");
console.log("REACHED INTERACTION REPLY");
await interaction.reply({
  content: `✅ Registration Approved

🎟 Slot Number: ${formattedSlot}`,
  ephemeral: true
});
setTimeout(async () => {
  try {
    await interaction.channel.delete();
  } catch (err) {
    console.error(err);
  }
}, 10000);
} catch (err) {
  console.error("APPROVE ERROR:", err);
}
  }
};