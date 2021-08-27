import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, delay} from "rxjs/operators";


export interface UserFull {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string,
    },
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}

export interface User {
  id: number
  name: string
  email: string
  city: string
  phone: string
}

export module UserBeta {
  export interface Main {
    id: number
    name: string
    email: string
    city: string
    phone: string
  }

  export interface Geo {
    lat: string;
    lng: string;
  }

  export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo | object;
  }

  export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
  }

  export interface RootObject {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
  }
}


@Injectable({
  providedIn: 'root'
})

export class UsersServerService {

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<UserFull> {
    return this.http.get<UserFull>(`https://jsonplaceholder.typicode.com/users/${id}`)
      .pipe(
        delay(1000),
        catchError((error) => {
          console.log('Error fetchUser: ', error.message)
          return throwError(error)
        }))
  }

  fetchUsers(start: number | string, limit: number | string): Observable<UserFull[]> {
    let params = new HttpParams()
      .append('_start', start.toString())
      .append('_limit', limit.toString())

    return this.http.get<UserFull[]>('https://jsonplaceholder.typicode.com/users', {
      params
    })
      .pipe(
        delay(3000),
        catchError((error) => {
          console.log('Error fetchUsers: ', error.message)
          return throwError(error)
        }))
  }

}
