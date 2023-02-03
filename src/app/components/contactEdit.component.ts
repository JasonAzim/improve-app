import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StateService } from '../services/state.service';
import { StateShape } from '../shapes/state.shape';

import { CityService } from '../services/city.service';
import { CityShape } from '../shapes/city.shape';

import { ContactService } from '../services/contact.service';
import { ContactShape } from '../shapes/contact.shape';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contactEdit.component.html',
  providers: [ContactService],
  styleUrls: ['./components.css']
})
export class ContactEditComponent implements OnInit {
  Contact: ContactShape;
  action: string;
  id: string = "";
  displayMessage: string = "Processing...";
  States: StateShape[];
  State: StateShape;
  Citys: string[];
  City: string;
  
  constructor(private route: ActivatedRoute, @Inject('BASE_URL') baseUrl: string, private contactsService: ContactService, private statesService: StateService, private citysService: CityService) {
    var shape = {} as ContactShape;
    this.Contact = shape; 
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
        this.displayMessage = "Incorrect URL.";
      }

      console.log(this.action); 
      console.log(this.id);
    });
  
  }

  ngOnInit() {
    this.getQueryParameters();
    this.ContactGet();
  }

  ContactGet(): void {
    this.contactsService.ContactGet(this.id)
      .subscribe(Contact => 
        { 
          this.Contact = Contact; 
          console.log(this.Contact);
        }
      );
  }

  edit() {
    
  }

}
