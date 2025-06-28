import React from 'react';
import ServicesGrid from '../../ServicesGrid';

const ServicesSection = () => {
  return (
    <section id="services" className="section bg-gradient-to-b from-cream-50 to-cream-100">
      <div className="container">
        <ServicesGrid showTitle={true} />
      </div>
    </section>
  );
};

export default ServicesSection;