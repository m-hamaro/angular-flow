import { Routes } from '@angular/router';
import { CommonPresentational } from './common/common.presentational';
import { WorkflowContainer } from '../projects/workflow-configuration/components/root/container/workflow.container';
import { WorkFlowEditorContainer } from '../projects/workflow-configuration/components/editor/container/workflow-editor.container';

export const routes: Routes = [
  {
    path: '',
    // component: FlowPage,
    component: CommonPresentational,
    children: [
      {
        path: 'flow',
        loadComponent: () => WorkflowContainer,
        children: [
          {
            path: 'key',
            loadComponent: () => WorkFlowEditorContainer,
          },
        ],
      },
    ],
  },
];
