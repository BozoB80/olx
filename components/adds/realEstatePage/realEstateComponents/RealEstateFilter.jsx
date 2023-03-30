import React from 'react'

const RealEstateFilter = () => {
  return (
    <div className='flex flex-col p-10 space-y-3'>
      <h4 className='font-bold'>Categories</h4>
      <div className='border-b-2'>
        <button>All</button>
      </div>
      <h4 className='font-bold'>Brand</h4>
      <div>
        <select className='w-full' name="brand">
          <option value="all">All</option>
        </select>
        <h4 className='font-bold'>Price</h4>
        <p className='font-bold'>1500</p>
        <div>
          <input type="range" name="price" min="100" max="1000" />
        </div>
        <br />
        <button>Clear Filter</button>
      </div>
    </div>
  )
}

export default RealEstateFilter