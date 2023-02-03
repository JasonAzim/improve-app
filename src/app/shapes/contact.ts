export class Contact {
    ContactID: number;
    ContactName: string;
    CompanyName: string;
    City: string;
    State: string;
    WorkPhone: string;
    Email: string;
    CompanyUrl: string;
      
    constructor() {
      this.ContactID = 0;
      this.ContactName = "";
      this.CompanyName = "";
      this.City = "";
      this.State = "";
      this.WorkPhone = "";
      this.Email = "";
      this.CompanyUrl = "";
    }
  }