import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} from 'discord.js';

import { createEmbed } from '../../utils/embeds.js';

export default {
    name: 'registration_form',

    async execute(interaction) {

        const ingameName =
            interaction.fields.getTextInputValue('ingame_name');

        const phoneNumber =
            interaction.fields.getTextInputValue('phone_number');

        const reviewChannelId = '1517219684431429692';

        const reviewChannel =
            interaction.guild.channels.cache.get(reviewChannelId);

        if (!reviewChannel) {
            return interaction.reply({
                content: '❌ Review channel not found.',
                ephemeral: true
            });
        }

        const embed = createEmbed({
            title: '📝 Tournament Registration',
            description:
`👤 User: <@${interaction.user.id}>

🎮 Ingame Name: ${ingameName}

📱 Phone Number: ${phoneNumber}

🆔 Discord ID: ${interaction.user.id}

Status: ⏳ Pending`
        });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('registration_approve')
                    .setLabel('Approve')
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId('registration_reject')
                    .setLabel('Reject')
                    .setStyle(ButtonStyle.Danger)
            );

        await reviewChannel.send({
            embeds: [embed],
            components: [row]
        });

        await interaction.reply({
            content:
                '✅ Registration submitted successfully. Please wait for admin verification.',
            ephemeral: true
        });
    }
};