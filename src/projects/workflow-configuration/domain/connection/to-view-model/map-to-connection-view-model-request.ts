import { INodeModel } from '../../../../domain/flow/interface/i-node-model';

export class MapToConnectionViewModelRequest {
  constructor(public readonly entity: INodeModel) {}
}
