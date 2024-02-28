import { Injectable } from '@angular/core';

import { io } from "socket.io-client";
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketFacadeService {
    private url = 'http://localhost:3000';

    constructor(  private http:HttpClient) {
        //this.socket = io(this.url);
      
    }

    createEventSource(){
      const evtSource = new EventSource("https://localhost:7205/subscribeToStream");

      // return new Observable(observer => {
      //     eventSource.onmessage = event => {
      //       const messageData: any = JSON.parse(event.data);
      //       console.log(messageData);
      //       observer.next(messageData);
      //   };
      // });
      
      evtSource.onmessage = (e) => {
        console.log('connection message');
         console.log(e.data);
     }
     evtSource.onerror = (e) => {
        console.log('connection error');
         console.log(e);
         evtSource.close();
     }
     evtSource.onopen = (e) => {
        console.log('connection open');
         console.log(e);
     }

     evtSource.addEventListener("hbevent",(res:any)=>{
      console.log(res);
    })
   }

   

}
