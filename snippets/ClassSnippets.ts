import { std } from "tswow-stdlib";
import { Pos } from "tswow-stdlib/Misc/Position";

/**
 * Snippet: Class::Short
 * - Short snippet for class creation.
 */
std.Classes.create(/*@1*/'mod'/**/,/*@2*/'id'/**/,'MAGE')
    .Name.enGB.set('New Class')
    
    // Modify stats
    .Stats.Stamina.set((old,race,level)=>old)
    
    // Modify starting gear
    .StartGear.Mainhand.set(25)

    // Races
    .addRaces(['HUMAN','ORC'])

    .UI.Color.set(0xcc0077)
    .UI.Info.add('- Role: Damage')
    .UI.Info.add('- Some Armor (Whatever)')
    .UI.Info.add('- Uses something as a resource')
    .UI.Description.set("Class description text.")
/** end-snippet */

/**
 * Snippet: Class::Long
 * - Long snippet for class creation.
 */
export const CLASS = std.Classes.create(/*@1*/'mod'/**/,/*@2*/'id'/**/,'MAGE')
    .Name.enGB.set('New Class')
    
    // Modify stats
    .Stats.Stamina.set((old,race,level)=>old)
    
    // Modify starting gear
    .StartGear.Mainhand.set(25)

    // Races
    .addRaces(['HUMAN','ORC'])

    .UI.Color.set(0xcc0077)
    .UI.Info.add('- Role: Damage')
    .UI.Info.add('- Some Armor (Whatever)')
    .UI.Info.add('- Uses something as a resource')
    .UI.Description.set("Class description text.")

export const CLASS_SKILL = std.SkillLines
    .createClass(/*@1*/'mod'/**/,/*@2*/'id'/**/+'skill',CLASS.ID)
    .Name.enGB.set('My Class Skill')

// Autolearn spell
std.Spells.Presets.CreateBolt(/*@1*/'mod'/**/,/*@2*/'id'/**/+'spell 1')
    .Name.enGB.set('My Class Spell 2')
    .SkillLines.addAutolearn(CLASS_SKILL.ID).end

// Learnt spell
const spell = std.Spells.Presets.CreateBolt(/*@1*/'mod'/**/,/*@2*/'id'/**/+'spell 2')
    .Name.enGB.set('My Class Spell')
    .SkillLines.add(CLASS_SKILL.ID).end

const trainer = (id: string)=>
    std.CreatureTemplates.Presets
        .CreateClassTrainer(/*@1*/'mod'/**/,'id'+id,CLASS.ID)
        // Add spells here
        .addTrainerSpell(spell.ID,5)

// Horde trainer
trainer('horde')
    .FactionTemplate.setOrgrimmar()
    .Models.addIds(14413)
    .spawn(/*@1*/'mod'/**/,/*@2*/'id'/**/+'horde',
        /*@4*/Pos(1,1629.273682,-4373.761719,31.497536,3.546033)/**/)

// Alliance Trainer
trainer('alliance')
    .FactionTemplate.setStormwind()
    .Models.addIds(5074)
    .spawn(/*@1*/'mod'/**/,/*@2*/'id'/**/+'alliance',
        /*@5*/Pos(0,-8827.892578,634.597961,94.258476,3.752199)/**/)
/** end-snippet */