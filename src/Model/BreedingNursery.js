import { WorkflowType } from "./WorkflowType";
import { Workflow } from "./Workflow";

class BreedingNursery {
  constructor(workflow) {
    this.workflow = workflow;
  }

  get id() {
    return this.workflow.id;
  }

  get name() {
    return this.workflow.name;
  }

  get germplasms() {
    return this.workflow.germplasms;
  }

  get season() {
    return this.workflow.season;
  }

  get createdOn() {
    return this.workflow.createdOn;
  }

  get updatedOn() {
    return this.workflow.updatedOn;
  }

  static fromJSON(json) {
    const workflowType = json["workflow_type"];
    if (workflowType !== WorkflowType.BreedingNursery) {
      throw new Error(
        `Invalid workflow type. Expecting: ${WorkflowType.BreedingNursery}. Got: ${workflowType}`
      );
    }

    const breedingNursery = Workflow.fromJSON(json);

    return breedingNursery;
  }
}

export { BreedingNursery };
