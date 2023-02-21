import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  constructor() { }

  private Education;
  setEducation(val) {
    this.Education = val;
  }
  getEducation() {
    return this.Education;
  }

  private WorkExperience;
  setWorkExperience(val) {
    this.WorkExperience = val;
  }
  getWorkExperience() {
    return this.WorkExperience;
  }

  private Skills;
  setSkills(val) {
    this.Skills = val;
  }
  getSkills() {
    return this.Skills;
  }

  private PersonalInfo;
  setPersonalInfo(val) {
    this.PersonalInfo = val;
  }
  getPersonalInfo() {
    return this.PersonalInfo;
  }

  private AppStatusTypes;
  setAppStatusTypes(val) {
    this.AppStatusTypes = val;
  }
  getAppStatusTypes() {
    return this.AppStatusTypes;
  }

  private JobApps;
  setJobApps(val) {
    this.JobApps = val;
  }
  getJobApps() {
    return this.JobApps;
  }

  // return color as per appStatusType
  /*
    public enum AppStatusType
    {
        Applied,
        Follow_Up,
        Client_Response,
        Interview_Setup,
        Interview_Done,
        Final_Result,
        Closed
    }
  */
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

  getAppStatusInPercentage(appStatusType) {
    // .Applied
    if (appStatusType === 0)
      return '25% [Applied]';
    // .Follow_Up 
    else if (appStatusType === 1)
      return '35% [Follow_Up]';
    // .Client_Response 
    else if (appStatusType === 2)
      return '50% [Client_Response]';
    // .Interview_Setup
    else if (appStatusType === 3)
      return '70% [Interview_Setup]';
    // .Interview_Done 
    else if (appStatusType === 4)
      return '80% [Interview_Done]';
    // .Final_Result 
    else if (appStatusType === 5)
      return '90% [Final_Result]';
    // .Closed 
    else
      return '100% [Closed]';
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
  getProvinces(): Array<string> {
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

  
  // 400
  display400andEx(error, componentName): string[] {
    var errors = [];
    if (error.error != null) {
      for (var key in error.error) {
        errors.push(error.error[key]);
      }
    } else {
      errors.push('[' + componentName + '] Data Not Found ! / Bad Request !');
    }
    return errors;
  }

  // check 
  isObjectNullORUndefinedOREmpty(personalInfo, skills, workExperience, education){
    if (personalInfo === null || personalInfo === undefined || skills === null || skills === undefined || workExperience === null || workExperience === undefined || education === null || education === undefined || education.length<1 || skills.length<1 || workExperience.length<1)
      return true;
    else
      return false;
  }
}
