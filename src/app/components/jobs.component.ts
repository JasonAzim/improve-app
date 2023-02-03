import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JobService } from '../services/job.service';
import { JobShape } from '../shapes/job.shape';

@Component({
  selector: 'app-contact',
  templateUrl: './jobs.component.html',
  providers: [JobService],
  styleUrls: ['./components.css']
})
export class JobComponent implements OnInit {
  public Jobs: JobShape[];

  constructor(private route: ActivatedRoute, @Inject('BASE_URL') baseUrl: string, private jobsService: JobService) {
    
  }

  ngOnInit() {
    this.JobGetAll();
  }

  JobGetAll(): void {
    this.jobsService.JobGetAll()
      .subscribe(Jobs => (this.Jobs = Jobs));
  }

  refresh() {
    window.alert('The data has been refreshed');
  }

  edit(job: JobShape) {
    console.log(job.JobID);
  }
}