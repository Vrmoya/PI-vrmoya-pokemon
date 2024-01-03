const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      <button 
        disabled={currentPage === 1} 
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Prev
      </button>

      {pages.map((page) => (
        <button 
          key={page} 
          onClick={() => handlePageChange(page)}
          className={currentPage === page ? 'active' : ''}
        >
          {page}
        </button>
      ))}

      <button 
        disabled={currentPage === totalPages} 
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;



// import React from 'react';

// const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
//   const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

//   return (
//     <div>
//       {pages.map((page) => (
//         <button key={page} onClick={() => handlePageChange(page)}>
//           {page}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Pagination;

