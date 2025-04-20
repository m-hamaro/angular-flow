import { INodeModel } from '../interface/i-node-model';

export class CreateFlowAction {
  public static readonly type = '[Flow] Create';

  constructor(
    public key: string,

    public name: string,

    public nodes: INodeModel<string>[]
  ) {}
}
