import { WorkflowType } from "./WorkflowType";
import { Workflow } from "./Workflow";

class CrossingBlock {
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
    if (workflowType !== WorkflowType.CrossingBlock) {
      throw new Error(
        `Invalid workflow type. Expecting: ${WorkflowType.CrossingBlock}. Got: ${workflowType}`
      );
    }

    const crossingBlock = Workflow.fromJSON(json);

    return crossingBlock;
  }
}

export { CrossingBlock };
