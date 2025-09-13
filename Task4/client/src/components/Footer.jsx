const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">FitTrack Tamil Nadu</h3>
            <p className="text-gray-300">
              Your ultimate fitness partner in Tamil Nadu. Join us to train smarter and live stronger.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/plans" className="text-gray-300 hover:text-white">Plans</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white">About</a></li>
              <li><a href="/signup" className="text-gray-300 hover:text-white">Signup</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300">
              Email: info@fittracktn.com<br />
              Phone: +91 98765 43210<br />
              Locations: Chennai, Coimbatore, Madurai, Trichy
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300">
            &copy; 2023 FitTrack Tamil Nadu. All rights reserved. Developed for Cognifyz Task 4.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
