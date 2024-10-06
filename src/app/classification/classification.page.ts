import { Component } from '@angular/core';
import { ClassificationService } from '../services/classification.service';
import { Classification } from '../models/Classification';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.page.html',
  styleUrls: ['./classification.page.scss'],
})
export class ClassificationPage{

  classification: Classification[] = [];

  constructor(private classificationService: ClassificationService) { 
    this.classificationService.getClassification().subscribe(data => {
      this.classification = data;
    });
  }



}
