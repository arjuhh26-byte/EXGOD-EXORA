import fs from 'fs';
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
const rulesData = JSON.parse(
    fs.readFileSync('./src/commands/Ticket/registrationRules.json', 'utf8')
);

const rulesText = rulesData.rules
    .map(rule => `• ${rule}`)
    .join('\n');
        const embed = createEmbed({
            title: "🏆 EFOOTBALL TOURNAMENT REGISTRATION",
            description:
description:
`Click the button below to register.

📋 Requirements:

${rulesText}

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