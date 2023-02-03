import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CompanyService } from '../services/company.service';
import { CompanyShape } from '../shapes/company.shape';

@Component({
  selector: 'app-company',
  templateUrl: './companys.component.html',
  providers: [CompanyService],
  styleUrls: ['./components.css']
})
export class CompanyComponent implements OnInit {
  public Companys: CompanyShape[];

  constructor(private route: ActivatedRoute, @Inject('BASE_URL') baseUrl: string, private companiesService: CompanyService) {

  }

  ngOnInit() {
    this.CompanyGetAll();
  }

  CompanyGetAll(): void {
    this.companiesService.CompanyGetAll()
      .subscribe(Companys => (this.Companys = Companys));
  }

  refresh() {
    window.alert('The data has been refreshed');
  }

  edit(company: CompanyShape) {
    console.log(company.CompanyID);
  }

}