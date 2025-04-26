import { IFlowModel } from '../interface/i-flow-model';

export class UpdateFlowRequest {
  constructor(
    public key: string,

    public name: string,

    public flows: IFlowModel[]
  ) {}
}
