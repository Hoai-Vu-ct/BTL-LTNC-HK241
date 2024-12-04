import React from 'react';  

const BankingStats = () => {  
  return (  
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">  
      <div className="bg-white rounded-lg shadow-md p-4">  
        <h2 className="text-lg font-bold mb-2">Tổng quan</h2>  
        <p className="text-4xl font-bold mb-2">135.080.894.728 đ</p>  
        <p className="text-gray-500">Tổng số tiền đông góp</p>  
      </div>  
      <div className="bg-white rounded-lg shadow-md p-4">  
        <h2 className="text-lg font-bold mb-2">Tổng số lượt đóng góp</h2>  
        <p className="text-4xl font-bold mb-2">200.347</p>  
      </div>  
      <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow-md p-4">  
        <h2 className="text-lg font-bold mb-2">Phân bố số tiền đóng góp</h2>  
        <div className="grid grid-cols-5 gap-2">  
          <div className="col-span-5 md:col-span-1 flex items-center justify-center">  
            <div className="bg-blue-500 rounded-full w-6 h-6"></div>  
            <span className="ml-2">34 lượt đóng góp</span>  
          </div>  
          {/* Add more bars for the different ranges */}  
        </div>  
      </div>  
      <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow-md p-4">  
        <h2 className="text-lg font-bold mb-2">Đóng góp theo ngày</h2>  
        {/* Add line chart or other visualization for the daily contributions */}  
      </div>  
    </div>  
  );  
};  

export default BankingStats;