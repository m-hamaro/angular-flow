import { IPoint } from '../../../../shared/form-builder/interface/i-point';
import { NodeType } from '../../../../types/node-type';

export class CreateNodeAction {
  public static readonly type = '[Flow] Create Node';

  constructor(
    public flowKey: string,

    public type: NodeType,

    public position: IPoint
  ) {}
}
