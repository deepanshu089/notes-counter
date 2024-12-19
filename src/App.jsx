import "./index.css";
import React, { useState } from "react";

const App = () => {
  const [counts, setCounts] = useState({
    2000: 0,
    500: 0,
    200: 0,
    100: 0,
    50: 0,
    20: 0,
    10: 0,
    5: 0,
  });

  const [total, setTotal] = useState(0);

  // Handle change in input value
  const handleChange = (e, denomination) => {
    const value = e.target.value === "" ? "" : parseInt(e.target.value, 10) || 0;
    setCounts((prevCounts) => ({
      ...prevCounts,
      [denomination]: value < 0 ? 0 : value, // Ensure value is not negative
    }));
  };

  // Increase count for a denomination
  const increaseCount = (denomination) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [denomination]: prevCounts[denomination] + 1,
    }));
  };

  // Decrease count for a denomination
  const decreaseCount = (denomination) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [denomination]: Math.max(prevCounts[denomination] - 1, 0), // Prevent negative value
    }));
  };

  // Calculate total amount
  const calculateTotal = () => {
    let totalAmount = 0;
    for (const denomination in counts) {
      totalAmount += counts[denomination] * parseInt(denomination, 10);
    }
    setTotal(totalAmount);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-800 p-6">
      {/* Main Content */}
      <div className="bg-white shadow-2xl rounded-3xl p-6 w-full max-w-4xl">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
            DEEPSHIKHA TECHNOLOGY
          </h1>
          <p className="text-lg mt-2 text-gray-600">
            Your trusted technology partner
          </p>
        </header>

        {/* Notes Counter Section */}
        <div className="mt-10">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Notes Counter
          </h1>
          <p className="text-md text-gray-600 text-center mb-6">
            Enter the count of each denomination to calculate the total sum.
          </p>

          {/* Placeholder for Notes Image */}
          <div className="w-full h-40 sm:h-48 overflow-hidden rounded-xl mb-8 flex items-center justify-center">
            <img
              className="w-full h-full object-cover"
              src="https://thumbs.dreamstime.com/z/indian-currency-notes-rupees-coins-rupees-reserve-bank-india-indian-currency-notes-coins-132807943.jpg"
              alt="Indian Currency Notes"
            />
          </div>

          {/* Denominations Table */}
          <table className="w-full table-auto border-collapse rounded-lg bg-white shadow-md text-sm sm:text-base">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 sm:p-4 text-lg font-semibold text-center text-blue-600 bg-blue-50 rounded-tl-lg">
                  Denomination (₹)
                </th>
                <th className="border border-gray-300 p-2 sm:p-4 text-lg font-semibold text-center text-blue-600 bg-blue-50 rounded-tr-lg">
                  Count
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(counts)
                .sort((a, b) => b - a) // Sort denominations in descending order
                .map((denomination) => (
                  <tr
                    key={denomination}
                    className="hover:bg-blue-50 transition duration-300"
                  >
                    <td className="border border-gray-300 p-2 sm:p-4 text-center text-gray-700 font-semibold">
                      {denomination}
                    </td>
                    <td className="border border-gray-300 p-2 sm:p-4 text-center">
                      <div className="flex items-center justify-between sm:justify-center space-x-2">
                        {/* Decrement Button */}
                        <button
                          onClick={() => decreaseCount(denomination)}
                          className={`w-8 h-8 sm:w-10 sm:h-10 bg-red-600 text-white text-lg sm:text-xl rounded-full flex items-center justify-center hover:bg-red-700 ${
                            counts[denomination] === 0 &&
                            "opacity-50 cursor-not-allowed"
                          }`}
                          disabled={counts[denomination] === 0} // Disable button if count is 0
                        >
                          -
                        </button>

                        {/* Input Field */}
                        <input
                          type="number"
                          min="0"
                          value={counts[denomination] === 0 ? "" : counts[denomination]}
                          onChange={(e) => handleChange(e, denomination)}
                          className="w-12 sm:w-20 p-1 sm:p-2 border border-gray-300 rounded-lg text-base sm:text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-center"
                        />

                        {/* Increment Button */}
                        <button
                          onClick={() => increaseCount(denomination)}
                          className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 text-white text-lg sm:text-xl rounded-full flex items-center justify-center hover:bg-blue-700"
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Calculate Total Button */}
          <div className="mt-8">
            <button
              onClick={calculateTotal}
              className="w-full py-3 sm:py-4 bg-blue-600 text-white text-lg sm:text-2xl font-semibold rounded-lg hover:bg-blue-700"
            >
              Calculate Total
            </button>
          </div>

          {/* Total Display */}
          <div className="mt-8 p-4 sm:p-6 bg-green-100 text-green-800 text-lg sm:text-2xl font-bold rounded-lg text-center">
            Total: ₹{total}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600">
          <p className="text-sm">© 2024 DEEPSHIKHA TECHNOLOGY. All rights reserved.</p>
          <p className="text-sm">Phone: 9733168702</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
