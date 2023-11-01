'use client'

import { ChangeEvent, useState } from "react"
import { TextField } from "@mui/material"

const SearchBar = () => {
  
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const handleChange = async(event: ChangeEvent<HTMLInputElement>) =>{
    event.preventDefault()
    console.log(event.target.value)
    setSearch(event.target.value)
    
    if (search.replace(/\s/g, '').length === 0) return
    else{
      const queryString = new URLSearchParams({searchQuery: search}).toString();
      const url = `/api/spotify/search?${queryString}`;
      const response = await fetch (url);
      let data = await response.json()
      console.log(data)
  
    }
  }


  return(
    <div className="w-screen">
      <TextField variant="standard"/>
      <form>
        <input 
        autoComplete="off" 
        className="text-black" 
        onChange={(e)=>handleChange(e)} 
        placeholder="Search song to queue" 
        type="text" 
        value={search}>
        </input>
      </form>
    </div>
  )
}

export default SearchBar