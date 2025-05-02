import { INodeStaticMapItem } from '../workflow-configuration/interface/i-node-static-map-item';
import { NodeType } from './node-type';

export const NODE_STATIC_MAP: IMap<INodeStaticMapItem> = {
  [NodeType.Start]: {
    name: '開始',
    icon: 'play_arrow',
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
    name: '会話',
    icon: 'chat',
    color: '#AF94FF',
    isExpandable: true,
  },
  [NodeType.WebSearch]: {
    name: 'ウェブ検索',
    icon: 'language',
    color: '#ffb62a',
    isExpandable: false,
  },
  [NodeType.Knowledge]: {
    name: '独自AI',
    icon: 'import_contacts',
    color: '#008000',
    isExpandable: true,
  },
  [NodeType.End]: {
    name: '終了',
    icon: 'square_dot',
    color: '#ff859b',
    isExpandable: false,
  },
};

interface IMap<T = string> {
  [key: string]: T;
}
