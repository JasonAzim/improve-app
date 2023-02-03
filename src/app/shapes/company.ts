export class Company {
    CompanyID: number;
    Name: string;
    AddressLine1: string;
    City: string;
    State: string;
    PostalCode: string;
    Url: string;
      
    constructor() {
      this.CompanyID = 0;
      this.Name = "";
      this.AddressLine1 = "";
      this.City = "";
      this.State = "";
      this.PostalCode = "";
      this.Url = "";
    }
  }