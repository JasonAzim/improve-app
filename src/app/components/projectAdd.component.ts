import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectService } from '../services/project.service';
import { ProjectShape } from '../shapes/project.shape';

@Component({
  selector: 'app-project-add',
  templateUrl: './projectAdd.component.html',
  providers: [ProjectService],
  styleUrls: ['./components.css']
})
export class ProjectAddComponent implements OnInit {
  Project: ProjectShape;
  displayMessage: string = "Processing...";

  constructor(private route: ActivatedRoute, @Inject('BASE_URL') baseUrl: string, private projectsService: ProjectService) {
    var shape = {} as ProjectShape;
    this.Project = shape;
    
  }

  ngOnInit() {
    this.displayMessage = "";
  }

  add() {
    this.projectsService.ProjectInsert(this.Project);

  }

}
