function Pagination({ pageNo, handlePrevPage, handleNextPage, total_pages }) {
  return (
    <div className=" flex justify-center gap-4 items-center text-white ">
      <div
        onClick={pageNo === 1 ? null : handlePrevPage}
        className="hover:cursor-pointer"
      >
        <i className="fa-solid fa-arrow-left border border-blue-300 rounded-full py-1 px-2 hover:bg-purple-300 hover:text-black hover:border-black text-sm"></i>
      </div>
      <div className="font-bold text-2xl md:text-4xl">
        Page {pageNo} of {total_pages}
      </div>
      <div
        onClick={pageNo > total_pages ? null : handleNextPage}
        className="hover:cursor-pointer"
      >
        <i className="fa-solid fa-arrow-right border border-blue-300 rounded-full px-2 py-1 hover:bg-purple-300 hover:text-black hover:border-black text-sm"></i>
      </div>
    </div>
  );
}

export default Pagination;
