import TailBreadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import useSWR from 'swr'
import axios from 'axios'
import { useState,useEffect } from 'react';
import { io } from 'socket.io-client';
import { baseUrl } from '../api'


import TestList, { testListColumn } from "../components/TaskInfo/TestList";

const socket = io(baseUrl)

export default function DataFetch(){
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

const time = Date.now()

 useEffect(() => {
  // no-op if the socket is already connected
  socket.connect();

  return () => {
    socket.disconnect();
  };
}, []);

useEffect(() => {
  function onFooEvent(value) {
    setFooEvents(fooEvents.concat(value));  
  }

  socket.on('event', onFooEvent);

  return () => {
    socket.off('event', onFooEvent);
  };
}, [fooEvents]);

  return (
    <DefaultLayout>
      <TailBreadcrumb pageName="Fetch" />
        <ConnectionState isConnected={ isConnected } />
        <Events events={ fooEvents } />
        <ConnectionManager />
    </DefaultLayout>
  );
};

function ConnectionState({ isConnected }) {
  return <p>State: { '' + isConnected }</p>;
}

function Events({ events }) {
  console.log(events)
  return (
    <ul>
    { String(events) ==='[]' ?
      " " 
      :(events.map((event, index) =>
        <li key={ index }>{ String(event.time) }</li>
      ) )
    }
    </ul>
  );
}

function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <>
      <button onClick={ connect }>Connect</button>
      <button onClick={ disconnect }>Disconnect</button>
    </>
  );
}


