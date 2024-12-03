import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order
  const resultsPerPage = 10;

  // Fetch data from backend
  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams({
        searchTerm: searchTerm || '',
        min_amount: minAmount || '',
        max_amount: maxAmount || '',
      }).toString();

      const response = await fetch(`/search?${queryParams}`);
      const result = await response.json();

      // Sort data based on sortOrder
      const sortedData = result.results.sort((a, b) =>
        sortOrder === 'asc' ? a.transaction_amount - b.transaction_amount : b.transaction_amount - a.transaction_amount
      );
      setData(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Trigger search when form is submitted
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to the first page on new search
    fetchData();
  };

  // Pagination logic
  const totalPages = Math.ceil(data.length / resultsPerPage);
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = data.slice(indexOfFirstResult, indexOfLastResult);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const delta = 2; // Number of pages to show around current page
    const range = [];

    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
      range.push(i);
    }

    if (range[0] > 1) {
      pageNumbers.push(
        <button key="1" onClick={() => handlePageChange(1)} className="mx-1 px-3 py-1 border">
          1
        </button>
      );
      if (range[0] > 2) pageNumbers.push(<span key="dots1" className="mx-1 px-3 py-1">...</span>);
    }

    range.forEach((pageNumber) => {
      pageNumbers.push(
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`mx-1 px-3 py-1 border ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
        >
          {pageNumber}
        </button>
      );
    });

    if (range[range.length - 1] < totalPages) {
      if (range[range.length - 1] < totalPages - 1)
        pageNumbers.push(<span key="dots2" className="mx-1 px-3 py-1">...</span>);
      pageNumbers.push(
        <button key={totalPages} onClick={() => handlePageChange(totalPages)} className="mx-1 px-3 py-1 border">
          {totalPages}
        </button>
      );
    }

    return (
      <div className="flex justify-center mt-4">
        <button onClick={() => handlePageChange(1)} className="mx-1 px-3 py-1 border">Đầu</button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`mx-1 px-3 py-1 border ${currentPage === 1 ? 'hidden' : ''}`}
        >
          «
        </button>
        {pageNumbers}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`mx-1 px-3 py-1 border ${currentPage === totalPages ? 'hidden' : ''}`}
        >
          »
        </button>
        <button onClick={() => handlePageChange(totalPages)} className="mx-1 px-3 py-1 border">Cuối</button>
      </div>
    );
  };

  const handleSortOrderChange = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    setData((prevData) =>
      [...prevData].sort((a, b) =>
        sortOrder === 'asc' ? b.transaction_amount - a.transaction_amount : a.transaction_amount - b.transaction_amount
      )
    );
  };

  return (
    <div className="bg-white">
      <main className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Danh sách đóng góp cho MTTQVN</h2>

        {/* Section: Information Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-bold mb-2">Thời gian đóng góp</h3>
            <p className="mb-4">Theo danh sách công bố từ MTTQVN, Tài khoản Vietcombank, Vietinbank, Agribank từ ngày 01/09/2024 đến ngày 10/09/2024.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Miễn trừ trách nhiệm</h3>
            <p className="mb-4">Thông tin được cung cấp từ MTTQVN, chúng tôi chỉ XỬ LÝ DỮ LIỆU và giúp việc tìm kiếm, lọc dữ liệu đơn giản hơn, để xem bản gốc vui lòng truy cập các liên kết sau:</p>
            <ul className="list-disc pl-4 space-y-2">
              <li><a href="https://web.facebook.com/thongtinchinhphu" className="text-blue-600 hover:underline">Thông tin chính phủ - Facebook</a></li>
              <li><a href="https://web.facebook.com/mttqvietnam?locale=vi_VN" className="text-blue-600 hover:underline">Mặt trận Tổ quốc Việt Nam - Facebook</a></li>
              <li><a href="http://mattran.org.vn/" className="text-blue-600 hover:underline">Ủy ban Mặt trận Tổ quốc Việt Nam</a></li>
            </ul>
          </div>
        </div>

        {/* Search Form */}
        <form className="mt-8" onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="min-amount" className="block mb-2">Số tiền tối thiểu</label>
              <input
                type="number"
                id="min-amount"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="max-amount" className="block mb-2">Số tiền tối đa</label>
              <input
                type="number"
                id="max-amount"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="search-term" className="block mb-2">Từ khóa</label>
              <input
                type="text"
                id="search-term"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Tìm kiếm
          </button>
        </form>

        {/* Sort Button */}
        <button
          onClick={handleSortOrderChange}
          className="mt-4 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2
                    rounded-md"
        >
          Sắp xếp: {sortOrder === 'asc' ? 'Tăng dần' : 'Giảm dần'}
        </button>

        {/* Results Table Section */}
        <div className="container mx-auto py-8 bg-white">
          <h2 className="text-xl mb-4">
            Hiển thị {currentResults.length} trên tổng số {data.length} kết quả
          </h2>
          <table className="min-w-full border-collapse border border-gray-400">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border border-gray-400">NGÀY</th>
                <th className="py-2 px-4 border border-gray-400">SỐ TIỀN</th>
                <th className="py-2 px-4 border border-gray-400">NỘI DUNG</th>
              </tr>
            </thead>
            <tbody>
              {currentResults.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border border-gray-400 w-1/12 text-center">{item.date}</td>
                  <td className="py-2 px-4 border border-gray-400 w-1/12 text-center">{item.amount}</td>
                  <td className="py-2 px-4 border border-gray-400 w-2">{item.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {renderPagination()}
        </div>
      </main>
    </div>
  );
};

export default HomePage;

