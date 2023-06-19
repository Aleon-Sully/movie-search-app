import React from 'react'

const MyPagination = ({totalNumber, numbersPerPage, setCurrentPage, currentPage}) => {

    let pages = [];

    for(let i=1; i<= Math.ceil(totalNumber/numbersPerPage); i++){
        pages.push(i)
    }

  return (
    <div className='flex flex-row gap-2'>
        {pages.map((page, key) => {
            return (
                <span onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page)
                }} key={key} className={currentPage === page ? 'h-2 w-2 rounded-full bg-[#FF7300]' : 'h-2 w-2 rounded-full bg-[#FFC799]'}>{page}</span>
            )
        })}
    </div>
  )
}

export default MyPagination
