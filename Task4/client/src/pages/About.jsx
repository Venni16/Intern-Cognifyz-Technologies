const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
        <h2 className="text-3xl font-bold mb-4 text-primary">About FitTrack Tamil Nadu</h2>
        <p className="mb-4">
          FitTrack Tamil Nadu is a comprehensive gym membership portal designed to help residents of Tamil Nadu achieve their fitness goals.
          Our platform offers a seamless experience for signing up, selecting membership plans, and managing your fitness journey.
        </p>
        <p className="mb-4">
          This project is developed for Cognifyz Task 4, demonstrating advanced form validation, dynamic DOM manipulation, and client-side routing in a MERN stack application.
        </p>
        <p className="mb-4">
          Key features include:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>User authentication with JWT</li>
          <li>Dynamic form validation and password strength meter</li>
          <li>Real-time plan selection and pricing display</li>
          <li>Protected dashboard for logged-in users</li>
          <li>Responsive design with Tailwind CSS</li>
        </ul>
        <p>
          Join us in building a healthier Tamil Nadu!
        </p>
      </div>
    </div>
  )
}

export default About
