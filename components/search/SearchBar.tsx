'use client'

import { ChangeEvent } from "react"

const SearchBar = () => {
  let search = ''

  const handleChange = async(event: ChangeEvent<HTMLInputElement>) =>{
    event.preventDefault()
    search = event.target.value
    
    if (search.replace(/\s/g, '').length === 0) return
    else{
      const queryString = new URLSearchParams({searchQuery: search}).toString();
      const url = `/api/search?${queryString}`;
      const response = await fetch (url);
      let results = await response.json()

    }
  }

  return(
    <div className="w-screen">
      <form>
        <input 
        type="text" 
        placeholder="Search song to queue" 
        autoComplete="off" 
        onChange={handleChange}
        >
        </input>
      </form>
    </div>
  )
}

export default SearchBar