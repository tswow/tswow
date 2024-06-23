function AllStats_OnLoad()
    PaperDollFrame_UpdateStats = NewPaperDollFrame_UpdateStats;
end

function NewPaperDollFrame_UpdateStats()
    PrintStats();
end

function PrintStats()
    statToFunction = { -- Base Stats
    {AllStatsFrameStat1, PaperDollFrame_SetStat, 1}, {AllStatsFrameStat2, PaperDollFrame_SetStat, 2},
    {AllStatsFrameStat3, PaperDollFrame_SetStat, 3}, {AllStatsFrameStat4, PaperDollFrame_SetStat, 4},
    {AllStatsFrameStat5, PaperDollFrame_SetStat, 5}, {AllStatsFrameStatMeleeDamage, PaperDollFrame_SetDamage},
    {AllStatsFrameStatMeleeSpeed, PaperDollFrame_SetAttackSpeed},
    {AllStatsFrameStatMeleePower, PaperDollFrame_SetAttackPower},
    {AllStatsFrameStatMeleeHit, PaperDollFrame_SetRating, CR_HIT_MELEE},
    {AllStatsFrameStatMeleeCrit, PaperDollFrame_SetMeleeCritChance},
    {AllStatsFrameStatMeleeExpert, PaperDollFrame_SetExpertise},
    {AllStatsFrameStatRangeDamage, PaperDollFrame_SetRangedDamage},
    {AllStatsFrameStatRangeSpeed, PaperDollFrame_SetRangedAttackSpeed},
    {AllStatsFrameStatRangePower, PaperDollFrame_SetRangedAttackPower},
    {AllStatsFrameStatRangeHit, PaperDollFrame_SetRating, CR_HIT_RANGED},
    {AllStatsFrameStatRangeCrit, PaperDollFrame_SetRangedCritChance},
    {AllStatsFrameStatSpellDamage, PaperDollFrame_SetSpellBonusDamage},
    {AllStatsFrameStatSpellHeal, PaperDollFrame_SetSpellBonusHealing},
    {AllStatsFrameStatSpellHit, PaperDollFrame_SetRating, CR_HIT_SPELL},
    {AllStatsFrameStatSpellCrit, PaperDollFrame_SetSpellCritChance, CR_HIT_SPELL},
    {AllStatsFrameStatSpellHaste, PaperDollFrame_SetSpellHaste},
    {AllStatsFrameStatSpellRegen, PaperDollFrame_SetManaRegen}, {AllStatsFrameStatArmor, PaperDollFrame_SetArmor},
    {AllStatsFrameStatDefense, PaperDollFrame_SetDefense}, {AllStatsFrameStatDodge, PaperDollFrame_SetDodge},
    {AllStatsFrameStatParry, PaperDollFrame_SetParry}, {AllStatsFrameStatBlock, PaperDollFrame_SetBlock},
    {AllStatsFrameStatResil, PaperDollFrame_SetResilience}}
    printStatsOnEnterScripts = { --
    {AllStatsFrameStatMeleeDamage, CharacterDamageFrame_OnEnter},
    {AllStatsFrameStatRangeDamage, CharacterRangedDamageFrame_OnEnter},
    {AllStatsFrameStatSpellDamage, CharacterSpellBonusDamage_OnEnter},
    {AllStatsFrameStatSpellCrit, CharacterSpellCritChance_OnEnter}}

    for _, v in ipairs(statToFunction) do
        v[2](v[1], v[3])
    end
    for _, v in pairs(customStatToFunction) do
        v[2](v[1], v[3])
    end
    for _, v in ipairs(printStatsOnEnterScripts) do
        v[1]:SetScript("OnEnter", v[2])
    end
end
