import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectService } from '../services/project.service';
import { ProjectShape } from '../shapes/project.shape';

@Component({
  selector: 'app-contact',
  templateUrl: './projects.component.html',
  providers: [ProjectService],
  styleUrls: ['./components.css']
})
export class ProjectComponent implements OnInit {
  public Projects: ProjectShape[];

  constructor(private route: ActivatedRoute, @Inject('BASE_URL') baseUrl: string, private projectsService: ProjectService) {
    
  }

  ngOnInit() {
    this.ProjectGetAll();
  }

  ProjectGetAll(): void {
    this.projectsService.ProjectGetAll()
      .subscribe(Projects => (this.Projects = Projects));
  }

  refresh() {
    window.alert('The data has been refreshed');
  }

  edit(project: ProjectShape) {
    console.log(project.ProjectID);
  }
}