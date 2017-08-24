import {Injectable} from '@angular/core';
import {StompService} from 'ng2-stomp-service-fixed';
import {SERVER_URL} from "../../app.constants";
@Injectable()
export class WebSocketService {

  constructor(private stomp: StompService) {
  }
  private subscribtions = [];
  public queuePromises :any;
  public  connect() {
    this.stomp.configure({
      host: SERVER_URL+'/websocket',
      debug: true,
      queue: {'init': true}
    });
    return this.stomp.startConnect();
  }

  public subscribe(subscribe: string,callback:(data:any)=>void){

    // this.stomp.afterConnection().then(() => {
      this.subscribtions.push(this.stomp.subscribe(subscribe,(result)=>{
        callback(result);
      }))

      // }
    // );



  }

  public unsubscribe() {
    // this.stomp.startConnect().then(() => {
    for (let i = 0 ; i < this.subscribtions.length ; i ++) {
      this.subscribtions[i].unsubscribe();
    }

  }

  public disconnect(callback: any) {
    // this.stomp.startConnect().then(() => {
    if(this.stomp)
      this.stomp.disconnect().then(() => {
          callback();
        })
      // }
    // );

  }

  public stopWebsocket () {
    this.unsubscribe();
    // this.disconnect(null);
  }

}
