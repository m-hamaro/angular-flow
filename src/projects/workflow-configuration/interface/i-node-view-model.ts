import { INodeValueModel } from '../../domain/flow/interface/i-node-value-model';
import { IPoint } from '../../shared/form-builder/interface/i-point';
import { NodeType } from '../../types/node-type';

export interface INodeViewModel<TKey = string> {
  key: string;

  name: string;

  color: string;

  icon: string;

  description?: string;

  isExpanded: boolean;

  isExpandable: boolean;

  outputs: {
    key: string;
    name: string;
  }[];

  input?: TKey;

  position: IPoint;

  type: NodeType;

  value: INodeValueModel | null;
}
