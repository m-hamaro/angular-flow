import { IPoint } from '../../../../shared/form-builder/interface/i-point';
import { NodeType } from '../../../../types/node-type';
import { IFlowModel } from '../../interface/i-flow-model';

export class CreateNodeRequest {
  constructor(
    public flowKey: string,

    public type: NodeType,

    public position: IPoint,

    public flows: IFlowModel[]
  ) {}
}
