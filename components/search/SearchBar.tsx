'use client'

import { ChangeEvent, useState } from "react"
import { List, ListItem, ListItemText, ListItemButton, ListItemAvatar ,TextField } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const colorTheme = createTheme({
  palette:{
    primary: {
      main: '#5fcd5e',
      light: '#7fd77e',
      dark: '#428f41',
      contrastText: '#fff'
    }
  }
})

const SearchBar = () => {
  
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])

  const handleChange = async(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    event.preventDefault()
    console.log(event.target.value)
    setSearch(event.target.value)
    
    if (search.replace(/\s/g, '').length === 0) return
    else{
      const queryString = new URLSearchParams({searchQuery: search}).toString();
      const url = `/api/spotify/search?${queryString}`;
      const response = await fetch (url);
      let data = await response.json()
      setResults(data)

      
    }
  }


  return(
    <ThemeProvider theme={colorTheme}>
      <div className="w-full h-auto flex justify-center items-center">
        <div className="flex flex-col w-1/2 items-center">
          <TextField 
          color="primary"
          className="w-full"
          onChange={(e) => handleChange(e)}
          label="Search song to queue"
          InputProps={{ style: {color:'white'} }}
          focused
          />
        <List sx={{ width: '100%', bgcolor: 'primary.light' }}>
          {[1, 2, 3].map((value) => (
            <ListItem
              key={value}
              disableGutters
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>

                </ListItemAvatar>
                <ListItemText primary={`Artists - ${value}`} />

              </ListItemButton>
            </ListItem>
          ))}
        </List>

        </div>
      </div>

    </ThemeProvider>
  )
}

export default SearchBar