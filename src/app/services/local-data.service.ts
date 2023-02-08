import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  constructor() { }

  // return color as per appStatusType
  getAppStatusTypeColor(appStatusType) {
    if (appStatusType === 0)
      return 'maroon';
    else if (appStatusType === 1)
      return 'blue';
    else if (appStatusType === 2)
      return 'green';
    else if (appStatusType === 3)
      return 'red';
    else if (appStatusType === 6) // Closed
      return 'orange';
    else
      return 'purple';
  }

  // return country collection
  getCountries(): Array<string> {
    let Countries: string[] = [];
    Countries.push("Canada");
    Countries.push("USA");
    Countries.push("Mexico");
    Countries.push("England");
    Countries.push("India");
    return Countries;
  }  

  // return province collection
  getProvinces(): Array<string>{
    let provinces: string[] = [];
    provinces.push("MB");
    provinces.push("ON");
    provinces.push("AB");
    provinces.push("SK");
    provinces.push("BC");
    return provinces;
  }

  // return city collection as per province input
  getCities(province: string): Array<string> {
    let cities: string[] = [];

    if (province == "MB") {
      cities.push("Winnipeg");
      cities.push("Brandon");
    }
    else if (province == "ON") {
      cities.push("Toronto");
      cities.push("Missisauga");
      cities.push("Brampton");
      cities.push("London");
    }
    else if (province == "AB") {
      cities.push("Calgary");
      cities.push("Edmonton");
    }
    else if (province == "BC") {
      cities.push("Vancouver");
      cities.push("Burnaby");
    }
    else if (province == "SK") {
      cities.push("Saskatoon");
      cities.push("Regina");
    }
    return cities;
  }
}
