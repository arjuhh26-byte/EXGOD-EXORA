import { db } from "../../utils/database.js";

export default {
name: "reject_modal",

async execute(interaction) {

```
const reason =
  interaction.fields.getTextInputValue(
    "reject_reason"
  );

const registration = await db.get(
  `registration:${interaction.channel.id}`
);

if (!registration) {
  return interaction.reply({
    content: "❌ Registration data not found.",
    ephemeral: true
  });
}

registration.status = "rejected";
registration.reason = reason;

await db.set(
  `registration:${interaction.channel.id}`,
  registration
);

const user =
  await interaction.client.users.fetch(
    registration.discordId
  );

await user.send(
  `❌ Registration Rejected
```

Reason:
${reason}`
);

```
await interaction.reply({
  content: `❌ Registration Rejected
```

Reason:
${reason}`,
ephemeral: true
});

}
};
