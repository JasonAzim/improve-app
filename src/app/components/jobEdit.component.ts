import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StateService } from '../services/state.service';
import { StateShape } from '../shapes/state.shape';

import { CityService } from '../services/city.service';
import { CityShape } from '../shapes/city.shape';

import { JobService } from '../services/job.service';
import { JobShape } from '../shapes/job.shape';

@Component({
  selector: 'app-job-edit',
  templateUrl: './jobEdit.component.html',
  providers: [JobService],
  styleUrls: ['./components.css']
})
export class JobEditComponent implements OnInit {
  Job: JobShape;
  action: string;
  id: string = "";
  displayMessage: string = "Processing...";
  States: StateShape[];
  State: StateShape;
  Citys: string[];
  City: string;
  
  constructor(private route: ActivatedRoute, @Inject('BASE_URL') baseUrl: string, private jobsService: JobService, private statesService: StateService, private citysService: CityService) {
    var shape = {} as JobShape;
    this.Job = shape; 
    this.statesService.StateGetAll()
       .subscribe(States => 
         {
           this.States = States;
           this.State =  States[0];
           //console.log(this.State);
         });
 
     this.citysService.CityGetAll()
       .subscribe(Citys => 
         {
           this.Citys = Citys;
           this.City = Citys[0];
           console.log(this.City);
         });

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
    this.JobGet();
  }

  JobGet(): void {
    this.jobsService.JobGet(this.id)
      .subscribe(Job => 
        { 
          this.Job = Job; 
          console.log(this.Job);
        }
      );
  }

  edit() {
    
  }

}
