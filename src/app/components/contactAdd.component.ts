import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StateService } from '../services/state.service';
import { StateShape } from '../shapes/state.shape';

import { CityService } from '../services/city.service';
import { CityShape } from '../shapes/city.shape';

import { ContactService } from '../services/contact.service';
import { ContactShape } from '../shapes/contact.shape';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contactAdd.component.html',
  providers: [ContactService],
  styleUrls: ['./components.css']
})
export class ContactAddComponent implements OnInit {
  Contact: ContactShape;
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

  ngOnInit() {
    this.displayMessage = "";
  }
  
  add() {    
    this.contactsService.ContactInsert(this.Contact);

  }

}