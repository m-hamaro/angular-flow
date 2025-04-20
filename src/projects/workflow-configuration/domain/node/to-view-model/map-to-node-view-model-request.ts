import { INodeModel } from '../../../../domain/flow/interface/i-node-model';

export class MapToNodeViewModelRequest {
  constructor(public readonly entity: INodeModel) {}
}
