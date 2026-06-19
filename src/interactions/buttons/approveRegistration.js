import { db } from "../../utils/database.js";

export default {
name: "approve_registration",

async execute(interaction) {

```
await interaction.reply({
  content: "✅ Registration Approved",
  ephemeral: true
});
```

}
};
