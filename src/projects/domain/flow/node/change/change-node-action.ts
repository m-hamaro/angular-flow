import { IPoint } from '../../../../shared/form-builder/interface/i-point';
import { INodeOutputModel } from '../../interface/i-node-output-model';
import { INodeValueModel } from '../../interface/i-node-value-model';

export class ChangeNodeAction {
  public static readonly type = '[Flow] Change Node';

  constructor(
    public flowKey: string,
    public nodeKey: string,
    public position: IPoint,
    public outputs: INodeOutputModel<string>[],
    public value: INodeValueModel
  ) {}
}
