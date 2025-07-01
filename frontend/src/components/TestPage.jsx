import React from 'react';
import { Link } from 'react-router-dom';

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            🧪 MOVO Component Test Page
          </h1>
          
          {/* Navigation Test */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Navigation Test</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/" className="bg-blue-500 text-white p-3 rounded text-center hover:bg-blue-600 transition-colors">
                🏠 Home
              </Link>
              <Link to="/login" className="bg-green-500 text-white p-3 rounded text-center hover:bg-green-600 transition-colors">
                🔐 Login
              </Link>
              <Link to="/register-admin" className="bg-orange-500 text-white p-3 rounded text-center hover:bg-orange-600 transition-colors">
                👨‍💼 Admin Register
              </Link>
              <Link to="/register-presenter" className="bg-purple-500 text-white p-3 rounded text-center hover:bg-purple-600 transition-colors">
                🎤 Presenter Register
              </Link>
            </div>
          </section>

          {/* CSS Animation Test */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Animation Test</h2>
            <div className="space-y-4">
              <div className="animate-fade-in-up bg-gradient-to-r from-orange-400 to-red-400 p-4 rounded text-white">
                ✨ Fade In Up Animation
              </div>
              <div className="relative">
                <span className="text-lg font-semibold">Scale X Animation:</span>
                <div className="mt-2 h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-scale-x"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Responsive Test */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Responsive Test</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-100 p-4 rounded">
                <h3 className="font-semibold">Mobile First</h3>
                <p className="text-sm text-gray-600">This should stack on mobile</p>
              </div>
              <div className="bg-green-100 p-4 rounded">
                <h3 className="font-semibold">Tablet View</h3>
                <p className="text-sm text-gray-600">2 columns on tablet</p>
              </div>
              <div className="bg-purple-100 p-4 rounded">
                <h3 className="font-semibold">Desktop View</h3>
                <p className="text-sm text-gray-600">3 columns on desktop</p>
              </div>
            </div>
          </section>

          {/* Gradient Test */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Gradient Test</h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-slate-50 via-white to-orange-50 p-4 rounded border">
                Background Gradient (Same as Home)
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Text Gradient Effect
              </h3>
            </div>
          </section>

          {/* Button Test */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Button Test</h2>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-2.5 border-2 border-gray-200 hover:border-orange-300 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 font-medium">
                Login Style
              </button>
              <button className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Sign Up Style
              </button>
              <button className="px-8 py-4 bg-white/80 backdrop-blur-md hover:bg-white text-gray-700 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200">
                CTA Style
              </button>
            </div>
          </section>

          {/* Status Indicators */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Status Check</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 p-4 rounded">
                <div className="flex items-center">
                  <span className="text-green-500 text-xl mr-2">✅</span>
                  <span className="font-semibold text-green-800">React Router</span>
                </div>
                <p className="text-sm text-green-600">Navigation working</p>
              </div>
              <div className="bg-green-50 border border-green-200 p-4 rounded">
                <div className="flex items-center">
                  <span className="text-green-500 text-xl mr-2">✅</span>
                  <span className="font-semibold text-green-800">Tailwind CSS</span>
                </div>
                <p className="text-sm text-green-600">Styles loading correctly</p>
              </div>
              <div className="bg-green-50 border border-green-200 p-4 rounded">
                <div className="flex items-center">
                  <span className="text-green-500 text-xl mr-2">✅</span>
                  <span className="font-semibold text-green-800">Animations</span>
                </div>
                <p className="text-sm text-green-600">CSS animations working</p>
              </div>
              <div className="bg-green-50 border border-green-200 p-4 rounded">
                <div className="flex items-center">
                  <span className="text-green-500 text-xl mr-2">✅</span>
                  <span className="font-semibold text-green-800">Responsive</span>
                </div>
                <p className="text-sm text-green-600">Mobile-first design</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
