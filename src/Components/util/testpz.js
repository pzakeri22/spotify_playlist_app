// const link = 'https://example.com/callback#access_token=NwAExz...BV3O2Tk&token_type=Bearer&expires_in=3600&state=123';
// console.log(link);
// const accTokenMatch = link.match(/access_token=([^&]*)/);
// console.log(accTokenMatch);

// let token0 = accTokenMatch[1];
// console.log(token0);
// let token1 = accTokenMatch[1];
// console.log(token1);

const paragraph = 'The quick brown fox jumps over the lazy dog. It barked.';
const regex = /[A-Z]/g;
const found = paragraph.match(regex);

console.log(found);


getAccessToken() {
    if (accessToken) {
      console.log(1);
        return accessToken;
      } else {
         //After authorization, you will recieve an access token in the current webpage's url, e.g. https://example.com/callback#access_token=NwAExz...BV3O2Tk&token_type=Bearer&expires_in=3600&state=123
        //If the access token is not already set, check the URL to see if it has just been obtained.
        let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);   
        console.log(`aT v1 = ${accessTokenMatch}`);
        accessTokenMatch = 3;
        console.log(`aT v2 = ${accessTokenMatch}`);
        let expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        console.log(expiresInMatch);
        let expiresIn;
        console.log(2);
        // console.log(accessTokenMatch);
        // console.log(expiresInMatch);
        if(accessTokenMatch && expiresInMatch) {
            //the below ensures you set the access token as the token's value itself, because accessTokenMatch will return an array in the format of ["access_token = abc", "abc"]
            accessToken = accessTokenMatch[1];
            //the below clears the paramaters, allowing us to grab a new access token when it expires.
            expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken ="", expiresIn *1000);
            //1- To modify current URL and add / inject it (the new modified URL) as a new URL entry to history list, use pushState:
            // All the function does, is to add (push) a new "state" onto the browser history, so that in future, the user will be able to return to this state that the web-page is now in.
            //For example, if a user does a search "CATS" in one of your search boxes, and the results of the search (pictures of cats) are loaded back via AJAX, -- then your page state will not be changed. 
            //In other words, in the near future, when the user decides that he wants to go back to his search for "CATS", he won't be able to, because the state doesn't exist in his history. 
            //He will only be able to click back to your blank search box.
            //history.pushState({},"Results for `Cats`",'url.html?s=cats');
            //When the function is working properly, the only thing you should expect to see, is the address in your browser's address-bar change to whatever you specify in your URL.
            window.history.pushState('Access Token', null, '/');
            //if there is an access token youve just obtained from the url, return it. (This will happen before it expires as setTimeout is asynchronous)
            console.log(3);
            return accessToken;
        } else {
          //the below takes you to the page where you need to authorise, whcih give you the access token.The scope "playlist-modify-public" allows us to create & add to a user's playlists.
          console.log(4);
           const accessUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
          //  setTimeout( () => {
            console.log(4.5);
            window.location = accessUrl;
            console.log(window.location);
            console.log(window.location.href); //gives http://localhost:3000/
            console.log(5);
            accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);   
            console.log(window.location.href.match(/access_token=([^&]*)/));
            console.log(accessTokenMatch);
            console.log(6);
            expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
            console.log(7);
            accessToken = accessTokenMatch[1];  //doesnt execute this bit
            console.log(8);
            expiresIn = Number(expiresInMatch[1]);
            // window.setTimeout(() => accessToken ="", expiresIn *1000); //does this execute after the function is exited, or does exiting the function stop it?
            // window.history.pushState('Access Token', null, '/');
            console.log(88);
            return accessToken;  //(doesnt get here, must only set the )
          // }, 100000);

/*url set straight away.
But console.log 4 not working
after using settimeout, it works. until the timeout runs out, then it 

second section needs to happen on timeout.
*/
            }
        }

},


async savePlaylist(playlistName, trackURIs) {
  if (!playlistName || !trackURIs) {
    return;
  }
  const accessToken = Spotify.getAccessToken();    //does this  need to be this.getAccessToken()??
  // const headers = {headers: {Authorization: `Bearer ${accessToken}`}}
  let userID;
  let playlistID;

  async function updatePlaylist() {
    try {
      //online it looks like endpoint is `https://api.spotify.com/v1/playlists/${playlistID}/tracks` but i will use what codecademy said
      //https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks
      const response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
        headers: {Authorization: `Bearer ${accessToken}`},
        method: 'POST',
        body: JSON.stringify({uris: trackURIs})
      });
      if (response.ok) { 
        return;
      } 
      throw new Error('Request Failed!');  
    } catch (error) { 
      console.log(error); 
    }
  }
  updatePlaylist();

  function createPlaylist() {
    console.log(userID);
    fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      headers: {Authorization: `Bearer ${accessToken}`},
      method: 'POST',
      body: JSON.stringify({name: playlistName})
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      playlistID = jsonResponse.id;
    });
  }


  async function getID() {
    try {
      const response = await fetch(`https://api.spotify.com/v1/me`, 
      {headers: {Authorization: `Bearer ${accessToken}`}});
      console.log(response);
      if (response.ok) { 
        const jsonResponse = await response.json();
        userID = jsonResponse.id;
        console.log(userID);
        createPlaylist();
      } else {
        throw new Error(`Request Failed! ${response.status}, ${response.message}`);  
      }
    } catch (error) { 
      console.log(error); 
    }
  }
  getID();  

} 

v2 ;

savePlaylist(playlistName, trackURIs) {
  if (!playlistName || !trackURIs) {
    return;
  }
  const accessToken = Spotify.getAccessToken();    //does this  need to be this.getAccessToken()??
  const headers = {Authorization: `Bearer ${accessToken}`};
  let userID;
  let playlistID;

  async function asyncGetID() {
    const response = await fetch(`https://api.spotify.com/v1/me`, {
      headers: headers
    })
    let jsonResponse;
    if (response.ok) {
      jsonResponse = await response.json();
    }
    else {
      throw new Error(`Request Failed! ${response.status}, ${response.message}`);  
    }
    // console.log(jsonResponse.id);
    // console.log(jsonResponse);
    userID = jsonResponse.id;
  }


  function getID() {
    fetch(`https://api.spotify.com/v1/me`, {
      headers: headers
    }).then(response => {
      if (response.ok) {
        return response.json();
      } 
      throw new Error(`Request Failed! ${response.status}, ${response.message}`);  
    }).then(jsonResponse => {
      console.log(jsonResponse.id);
      userID = jsonResponse.id;
    })
  }

  function createPlaylist() {
    fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({name: playlistName})
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Request failed! ${response.status}, ${response.message}`);
    }).then(jsonResponse => {
      console.log('createPlaylist finished');
      playlistID = jsonResponse.id;
    });
  }

  function updatePlaylist() {
    //online it looks like endpoint is `https://api.spotify.com/v1/playlists/${playlistID}/tracks` but i will use what codecademy said
    //https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks
    fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({uris: trackURIs})
    })
    .then(response => {
      if (response.ok) { 
        return;
      } 
      throw new Error(`Request failed! ${response.status}, ${response.message}`);
    })
  }

  /*
*/
   async function save() {
    try {
      await asyncGetID();
      createPlaylist();


      //  createPlaylist();
      //  updatePlaylist();
        // setTimeout(getID, 1000);
        // setTimeout(createPlaylist, 5000);
        // setTimeout(updatePlaylist, 9000);
    } catch (error) { 
      console.log(error); 
    }
  }

   save();

} 

SPOTIFY_PLAYLIST_APP.surge.sh

