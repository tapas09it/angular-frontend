import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configuration: any;

  constructor(
    private httpClient: HttpClient
  ) { }

  setConfig(): Promise<any> {
    return this.httpClient
      .get<any>('./app-config.json')
      .toPromise()
      .then(config => this.configuration = config);
  }

  readConfig(): any {
    return this.configuration;
  }
}
