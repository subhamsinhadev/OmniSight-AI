// src/FeatureGrid.jsx
import React from 'react';
import image1 from './images/image1.png'
import image3 from './images/image3.png'
import image2 from './images/image2.png'
import image4 from './images/image4.png'
import image5 from './images/image5.png'
import image6 from './images/image6.png'
const FeatureCard = ({ title, description, image }) => {
  return (
    <div className="bg-omni-dark-card rounded-3xl border border-gray-800 overflow-hidden transition-all duration-300 hover:border-omni-emerald hover:shadow-xl hover:shadow-omni-emerald/20 hover:-translate-y-1">

        <img
          src={image}
          alt={title}
          className="w-full h-56 object-cover"
        />
        
      <div className="p-8">
        <h3 className="text-2xl font-semibold mb-4 text-white">
          {title}
        </h3>

        <p className="text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>

    </div>
  );
};

const FeatureGrid = () => {
  return (
    <section className="bg-omni-dark text-gray-100 py-24 relative">

      {/* Background glow */}
      <div className="absolute top-20 left-[-100px] w-[400px] h-[400px] bg-omni-emerald/10 blur-[120px] rounded-full"></div>

      <div className="container mx-auto px-6 relative z-10">

        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-white leading-tight">
          How OmniSight <span className='text-omni-emerald'>AI</span> Protects Delivery Partners
        </h2>

        {/* Modern Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          <FeatureCard 
            title="Live Disruption Alerts"
            description="We track weather, traffic, and city conditions in your delivery area. If something blocks deliveries, our system detects it immediately."
            image={image1}
          />

          <FeatureCard 
            title="Fair Weekly Pricing"
            description="Your protection cost is calculated based on the risk in your delivery zone, so workers in safer areas pay less."
            image={image2}
          />

          <FeatureCard 
            title="Automatic Compensation"
            description="If heavy rain, floods, or city restrictions stop deliveries, the system automatically triggers compensation."
            image={image3}
          />

          <FeatureCard 
            title="Fast Weekly Payouts"
            description="If compensation is triggered, the payout is included in your weekly earnings cycle."
            image={image4}
          />

          <FeatureCard 
            title="Secure & Fair System"
            description="Smart verification systems make sure the platform stays fair and prevents misuse."
            image={image5}
          />

          <FeatureCard 
            title="Built for Gig Workers"
            description="Designed specifically for delivery partners working on platforms like food, grocery, and e-commerce delivery apps."
           image={image6}
          />

        </div>

      </div>
    </section>
  );
};

export default FeatureGrid;