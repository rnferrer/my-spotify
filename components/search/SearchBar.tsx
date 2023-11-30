'use client'

import { ChangeEvent, useState } from "react"
import { List, ListItem, ListItemText, ListItemButton, ListItemAvatar ,TextField, Avatar } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SpotifyPlayer from "react-spotify-web-playback";

export const colorTheme = createTheme({
  palette:{
    primary: {
      main: '#5fcd5e',
      light: '#7fd77e',
      dark: '#428f41',
      contrastText: '#fff'
    },
    text: {
      primary: '#5fcd5e'
    },
    background: {
      gray: '#C0C0C0'
    }
  }
})

const SearchBar = ():JSX.Element => {
  
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;

    return function () {
      const context = this;
      const args = arguments;

      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };

  const handleSearch = debounce(async() => {
    console.log(`Searching for '${search}'`);
      if (search.replace(/\s/g, '').length === 0){
        setResults([]);
      }
      else{
        const queryString = new URLSearchParams({searchQuery: search}).toString();
        const url = `/api/spotify/search?${queryString}`;
        const response = await fetch (url);
        let data = await response.json();
        setResults(data);
        console.log(data);
      }
  }, 1000)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    setSearch(value);
    handleSearch();
  }

  return(
    <ThemeProvider theme={colorTheme}>
      <div className="w-full h-auto flex justify-center items-center relative">
        <div className="flex flex-col w-1/2 items-center fixed top-1/3 left-1/4">
          <TextField 
          color="primary"
          className="w-full"
          onChange={(e) => handleChange(e)}
          label="Search song to queue"
          InputProps={{ style: {color:'white'} }}
          focused
          />
          { search === '' || results.length === 0
          ?
          <>
          </>
          :
          <List sx={{ width: '100%', bgcolor: 'background.gray' }}>
            {(results.length > 0)
            ?
            results.map((result: any, index) => (
              <ListItem
                key={index}
                disableGutters
                disablePadding={true}
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      src={result.image.url}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={`${result.name} - ${result.artists[0].name} `} />

                </ListItemButton>
              </ListItem>
            ))
            :
            <></>
            }
          </List>

          }

        </div>
        <SpotifyPlayer/>
      </div>

    </ThemeProvider>
  )
};

export default SearchBar;