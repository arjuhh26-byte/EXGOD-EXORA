import { updateSlotList } from "../../utils/updateSlotList.js";
import {
SlashCommandBuilder,
PermissionFlagsBits
} from "discord.js";

import { db } from "../../utils/database.js";

export default {
data: new SlashCommandBuilder()
.setName("removeslot")
.setDescription("Remove a player's registration")
.addUserOption(option =>
option
.setName("user")
.setDescription("Player to remove")
.setRequired(true)
)
.setDefaultMemberPermissions(
PermissionFlagsBits.Administrator
),

async execute(interaction) {

const user =
  interaction.options.getUser("user");

const registrations =
  await db.list("registration:");

let foundKey = null;
let foundData = null;

for (const key of registrations) {

  const data = await db.get(key);

  if (data?.discordId === user.id) {
    foundKey = key;
    foundData = data;
    break;
  }

}

if (!foundKey) {
  return interaction.reply({
    content:
      "❌ Registration not found.",
    ephemeral: true
  });
}
console.log("FOUND KEY:", foundKey);
console.log("FOUND DATA:", foundData);

await db.delete(foundKey);

const logChannel =
  await interaction.client.channels.fetch(
    process.env.REGISTRATION_LOG_CHANNEL_ID
  );

await logChannel.send(
`🗑️ **REGISTRATION REMOVED**

👤 User: <@${user.id}>

🛡 Removed By: ${interaction.user}`
);

await updateSlotList(interaction.client);

await interaction.reply({
  content:
    `✅ Registration removed for ${user.tag}`,
  ephemeral: true
});

}
};
