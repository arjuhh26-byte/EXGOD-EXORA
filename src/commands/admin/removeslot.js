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

```
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

await db.delete(foundKey);

await interaction.reply({
  content:
    `✅ Registration removed for ${user.tag}`,
  ephemeral: true
});
```

}
};
