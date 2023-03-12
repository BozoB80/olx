'use client'

import { AdjustmentsHorizontalIcon, ListBulletIcon, MagnifyingGlassIcon, Squares2X2Icon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import CarsItem from './CarsItem'

const CarsList = ({ adds }) => {
  const [grid, setGrid] = useState(true)
  const [sort, setSort] = useState('latest')

  return (
    <div className='flex flex-col w-full bg-[#f1f4f5]'>
      <div className='flex w-full justify-center items-center px-3 pt-3 sm:p-4'>
        <div className='flex w-1/3 bg-white px-1 sm:px-6 py-2 rounded-l-md shadow-xl border-r'>
          <Squares2X2Icon className='w-6 h-6 cursor-pointer' onClick={() => setGrid(true)} />
          <ListBulletIcon className='w-6 h-6 cursor-pointer' onClick={() => setGrid(false)} />
        </div>
        <div className="flex w-1/3 bg-white px-1 sm:backdrop:px-5 py-2 shadow-xl border-r">
            <AdjustmentsHorizontalIcon className='w-6 h-6' />
            <select id="sort" name="sort" value={sort} onChange={(e) => setSort(e.target.value)} className='w-20'>
              <option value="" disabled>Sort By</option>
              <option value="latest">Latest</option>
              <option value="lowest-price">Lowest Price</option>
              <option value="highest-price">Highest Price</option>
              <option value="a-z">A - Z</option>
              <option value="z-a">Z - A</option>
            </select>
        </div>
        <div className='flex w-1/3 bg-white px-1 sm:px-6 py-2 rounded-r-md shadow-xl'>
          <button className='flex items-center gap-3'>
            <MagnifyingGlassIcon className='w-4 h-4' />
            Filter
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
