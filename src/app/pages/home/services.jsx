"use client";

import React, { useEffect, useState } from "react";

// Sample service data array
const serviceData = [
  {
    id: 1,
    title: "Electrical System",
    price: 20.0,
    imgSrc: "/images/service1.jpg",
  },
  {
    id: 2,
    title: "Engine Diagnostics",
    price: 20.0,
    imgSrc: "/images/service2.jpg",
  },
  {
    id: 3,
    title: "Auto Car Repair",
    price: 20.0,
    imgSrc: "/images/service3.jpg",
  },
  {
    id: 4,
    title: "Electrical System",
    price: 20.0,
    imgSrc: "/images/service4.jpg",
  },
  {
    id: 5,
    title: "Engine Diagnostics",
    price: 20.0,
    imgSrc: "/images/service5.jpg",
  },
  {
    id: 6,
    title: "Auto Car Repair",
    price: 20.0,
    imgSrc: "/images/service6.jpg",
  },
];

const Services = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/services.json");
        const jsonData = await response.json();
        setData(jsonData);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log("data", data)
  return (
    <section className="py-16 ">
      <div className="text-center mb-12 flex flex-col gap-4">
        <h2 className="text-primary text-lg font-bold">Service</h2>
        <h3 className="text-4xl font-bold">Our Service Area</h3>
        <p className="text-gray-600 mt-2">
          The Majority Have Suffered Alteration In Some Form, By Injected
          Humour, Or Randomised <br /> Words Which Don&apos;t Look Even Slightly
          Believable.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {data?.map((service) => (
          <div key={service.id} className="card shadow-lg">
             <figure>
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-64 object-cover"
              />
            </figure>
            <div className="card-body">
              <h4 className="card-title">{service.title}</h4>
              <div className="card-actions justify-between items-center">
                <p className="text-primary font-semibold">
                  Price: ${service.price}
                </p>
                <button className="btn btn-outline btn-primary">→</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button className="btn btn-outline btn-primary">More Services</button>
      </div>
    </section>
  );
};

export default Services;
