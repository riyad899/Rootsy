import { useNavigate } from "react-router-dom";

export const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl w-full border border-green-100">
        <div className="md:flex">
          <div className="md:w-1/2 bg-[#124a2f] p-8 md:p-12 flex items-center justify-center relative">
            <div className="text-center z-10">
              <div className="text-9xl font-bold text-white mb-4">404</div>
              <h1 className="text-2xl font-semibold text-green-100">
                Oops! Page not found
              </h1>
            </div>
            <div className="absolute inset-0 opacity-10">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path
                  fill="#FFFFFF"
                  d="M45.3,-58.2C58.2,-49.3,67.7,-34.5,70.9,-18.5C74.1,-2.5,71,14.7,62.2,29.9C53.4,45.1,38.9,58.3,21.5,67.3C4.1,76.3,-16.2,81.1,-32.5,74.6C-48.8,68.1,-61.1,50.3,-67.1,31.6C-73.1,12.9,-72.8,-6.7,-65.5,-23.5C-58.2,-40.3,-44,-54.3,-28.9,-62.6C-13.8,-70.9,2.2,-73.5,18.5,-69.3C34.8,-65.1,51.5,-54.1,45.3,-58.2Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>
          </div>

          <div className="md:w-1/2 p-8 md:p-12">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-[#124a2f] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <h2 className="text-3xl font-bold text-gray-800">
                Lost in the Garden
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              The path you're looking for has grown over or perhaps was never planted.
              Don't worry - every gardener gets lost among the leaves sometimes.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => navigate(-1)}
                className="w-full bg-[#124a2f] hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Go Back
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full border border-[#124a2f] text-[#124a2f] hover:bg-green-50 font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Return to Garden Home
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-gray-500 text-sm">
                Need help finding your way? <a href="/contact" className="text-[#124a2f] hover:underline">Contact our gardeners</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};