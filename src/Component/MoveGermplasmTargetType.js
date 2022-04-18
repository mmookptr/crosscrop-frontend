import { WorkflowType } from "../Model/WorkflowType";

class MoveGermplasmTargetType {
  constructor() {
    this.Coldroom = "Coldroom";
    this.BreedingNursery = WorkflowType.BreedingNursery;
    this.CrossingBlock = WorkflowType.CrossingBlock;
    this.YieldTrial = WorkflowType.YieldTrial;
  }
}

const moveGermplasmTargetType = new MoveGermplasmTargetType();

export { moveGermplasmTargetType as MoveGermplasmTargetType };
