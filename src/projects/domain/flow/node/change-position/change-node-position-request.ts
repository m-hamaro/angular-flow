import { IPoint } from '../../../../shared/form-builder/interface/i-point';
import { IFlowModel } from '../../interface/i-flow-model';

export class ChangeNodePositionRequest {
  constructor(
    public flowKey: string,
    public nodeKey: string,
    public position: IPoint,
    public flows: IFlowModel[]
  ) {}
}
