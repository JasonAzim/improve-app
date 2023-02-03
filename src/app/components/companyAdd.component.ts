import { Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StateService } from '../services/state.service';
import { StateShape } from '../shapes/state.shape';

import { CityService } from '../services/city.service';
import { CityShape } from '../shapes/city.shape';

import { CompanyService } from '../services/company.service';
import { CompanyShape } from '../shapes/company.shape';

@Component({
  selector: 'app-company-add',
  templateUrl: './companyAdd.component.html',
  providers: [CompanyService],
  styleUrls: ['./components.css']
})
export class CompanyAddComponent implements OnInit {
  Company: CompanyShape;
  displayMessage: string = "Processing...";
  States: StateShape[];
  State: StateShape;
  Citys: string[];
  City: string;

  constructor(private route: ActivatedRoute, @Inject('BASE_URL') baseUrl: string, private companiesService: CompanyService, private statesService: StateService, private citysService: CityService) {
   console.log(baseUrl);
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

  ngOnInit() {
    this.displayMessage = "";
  }

  add() {
    console.log(this.Company.Name);
    this.companiesService.CompanyInsert(this.Company);
  }

}
