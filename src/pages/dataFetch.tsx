import TailBreadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import useSWR from 'swr'
import axios from 'axios'
import { useState,useEffect } from 'react';
import { io } from 'socket.io-client';

import TestList, { testListColumn } from "../components/TaskInfo/TestList";

const socket = io('http://localhost:8123');

export default function DataFetch(){
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
const socket = io('http://localhost:8123');

    // Listen for 'dataUpdate' event
    socket.on('timestamp', (receivedData) => {
      const newTS = receivedData
      console.log(newTS)
      setFooEvents((prevFooEvents)=>{
        const updateTs = [newTS,...prevFooEvents];
        return updateTs.slice(0,20)
      }); // Update component state with received data
    });

    // Cleanup function to close the connection when component unmounts
    return () => socket.close();
  }, []);

  return (
    <DefaultLayout>
      <TailBreadcrumb pageName="Fetch" />
        <ConnectionState isConnected={ isConnected } />
        <Events events={ fooEvents } />
        <ConnectionManager />
        <MyForm />
    </DefaultLayout>
  );
};

function ConnectionState({ isConnected }) {
  return <p>State: { '' + isConnected }</p>;
}

function Events({ events }) {
  return (
    <ul>
    { String(events) ==='[]' ?
      " " 
      :(events.map((event, index) =>
        <li key={ index }>{ event }</li>
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

function MyForm() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(5000).emit('create-something', value, () => {
      setIsLoading(false);
    });
  }

  return (
    <form onSubmit={ onSubmit }>
      <input onChange={ e => setValue(e.target.value) } />

      <button type="submit" disabled={ isLoading }>Submit</button>
    </form>
  );
}

