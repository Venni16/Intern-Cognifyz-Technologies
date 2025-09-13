import { useState } from 'react'

const plans = [
  { id: 'basic', name: 'Basic (Monthly)', price: '₹999/month' },
  { id: 'standard', name: 'Standard (Quarterly)', price: '₹2,499/3 months' },
  { id: 'premium', name: 'Premium (Yearly)', price: '₹7,999/year (includes free personal trainer)' },
]

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <h2 className="text-4xl font-bold mb-8 text-primary">Membership Plans</h2>
      <div className="flex flex-col md:flex-row gap-6 max-w-4xl w-full">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={`cursor-pointer border-2 rounded-lg p-6 flex-1 text-center transition-shadow ${
              selectedPlan === plan.id ? 'border-primary shadow-lg bg-white' : 'border-gray-300 bg-white'
            }`}
          >
            <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-xl text-gray-700">{plan.price}</p>
            {plan.id === 'premium' && (
              <p className="mt-4 text-green-600 font-semibold">
                Free Personal Trainer Included in Tamil Nadu Branches
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Plans
