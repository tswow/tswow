import { DBC } from "../../../DBCFiles";
import { CreatureTemplateRegistry } from "../Creatures";

export const CreaturePresets = {
    CreateClassTrainer(mod: string, id: string, classId: number) {
        let cls = DBC.ChrClasses.findById(classId);
        let trainerName = `${cls.Name.enGB.get()} Trainer`
        return CreatureTemplateRegistry.create(mod,id)
            .Name.enGB.set(trainerName)
            .Subname.enGB.set(trainerName)
            .Gossip.set(0)
            .NPCFlags.TRAINER.set(true)
            .Trainer.modRef((trainer)=>{
                trainer
                    .Greeting.enGB.set(
                        `Ready for some training, ${cls.Name.enGB.get()}?`
                    )
                    .RequirementType.CLASS.set()
                    .RequiredClass.set(classId)
            })
    }
}