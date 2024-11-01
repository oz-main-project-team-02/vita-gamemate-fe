import React from 'react';

interface PaginationProps {
  totalPages: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
  children: React.ReactNode;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, paginate, currentPage, children }) => {
  const goToPrevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  return (
    <nav className='sticky top-0 z-10 mb-2 flex flex-col gap-2'>
      {children}
      <ul className='flex items-center justify-center gap-1'>
        <li>
          <button
            type='button'
            onClick={goToPrevPage}
            className={`flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white text-sm ${currentPage === 1 ? 'text-gray-200' : 'text-gray-400'}`}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
        </li>
        <li className='mx-2 text-sm'>
          <span className='font-bold text-primary'>{currentPage}&nbsp;</span>
          <span className='text-gray-400'>/&nbsp;{totalPages}</span>
        </li>
        <li>
          <button
            type='button'
            onClick={goToNextPage}
            className={`flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white text-sm ${currentPage === totalPages ? 'text-gray-200' : 'text-gray-400'}`}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
