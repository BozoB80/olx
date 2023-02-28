'use client'

import { ListBulletIcon, MagnifyingGlassIcon, Squares2X2Icon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import CarsItem from './CarsItem'

const CarsList = ({ adds }) => {
  const [grid, setGrid] = useState(true)
  const [sort, setSort] = useState('latest')

  return (
    <div className='flex flex-col'>

      <div className='flex justify-between items-center p-4 bg-[#f1f4f5]'>
        <div className='flex gap-3'>
          <Squares2X2Icon className='w-8 h-8 cursor-pointer' onClick={() => setGrid(true)} />
          <ListBulletIcon className='w-8 h-8 cursor-pointer' onClick={() => setGrid(false)} />
        </div>
        <div className="">
            <label>Sort by:</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="latest">Latest</option>
              <option value="lowest-price">Lowest Price</option>
              <option value="highest-price">Highest Price</option>
              <option value="a-z">A - Z</option>
              <option value="z-a">Z - A</option>
            </select>
        </div>
        <div>
          <button className='flex items-center gap-2 px-4 py-2 bg-black text-white rounded-[4px]'>
            <MagnifyingGlassIcon className='w-4 h-4' />
            10 results
          </button>
        </div>
      </div>

      <div className={grid ? 'gridStyle' : 'listStyle'}>
        {adds?.length === 0 ? (
          <p>No products found</p>
        ) : (
          <>
            {adds?.map((add) => {
              return (
                <div key={add.id}>
                  <CarsItem {...add} grid={grid} add={add} />
                </div>
              )
            })}
          </>
        )}

      </div>
    </div>
  )
}

export default CarsList
