'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQAccordionItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-admin-border-strong transition-colors duration-150 focus-within:border-brand-ink">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center bg-transparent border-none text-left cursor-pointer group focus:outline-none"
      >
        <span className="text-base font-bold tracking-wide text-brand-ink uppercase transition-colors group-hover:text-brand-primary">
          {question}
        </span>
        <span className="text-brand-ink text-xl ml-4 transition-transform duration-200 block transform select-none">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-sm font-light leading-relaxed text-brand-muted max-w-[640px]">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const router = useRouter();

  const generalFaqs = [
    {
      question: "How do I reserve a vehicle from the fleet?",
      answer: "Navigate to our main consumer catalog, filter by your required taxonomy (Category, Powertrain, or Capacity), select your desired vehicle asset, and confirm your dispatch schedule block."
    },
    {
      question: "What engine configurations are available?",
      answer: "Our current digital fleet registry supports three primary engine architectures: Battery Electric Vehicles (BEV), Plug-in Hybrid Electric Vehicles (PHEV), and high-efficiency Internal Combustion Engines (ICE)."
    },
    {
      question: "How is vehicle energy status tracked?",
      answer: "Each fleet asset updates its internal Energy Matrix Capacity matrix dynamically to our administration dashboard via automated system synchronization metrics upon return to any designated station hub."
    }
  ];

  const operationalFaqs = [
    {
      question: "What do the different operational states mean?",
      answer: "Assets marked AVAILABLE are open for immediate dispatch blocks. ON RENTAL indicates an active, ongoing consumer contract. MAINTENANCE assets are currently offline undergoing system calibration indices in our workshop grids."
    },
    {
      question: "Can I modify my luggage or seat requirements after matching?",
      answer: "Reservations are hard-locked to specific vehicle capacities (Passenger Seats and Luggage Bags) to ensure physical compatibility. To adjust capacity requirements, you must cycle your current reservation and re-filter the available pool."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-admin-surface text-brand-ink pt-8 pb-24 px-4 md:px-12">
      <div className="max-w-[768px] mx-auto">
        
        <button 
          onClick={() => router.push('/')} 
          className="text-xs font-bold tracking-wide text-brand-muted hover:text-brand-ink transition-colors uppercase bg-transparent border-none cursor-pointer mb-12"
        >
          ← Return to Platform Hub
        </button>
        <div className="border-b-2 border-brand-ink pb-6 mb-12">
          <h1 className="text-[32px] font-bold tracking-tight uppercase text-brand-ink">
            Information Matrix
          </h1>
          <p className="text-sm font-normal text-brand-muted mt-2 uppercase tracking-wide">
            Frequently Asked Questions & Operational Guidelines
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-xs font-bold tracking-wide text-brand-muted uppercase block mb-4 border-b border-admin-border pb-2">
            01 / Fleet Taxonomy & Architecture
          </h2>
          <div className="flex flex-col">
            {generalFaqs.map((faq, idx) => (
              <FAQAccordionItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold tracking-wide text-brand-muted uppercase block mb-4 border-b border-admin-border pb-2">
            02 / Logistics & Dispatch Control
          </h2>
          <div className="flex flex-col">
            {operationalFaqs.map((faq, idx) => (
              <FAQAccordionItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}