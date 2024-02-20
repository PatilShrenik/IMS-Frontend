// import WebSocket from '@vertx/eventbus-bridge-client.js';

// const handlers = {
//   onConnect: () => {},
//   onReconnect: () => {},
//   onDisconnect: () => {},
//   onEvent: (data: any) => {}
// };

// class SocketHandler {
//   url: string
//   sessionID: string | number
//   _excludedEvents: any[]
//   socket: any

//   constructor(url: string, sessionID: string | number, onConnect: () => void, onReconnect: () => void, onDisconnect: () => void, onEvent: () => void) {
//     this.url = url;
//     this.sessionID = sessionID;
//     handlers.onConnect = onConnect;
//     handlers.onReconnect = onReconnect;
//     handlers.onDisconnect = onDisconnect;
//     handlers.onEvent = onEvent;
//     this._excludedEvents = [];

//     this.eventListener = this.eventListener.bind(this);
//   }

//   setExcludedEvents(events: any[]) {
//     this._excludedEvents = events;
//   }

//   connect() {
//     this.socket = new WebSocket(this.url, {
//       transports: 'websocket'
//     });

//     this.socket.enableReconnect(true);

//     this.socket.onopen = () => {
//       if (handlers.onConnect) {
//         handlers.onConnect();
//       }
//       this.registerHandler(this.sessionID);
//     };

//     this.socket.onreconnect = () => {
//       if (handlers.onReconnect) {
//         handlers.onReconnect();
//       }
//     };

//     this.socket.onerror = this.handleError.bind(this);

//     this.socket.onclose = () => {
//       if (handlers.onDisconnect) {
//         handlers.onDisconnect();
//       }
//     };
//   }

//   registerHandler(sessionID: string | number) {
//     // listens to client events
//     this.socket.registerHandler('client.event', this.eventListener.bind(this));

//     // listens to session events
//     this.socket.registerHandler(`session.event.${sessionID}`, this.eventListener.bind(this));
//   }

//   async eventListener(error: any, payload: any) {
//     if (error) {
//       return this.handleError(error);
//     }

//     setTimeout(async () => {
//       const eventType = payload.body['event.type'];
//       if (this._excludedEvents.includes(eventType)) {
//         return;
//       }

//       if (handlers.onEvent) {
//         handlers.onEvent({ eventType, payload });
//       }
//     });
//   }

//   send(event: any, message: any) {
//     this.socket.send(event, message);
//   }

//   handleError(error: any) {
//     console.error('websocket error', error);
//     throw error;
//   }

//   disconnect() {
//     this.socket.close();
//     this.socket = null;
//   }
// }

// let instance: any = null;

// export function create(url: any, sessionId: any, ...handlers: any[]) {
//   instance = new SocketHandler(url, sessionId, ...handlers);
//   instance.connect();
// }

// export function setExcludedEvents(events: any) {
//   if (!instance) {
//     throw new Error('connect websocket before performing actions');
//   }
//   instance.setExcludedEvents(events);
// }

// export function sendToServer(channel: any, message: any) {
//   if (!instance) {
//     throw new Error('connect websocket before performing actions');
//   }
//   instance.send(channel, message);
// }

// export function disconnect() {
//   if (!instance) {
//     throw new Error('connect websocket before performing actions');
//   }
//   instance.disconnect();
// }

import React from 'react'

function SocketHandler() {
  return (
    <div>SocketHandler</div>
  )
}

export default SocketHandler
