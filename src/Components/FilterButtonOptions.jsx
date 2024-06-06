import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

export default function FilterButtonOptions({categories}) {
    console.log("category", categories)
  return (
    <>
        {categories.map((category, index) => (
        <Dropdown.Item key={`${category.short_name}${index}`} value={category.id}>{category.short_name}{category.id}</Dropdown.Item>
        ))}
    </>
  )
}
