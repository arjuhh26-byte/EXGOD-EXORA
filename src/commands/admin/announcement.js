async execute(interaction) {

  const channel =
    interaction.options.getChannel("channel");

  const title =
    interaction.options.getString("title");

  const message =
    interaction.options.getString("message");

  const sentMessage = await channel.send({
    content:
      `📢 **${title}**\n\n${message}`
  });

  await interaction.reply({
    content:
      `✅ Announcement sent to ${channel}\n\nMessage ID: ${sentMessage.id}`,
    ephemeral: true
  });

}