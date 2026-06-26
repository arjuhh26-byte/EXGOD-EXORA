import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("announcement")
    .setDescription("Send an announcement")
    .addChannelOption(option =>
      option
        .setName("channel")
        .setDescription("Channel to send announcement")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("title")
        .setDescription("Announcement title")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("message")
        .setDescription("Announcement content")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(
      PermissionFlagsBits.Administrator
    ),

  async execute(interaction) {

    const channel =
      interaction.options.getChannel("channel");

    const title =
      interaction.options.getString("title");

    const message =
      interaction.options.getString("message");

    const sentMessage = await channel.send({
      content: `**${title}**\n\n${message}`
    });

    await interaction.reply({
      content:
        `✅ Announcement sent to ${channel}\n\nMessage ID: ${sentMessage.id}`,
      ephemeral: true
    });

  }
};