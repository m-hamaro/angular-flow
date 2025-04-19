import { IPoint } from '../../../shared/form-builder/interface/i-point';
import { NodeType } from '../../../types/node-type';
import { INodeValueModel } from './i-node-value-model';

export interface INodeModel<TKey = string> {
  key: TKey;

  description?: string;

  isExpanded?: boolean;

  input?: TKey;

  position: IPoint;

  type: NodeType;

  value: INodeValueModel | null;
}
