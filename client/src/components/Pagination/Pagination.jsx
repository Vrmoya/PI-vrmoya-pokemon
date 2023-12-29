import React from 'react';

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      {pages.map((page) => (
        <button key={page} onClick={() => handlePageChange(page)}>
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

