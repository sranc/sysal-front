import { useEffect, useState } from "react";

const Pagination = ({
  handleNexPage,
  handlePreviousPage,
  setCurrentPage,
  currentPage,
  numberOfPages,
  dataPerPage,
}) => {
  const [visiblePages, setVisiblePages] = useState([]);
  const pages = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(i);
  }

  useEffect(() => {
    const visible = [];
    if (numberOfPages <= 5) {
      visible.push(...pages);
    } else if (currentPage <= 3) {
      visible.push(...pages.slice(0, 5));
      visible.push("...");
      visible.push(numberOfPages);
    } else if (currentPage >= numberOfPages - 2) {
      visible.push(1);
      visible.push("...");
      visible.push(...pages.slice(numberOfPages - 5));
    } else {
      visible.push(1);
      visible.push("...");
      visible.push(...pages.slice(currentPage - 2, currentPage + 1));
      visible.push("...");
      visible.push(numberOfPages);
    }
    setVisiblePages(visible);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, numberOfPages, dataPerPage]);

  return (
    <div className="flex flex-wrap gap-1 justify-center my-5 text-black dark:text-stroke">
      <button
        className=" bg-stroke dark:bg-meta-4 p-1 rounded-lg hover:opacity-80"
        onClick={handlePreviousPage}
      >
        Prev
      </button>

      <div key={`page-`} className="flex flex-wrap justify-center gap-1">
        {visiblePages.map((page, index) =>
          page !== "..." ? (
            <button
              key={`page-${index}`}
              className={`bg-stroke dark:bg-meta-4 p-1 rounded-lg hover:opacity-80 w-8 h-8 ${
                currentPage === page &&
                " shadow-1 shadow-black dark:shadow-body border border-bodydark2 dark:border-body"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ) : (
            <span
              key={`page-${index}`}
              className="bg-stroke dark:bg-meta-4 p-1 rounded-lg w-8 h-8 text-center select-none"
            >
              {page}
            </span>
          )
        )}
      </div>
      <button
        className=" bg-stroke dark:bg-meta-4 p-1 rounded-lg hover:opacity-80"
        onClick={handleNexPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
