import { useState } from 'react';
import RequestForm from './RequestForm';

function MyCard() {
  const [showRequestForm, setShowRequestForm] = useState(false);

  const handleProceedClick = () => {
    setShowRequestForm(true);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      {showRequestForm ? (
        <RequestForm />
      ) : (
        <div className="w-full flex justify-start">
          <div className="bg-yellow-400 p-4 rounded-lg shadow-lg w-80 flex">
            <div className="flex-shrink-0">
              <img src="/public/images/user/default_user.png" alt="User" className="w-16 h-16 rounded-lg" />
            </div>
            <div className="flex-grow ml-4">
              <h5 className="text-xl font-bold text-gray-800">Fixing Blub</h5>
              <p className="text-gray-700 mt-2 text-sm">
                We focus on ergonomics and meeting you where you work. It's only a keystroke away.
              </p>
              <p className="text-gray-600 mt-2 flex items-center text-xs">
                <i className="fa fa-clock-o mr-2"></i> 22 April 2021
              </p>
              <div className="flex justify-between mt-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm">
                  Learn More
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showRequestForm && (
        <div className="mt-8 w-full flex justify-center">
          <button
            onClick={handleProceedClick}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-bold py-2 px-6 rounded shadow-md w-40"
          >
            Proceed
          </button>
        </div>
      )}
    </div>
  );
}

export default MyCard;
