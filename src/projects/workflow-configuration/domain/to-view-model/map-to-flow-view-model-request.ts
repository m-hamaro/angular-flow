import { IFlowModel } from '../../../domain/flow/interface/i-flow-model';

export class MapToFlowViewModelRequest {
  constructor(public readonly entity: IFlowModel) {}
}
