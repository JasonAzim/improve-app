import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StateService } from '../services/state.service';
import { StateShape } from '../shapes/state.shape';

import { CityService } from '../services/city.service';
import { CityShape } from '../shapes/city.shape';

import { CompanyService } from '../services/company.service';
import { CompanyShape } from '../shapes/company.shape';

@Component({
  selector: 'app-company-edit',
  templateUrl: './companyEdit.component.html',
  providers: [CompanyService],
  styleUrls: ['./components.css']
})
export class CompanyEditComponent implements OnInit {
  Company: CompanyShape;
  action: string;
  id: string = "";
  displayMessage: string = "Processing...";
  States: StateShape[];
  State: StateShape;
  Citys: string[];
  City: string;
  
  constructor(private route: ActivatedRoute, @Inject('BASE_URL') baseUrl: string, private companiesService: CompanyService, private statesService: StateService, private citysService: CityService) {
   var shape = {} as CompanyShape;
   this.Company = shape;
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
        this.displayMessage = "Edit ";
      } else {
        this.displayMessage = "Parameters Error ";
      }

      console.log(this.action); 
      console.log(this.id);
    });
  
  }

  ngOnInit() {
    this.getQueryParameters();
    this.CompanyGet();
  }

  CompanyGet(): void {
    this.companiesService.CompanyGet(this.id)
      .subscribe(Company => 
        { 
          this.Company = Company; 
          console.log(this.Company);
          this.displayMessage = this.displayMessage + this.Company.Name;
        }
      );
  }

  edit() {
    
  }

}
