import { IFlowModel } from '../interface/i-flow-model';

export class CreateConnectionRequest {
  constructor(
    public flowKey: string,
    public outputNodeKey: string,
    public outputKey: string,
    public inputKey: string,
    public flows: IFlowModel[]
  ) {}
}
