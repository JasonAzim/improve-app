import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectService } from '../services/project.service';
import { ProjectShape } from '../shapes/project.shape';

@Component({
  selector: 'app-project-edit',
  templateUrl: './projectEdit.component.html',
  providers: [ProjectService],
  styleUrls: ['./components.css']
})
export class ProjectEditComponent implements OnInit {
  Project: ProjectShape;
  action: string;
  id: string = "";
  displayMessage: string = "Processing...";
  
  constructor(private route: ActivatedRoute, @Inject('BASE_URL') baseUrl: string, private projectsService: ProjectService) {
   
  }

  getQueryParameters() {

    this.route.queryParams
    .subscribe(params => {
      console.log(params);

      this.action = params.action;
      this.id = params.id;

      if(this.action != "" && this.id != "")
      {
        this.displayMessage = this.action + this.id;
      } else {
        this.displayMessage = "Incorrect URL.";
      }

      console.log(this.action); 
      console.log(this.id);
    });
  
  }

  ngOnInit() {
    this.getQueryParameters();
    this.ProjectGet();
  }

  ProjectGet(): void {
    this.projectsService.ProjectGet(this.id)
      .subscribe(Project => 
        { 
          this.Project = Project; 
          console.log(this.Project);
        }
      );
  }

  edit() {
    
  }

}
