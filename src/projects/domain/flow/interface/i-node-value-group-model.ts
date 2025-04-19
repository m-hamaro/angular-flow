import { IFormBuilderValueGroup } from '../../../shared/form-builder/interface/external-value/i-form-builder-value-group';
import { INodeValueControlModel } from './i-node-value-control-model';

export interface INodeValueGroupModel extends IFormBuilderValueGroup {
  controls: INodeValueControlModel<any>[];
}
