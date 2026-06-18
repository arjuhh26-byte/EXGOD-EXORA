import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import fs from 'fs';

const RULES_FILE = './registrationRules.json';

export default {
    data: new SlashCommandBuilder()
        .setName('registration-rules')
        .setDescription('Update tournament registration rules')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

        .addStringOption(option =>
            option
                .setName('rule1')
                .setDescription('Rule 1')
                .setRequired(true)
        )

        .addStringOption(option =>
            option
                .setName('rule2')
                .setDescription('Rule 2')
                .setRequired(false)
        )

        .addStringOption(option =>
            option
                .setName('rule3')
                .setDescription('Rule 3')
                .setRequired(false)
        )

        .addStringOption(option =>
            option
                .setName('rule4')
                .setDescription('Rule 4')
                .setRequired(false)
        ),

    async execute(interaction) {

        const rules = [
            interaction.options.getString('rule1'),
            interaction.options.getString('rule2'),
            interaction.options.getString('rule3'),
            interaction.options.getString('rule4')
        ].filter(Boolean);

        fs.writeFileSync(
            RULES_FILE,
            JSON.stringify({ rules }, null, 2)
        );

        await interaction.reply({
            content: '✅ Registration rules updated successfully.',
            ephemeral: true
        });
    }
};