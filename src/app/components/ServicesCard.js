import Link from "next/link";
import React from "react";

const ServicesCard = ({ service }) => {
  const { title, img, price, _id } = service;
  return (
    <div className="card shadow-lg">
      <figure>
        <img src={img} alt={title} className="w-full h-64 object-cover" />
      </figure>
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <div className="card-actions justify-between items-center">
          <p className="text-primary font-semibold">Price: ${price}</p>
          <Link href={`/pages/services/${_id}`}>
            <button className="btn btn-outline btn-primary">View →</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
