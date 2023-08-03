import React from 'react'

const SearchBox = ({value, setSearchValue}) => {
  return (
    <div className=''>
        <input
            className='form-control'
            value={value}
            onChange={(e)=> setSearchValue(e.target.value)}
            placeholder='Type to search...'
        />
    </div>
  )
}

export default SearchBox