import { IFormBuilderValue } from '../../../shared/form-builder/interface/external-value/i-form-builder-value';
import { INodeValueGroupModel } from './i-node-value-group-model';

export interface INodeValueModel extends IFormBuilderValue {
  groups: INodeValueGroupModel[];
}
