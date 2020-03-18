import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ModelService } from '../services/model.service';
import { ModelMetadataResponse } from '../models/model-metadata-response';
import { ModelMetadata } from '../models/model-metadata';

@Component({
  selector: 'app-model-detail',
  templateUrl: './model-detail.component.html',
  styleUrls: ['./model-detail.component.scss']
})
export class ModelDetailComponent implements OnInit {

  model: ModelMetadata;
  activeTab = 'description';

  constructor(private route: ActivatedRoute, private modelService: ModelService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
        const model_id = params.get('model_id');
        this.modelService.getModelMetadataById(model_id).subscribe((modelMetadataResponse: ModelMetadataResponse) => {
          this.model = ModelMetadata.fromJson(modelMetadataResponse.payload);
        })
    })
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

}
