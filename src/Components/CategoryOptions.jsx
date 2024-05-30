import React from 'react'

export default function CategoryOptions({categories}) {
  return (
    <>
      {categories.map((category, index) => (
      <option key={`${category.short_name}${index}`} value={category.id}>{category.short_name}</option>
    ))}
    </>
  )
}
