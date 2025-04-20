import { IFlowViewModel } from '../../../interface/i-flow-view-model';
import { INodeViewModel } from '../../../interface/i-node-view-model';

export class ChangeNodeRequest {
  constructor(
    public readonly flow: IFlowViewModel,
    public readonly node: INodeViewModel
  ) {}
}
