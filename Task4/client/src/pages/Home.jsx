import { Link } from 'react-router-dom'
import { useRef } from 'react'

const Home = () => {
  const plansRef = useRef(null)

  const scrollToPlans = () => {
    plansRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const plans = [
    {
      name: 'Basic',
      price: '₹999/month',
      features: ['Access to gym equipment', 'Locker facility', 'Basic training sessions']
    },
    {
      name: 'Standard',
      price: '₹2,499/3 months',
      features: ['All Basic features', 'Group classes', 'Nutrition consultation']
    },
    {
      name: 'Premium',
      price: '₹7,999/year',
      features: ['All Standard features', 'Free personal trainer', 'Priority booking']
    }
  ]

  return (
    <div>
      <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}>
        <div className="min-h-screen bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-6xl font-bold mb-6 drop-shadow-lg">
              Join FitTrack Tamil Nadu
            </h1>
            <h2 className="text-3xl font-semibold mb-8 drop-shadow-md">
              Train Smarter, Live Stronger
            </h2>
            <p className="text-xl mb-10 drop-shadow-sm">
              Achieve your fitness goals with our premium gym membership in Tamil Nadu. Join thousands of fitness enthusiasts in Chennai, Coimbatore, Madurai, and Trichy.
            </p>
            <div className="space-x-6">
              <button
                onClick={scrollToPlans}
                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition shadow-lg"
              >
                View Plans
              </button>
              <Link
                to="/signup"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Plans Section */}
      <section ref={plansRef} className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Membership Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition">
                <h3 className="text-2xl font-bold mb-4 text-primary">{plan.name}</h3>
                <p className="text-3xl font-semibold mb-6 text-gray-800">{plan.price}</p>
                <ul className="text-left mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="mb-2 flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                >
                  Choose Plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
