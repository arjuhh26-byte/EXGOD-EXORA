import { SlashCommandBuilder, PermissionFlagsBits, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { createEmbed } from '../../utils/embeds.js';

export default {
    data: new SlashCommandBuilder()
        .setName("registration")
        .setDescription("Setup eFootball registration panel")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addChannelOption(option =>
            option
                .setName("channel")
                .setDescription("Channel to send registration panel")
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        ),

    async execute(interaction) {

        const channel = interaction.options.getChannel("channel");

        const embed = createEmbed({
            title: "🏆 EFOOTBALL TOURNAMENT REGISTRATION",
            description:
`Click the button below to register.

Requirements:
• Follow Instagram
• Subscribe YouTube
• Follow Partner Page

After clicking Register, you will be asked for your details.`
        });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("register_now")
                    .setLabel("Register Now")
                    .setStyle(ButtonStyle.Success)
                    .setEmoji("🎮")
            );

        await channel.send({
            embeds: [embed],
            components: [row]
        });

        await interaction.reply({
            content: "✅ Registration panel created successfully.",
            ephemeral: true
        });
    }
};