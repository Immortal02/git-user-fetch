import React, {useState} from 'react'
import { Button, Input } from 'reactstrap'

export default function Search({query, handleSearch}) {
  const [searchValue, setSearchValue] = useState(query);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchValue);
    }
  }
  return (
    <div style={{display: "flex", margin: "20px"}}>
      <Input
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        color="primary"
        style={{marginLeft: "10px"}}
        onClick={() => handleSearch(searchValue)}
      >
        Submit
      </Button>
    </div>
  )
}
