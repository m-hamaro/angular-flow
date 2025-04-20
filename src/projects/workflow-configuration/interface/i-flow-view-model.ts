import { IConnectionViewModel } from './i-connection-view-model';
import { INodeViewModel } from './i-node-view-model';

export interface IFlowViewModel {
  key: string;

  nodes: INodeViewModel[];

  connections: IConnectionViewModel[];
}
