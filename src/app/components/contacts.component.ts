import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContactService } from '../services/contact.service';
import { ContactShape } from '../shapes/contact.shape';

@Component({
  selector: 'app-contact',
  templateUrl: './contacts.component.html',
  providers: [ContactService],
  styleUrls: ['./components.css']
})
export class ContactComponent implements OnInit {
  public Contacts: ContactShape[];

  constructor(private route: ActivatedRoute, @Inject('BASE_URL') baseUrl: string, private contactsService: ContactService) {
    
  }

  ngOnInit() {
    this.ContactGetAll();
  }

  ContactGetAll(): void {
    this.contactsService.ContactGetAll()
      .subscribe(Contacts => (this.Contacts = Contacts));
  }

  refresh() {
    window.alert('The data has been refreshed');
  }

  edit(contact: ContactShape) {
    console.log(contact.ContactID);
  }
}