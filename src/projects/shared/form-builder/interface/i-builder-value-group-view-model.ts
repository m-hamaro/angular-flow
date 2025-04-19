import { IFormBuilderValueGroup } from './external-value/i-form-builder-value-group';
import { IBuilderValueControlViewModel } from './i-builder-value-control-view-model';

export interface IBuilderValueGroupViewModel extends IFormBuilderValueGroup {
  controls: IBuilderValueControlViewModel[];
}
