import logo from './logo.svg';
import './App.css';
import Amplify, {API, graphqlOperation} from 'aws-amplify';
import awsconfig from './aws-exports';
import {AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { listSongs } from './graphql/queries';
import { useEffect, useState } from 'react';
import {Paper, IconButton} from '@material-ui/core'

import PlayArrowIcon from '@material-ui/icons/PlayArrow';

Amplify.configure(awsconfig);

function App() {

  const [songs, setSongs] = useState([])

  useEffect(()=> {
    fetchSong()
  },[])

  const fetchSong = async () => {
    try {
      const songData = await API.graphql(graphqlOperation(listSongs))
      const songList = songData.data.listSongs.items
      console.log('song list ',songList);
      setSongs(songList)
    } catch (error) {
      console.log('error on fetching songs ',error);
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <AmplifySignOut />
        <h2>Thisara Manohara</h2>
      </header>
      <div className="songList">
        { songs.map(song => {
          return (
            <Paper variant='outlined' elevation={2}>
              <div className="songCard">
                <IconButton aria-label="play">
                  <PlayArrowIcon />
                </IconButton>
              </div>
            </Paper>
          )
        })}
      </div>
    </div>
  );
}

export default withAuthenticator(App);
