import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalDataService } from './local-data.service';
import ResumeUpload from '../models/resumeUpload';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public API = 'https://localhost:44328';
  public JobApplication_API = `${this.API}/api/JobApplication`;
  public JobResume_API = `${this.API}/api/JobResume`;
  public ResumeCreator_API = `${this.API}/api/ResumeCreator`;

  constructor(private http: HttpClient, public localDataService: LocalDataService) { }

  //// follow-up
  // get all jobApplications
  getAllJobApps(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.JobApplication_API + '/getAllJobApps');
  }
  // get app-status-type
  getAppStatusTypes(): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.JobApplication_API + '/getAppStatusTypes');
  }
  // view jobApplication
  viewJobApp(jobAppId): Observable<any> {
    return this.http.get<any>(this.JobApplication_API + '/viewJobApp/'+jobAppId);
  }
  // edit jobApplication
  editJobApp(jobAppData): Observable<any> {
    return this.http.post(this.JobApplication_API + '/editJobApp', jobAppData)
  }
  // delete jobApplication
  deleteJobApp(jobAppData): Observable<any> {
    return this.http.post(this.JobApplication_API + '/deleteJobApp', jobAppData)
  }
  // add jobApplication
  addJobApp(jobAppData): Observable<any> {
    return this.http.post(this.JobApplication_API + '/addJobApp', jobAppData)
  }
  // track jobApplication
  trackJobApp(jobAppId): Observable<any> {
    return this.http.get<any>(this.JobApplication_API + '/trackJobApp/' + jobAppId);
  }

  // resume-upload
  uploadResume(resumeUpload: ResumeUpload): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    // formData.append('file', resumeUpload.resumeFile);
    formData.append('resumeFile', resumeUpload.resumeFile);
    formData.append('jobApplicationId', resumeUpload.jobApplicationId.toString());
    // formData.append('jobApplicationId', "invalid-object-property");

    const req = new HttpRequest('POST', `${this.JobResume_API}/uploadResume`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
  // resume-download
  downloadResume(jobApplicationId: number): Observable<Blob> {
    return this.http.get<Blob>(this.JobResume_API + '/downloadResume/'+jobApplicationId,
      { responseType: 'blob' as 'json' });
  }

  // create and download resume
  createAndDownloadResume(myResume): Observable<Blob> {
    return this.http.post<Blob>(this.ResumeCreator_API + '/createAndDownloadResume',myResume,
      { responseType: 'blob' as 'json' });
  }
  // create and email resume
  createAndEmailResume(myResume): Observable<string> {
    return this.http.post<string>(this.ResumeCreator_API + '/createAndEmailResume', myResume,
      { responseType: 'string' as 'json' });
  }

  // view-user-resume-download-data
  // get all userResumeCreate
  getUserResumeDownloadData(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.ResumeCreator_API + '/getUserResumeDownloadData');
  }
  // view-user-resume-email-data
  // get all userResumeEmail
  getUserResumeEmailData(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.ResumeCreator_API + '/getUserResumeEmailData');
  }
}
