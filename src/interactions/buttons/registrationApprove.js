export default {
    customId: 'registration_approve',

    async execute(interaction) {

        const embed = interaction.message.embeds[0];

        await interaction.update({
            embeds: [embed],
            components: []
        });

        await interaction.followUp({
            content: '✅ Registration approved.',
            ephemeral: true
        });
    }
};