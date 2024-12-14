interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number;
  limit: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  totalItems,
  limit,
}) => {
  const totalPages = Math.ceil(totalItems / limit);

  return (
    <div className="flex items-center justify-between border border-gray-200 rounded-lg rounded-t">
      <div className="flex items-center mt-4 mb-4">
        <button
          className="flex items-center w-32 py-2 ml-6 text-gray-700 rounded border-btn hover:bg-gray-300"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>صفحه قبل</span>
        </button>
        <button
          className={`flex items-center px-4 py-2 rounded ${
            page === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-300 border-btn"
          }`}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          <span>صفحه بعد</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <span className="text-gray-600">
        صفحه {page} از {totalPages}
      </span>
    </div>
  );
};
