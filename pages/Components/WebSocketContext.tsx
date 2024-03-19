import React, { createContext, useEffect, useRef, useState } from "react";
import { baseURL } from "@/constants";
import WebSocket from "@vertx/eventbus-bridge-client.js";
// import WebSocket from "./eventbus-bridge-clients.js"

const WebSocketContext = createContext<{
  emit: (event: String, value: any) => void;
  Subscribe: (subID: String, eventType: String, callback: any) => void;
  unsubscribe: (subID: String, eventType: String) => void;
  connection: Boolean;
}>({
  emit: () => {},
  Subscribe: () => {},
  unsubscribe: () => {},
  connection: false,
});

export const WebSocketContextProvider: React.FC<any> = ({ children }: any) => {
  const socket = useRef<any>(null);
  const [subs, setSubs] = useState<any>({});
  const [connection, setConnection] = useState<any>(false);
  // const [broadcastPayload, setBroadcastPayload] = useState({});
  function Broadcast(error: any, event: any) {
    // console.log("event.body",event.body);
    // console.log("subs", subs);
    {
      error && console.error(error);
    }
    let eventType = event.body?.["event.type"];
    // console.log("incoming data", event, subs)
    if (subs[eventType] && subs[`${eventType}`].length) {
      subs[eventType]?.forEach((sub: any) => {
        console.log("incoming Data", event.body);
        sub.callback(event.body);
      });
    }
  }

  useEffect(() => {
    // socket.current = new WebSocket(baseURL + "/eventbus", ["websocket"]);
    socket.current = new WebSocket(baseURL + "/eventbus", {
      transports: "websocket",
    });
    socket.current.enableReconnect(true);
    socket.current.onopen = () => {
      console.log("Connection open");
      setConnection(true);
      socket.current.registerHandler("client.event", Broadcast);
    };
    socket.current.onclose = () => {
      console.log("Connection close");
      setConnection(false);
    };
  }, []);

  function emit(eventType: String, data: any) {
    try {
      if (eventType) {
        data["event.type"] = eventType;
        console.log("Emit - ", data);
        socket.current.send("server.event", data);
      } else {
        console.warn("Event type is not defined");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const Subscribe = (subID: String, eventType: String, callback: any) => {
    console.log("PEHLE", subs, subID, eventType);
    if (subs[`${eventType}`] && subs[`${eventType}`].length) {
      if (!subs[`${eventType}`].find((item: any) => item.id === subID)) {
        subs[`${eventType}`].push({
          id: subID,
          callback: callback,
        });
        console.log("subscribed: " + subID + " - " + eventType);
      } else {
        console.warn(
          "duplicate subscribe request : " + subID + " - " + eventType
        );
      }
    } else {
      subs[`${eventType}`] = [
        {
          id: subID,
          callback: callback,
        },
      ];
      console.log("subscribed: " + subID + " - " + eventType);
      // console.log("Baad me: ", subs);
      setSubs(subs);
    }
  };

  const unsubscribe = (subID: String, eventType: String) => {
    // socket.current?.close();
    // console.log("subs",subs)
    if (subs[`${eventType}`] && subs[`${eventType}`].length) {
      let index = subs[`${eventType}`]?.findIndex(
        (item: any) => item.id === subID
      );

      if (index !== -1) {
        subs[`${eventType}`].splice(index, 1);
        console.log("unsubscribed: " + subID + " - " + eventType);

        if (subs[`${eventType}`].length === 0) {
          delete subs[`${eventType}`];
        }
      } else {
        console.warn("invalid unsubscribe id: " + subID + " - " + eventType);
      }
    } else {
      console.warn("invalid unsubscribe event: " + subID + " - " + eventType);
    }
  };

  return (
    <WebSocketContext.Provider
      value={{
        emit,
        Subscribe,
        unsubscribe,
        connection,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => React.useContext(WebSocketContext);

export default WebSocketContextProvider;
