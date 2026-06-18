export default {
    customId: 'registration_reject',

    async execute(interaction) {

        const embed = interaction.message.embeds[0];

        await interaction.update({
            embeds: [embed],
            components: []
        });

        await interaction.followUp({
            content: '❌ Registration rejected.',
            ephemeral: true
        });
    }
};