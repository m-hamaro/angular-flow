import { IPoint } from '../../../shared/form-builder/interface/i-point';
import { NodeType } from '../../../types/node-type';
import { INodeOutputModel } from './i-node-output-model';
import { INodeValueModel } from './i-node-value-model';

export interface INodeModel<TKey = string> {
  key: TKey;

  description?: string;

  isExpanded?: boolean;

  outputs: INodeOutputModel<TKey>[];

  input?: TKey;

  position: IPoint;

  type: NodeType;

  value: INodeValueModel | null;
}
