import React from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import FilterButtonOptions from './FilterButtonOptions';

export default function FilterButton({categories, setFilteredCat}) {

  return (
    <DropdownButton id="dropdown-item-button" title="Filter Events">
      <FilterButtonOptions categories={categories} setFilteredCat={setFilteredCat} />
    </DropdownButton>
  )
}
