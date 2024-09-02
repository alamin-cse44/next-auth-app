"use client";

import { getServices } from "@/services/getServices";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const ServiceInfo = () => {
  // State to store the services data and selected service
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(
    "635a0c0b64a6d231228942ae"
  );

  // Fetch services data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getServices();
        console.log("test", data);
        setServices(data?.data || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-sm p-4 bg-gray-100 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Services</h2>
      <div className="space-y-2">
        {services.map((service) => (
          <div
            key={service._id}
            className={`flex justify-between items-center p-4 rounded-md cursor-pointer ${
              selectedService === service._id
                ? "bg-primary text-white"
                : "bg-white text-black border border-gray-200"
            }`}
            onClick={() => setSelectedService(service._id)}
          >
            {service.title}
            <Link href={`/services/${service._id}`}>
              <button className="">→</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceInfo;
