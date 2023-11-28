'use client'

import { ChangeEvent, useState } from "react"
import { List, ListItem, ListItemText, ListItemButton, ListItemAvatar ,TextField, Avatar } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
  
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])

  //need to implement using debounce to delay too many simultaneous requests
  const handleChange = async(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    event.preventDefault()
    setSearch(event.target.value)
    
    if (search.replace(/\s/g, '').length === 0){
      setResults([])
    }
    else{
      const queryString = new URLSearchParams({searchQuery: search}).toString();
      const url = `/api/spotify/search?${queryString}`;
      const response = await fetch (url);
      let data = await response.json()
      setResults(data)
      console.log(data)
    }
  }


  return(
    <ThemeProvider theme={colorTheme}>
      <div className="w-full h-auto flex justify-center items-center">
        <div className="flex flex-col w-1/2 items-center absolute">
          <TextField 
          color="primary"
          className="w-full"
          onChange={(e) => handleChange(e)}
          label="Search song to queue"
          InputProps={{ style: {color:'white'} }}
          focused
          />
          { results.length === 0 
          ?
          <>
          </>
          :
          <List sx={{ width: '100%', bgcolor: 'background.gray' }}>
            {results.map((result) => (
              <ListItem
                key={result}
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
            ))}
          </List>

          }

        </div>
      </div>

    </ThemeProvider>
  )
}

export default SearchBar