import { Injectable } from '@angular/core';
import { CreateKnowledgeNodeRequest } from './create-knowledge-node-request';
import { NodeType } from '../../../../types/node-type';
import { FormBuilderControlType } from '../../../../types/form-builder-control-type';
import { IEntitySummary } from '../../../../shared/form-builder/interface/i-entity-summary';

@Injectable({
  providedIn: 'root',
})
export class CreateKnowledgeNodeHandler {
  public handle(request: CreateKnowledgeNodeRequest) {
    const knowledgeData = this.fetchKnowledgeList();

    return {
      key: crypto.randomUUID(),
      description: '',
      input: crypto.randomUUID + '_input',
      outputs: knowledgeData,
      position: request.position,
      type: NodeType.Knowledge,
      value: {
        groups: [
          {
            name: '独自AIを選択',
            controls: this.knowledgeToControls(knowledgeData),
          },
        ],
      },
    };
  }

  private knowledgeToControls(knowledge: IEntitySummary<string>[]) {
    const controls = knowledge.map((k) => ({
      key: k.key,
      name: k.name,
      type: FormBuilderControlType.KNOWLEDGE_SELECT,
      value: k.key,
    }));

    return controls;
  }

  // TODO: 実際のデータに差し替える
  private fetchKnowledgeList() {
    return [
      {
        key: crypto.randomUUID(),
        name: '独自AI1',
      },
    ];
  }
}
