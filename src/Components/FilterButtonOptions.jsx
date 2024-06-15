import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

export default function FilterButtonOptions({categories, setFilteredCat}) {

  function handleOnClick(data) {
    setFilteredCat(data)
  }

  return (
    <>
      {categories.map((category, index) => (
      <Dropdown.Item key={`${category.short_name}${index}`} onClick={()=>handleOnClick(category.id)}>{category.short_name}{category.id} </Dropdown.Item>
      ))}
    </>
  )
}
