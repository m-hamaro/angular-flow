import { INodeStaticMapItem } from '../workflow-configuration/interface/i-node-static-map-item';
import { NodeType } from './node-type';

export const NODE_STATIC_MAP: IMap<INodeStaticMapItem> = {
  [NodeType.IncomingCall]: {
    name: 'Incoming call',
    icon: 'add_call',
    color: '#39b372',
    isExpandable: false,
  },
  [NodeType.UserInput]: {
    name: 'IVR',
    icon: 'call_log',
    color: '#2676ff',
    isExpandable: true,
  },
  [NodeType.PlayText]: {
    name: 'Play text',
    icon: 'wifi_calling_3',
    color: '#AF94FF',
    isExpandable: true,
  },
  [NodeType.ToOperator]: {
    name: 'To operator',
    icon: 'wifi_calling_3',
    color: '#ffb62a',
    isExpandable: false,
  },
  [NodeType.Disconnect]: {
    name: 'Disconnect',
    icon: 'phone_disabled',
    color: '#ff859b',
    isExpandable: false,
  },
};

interface IMap<T = string> {
  [key: string]: T;
}
