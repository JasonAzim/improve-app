import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StateService } from '../services/state.service';
import { StateShape } from '../shapes/state.shape';

import { CityService } from '../services/city.service';
import { CityShape } from '../shapes/city.shape';

import { JobService } from '../services/job.service';
import { JobShape } from '../shapes/job.shape';

@Component({
  selector: 'app-job-add',
  templateUrl: './jobAdd.component.html',
  providers: [JobService],
  styleUrls: ['./components.css']
})
export class JobAddComponent implements OnInit {
  Job: JobShape;
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

  ngOnInit() {
    this.displayMessage = "";
  }
  
  add() {
    this.jobsService.JobInsert(this.Job);

  }

}
