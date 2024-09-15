import ServiceInfo from "@/app/components/ServiceInfo";
import { getServiceById } from "@/services/getServices";
import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

export const metadata = {
  title: "Service Details",
  description: "Service Details Page",
};

const page = async ({ params }) => {
  const details = await getServiceById(params.id);
  console.log("service details", details);
  const { _id, title, img, price, description, facility } = details.data;

  return (
    <div className="container mx-auto mt-2">
      {/* banner part */}
      <div className="relative w-full h-[300px] rounded-lg">
        {/* Background Image */}
        <Image
          src={img} // Replace with your image path
          alt="Service Details Background"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
          priority // Loads the image quickly as it's likely above the fold
        />

        {/* Overlay for text */}
        <div className="absolute inset-0 pl-8 bg-black bg-opacity-50 flex flex-col justify-center">
          <h1 className="text-white text-4xl font-bold">Details of {title}</h1>
        </div>
        <div className="absolute bottom-0 justify-center items-center flex mt-2">
          <div className="bg-primary text-white py-2 px-4 rounded-t-full">
            Home / Service Details
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {/* Service Image */}
          <Image
            src="/assets/images/banner/3.jpg"
            alt="Service Image"
            width={800}
            height={400}
            className="rounded-md"
          />

          {/* Service Description */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="mt-4 text-gray-700">{description}</p>
          </div>

          {/* Features Section */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {facility.map((item, index) => (
              <div className="bg-gray-100 p-6 rounded-md border-2 border-t-primary">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600 mt-3">{item.details}</p>
              </div>
            ))}
          </div>

          {/* Steps to Process */}
          <div className="mt-10">
            <h3 className="text-xl font-bold">3 Simple Steps to Process</h3>
            <p className="text-gray-600 mt-2">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable.
            </p>
            {/* Steps Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {/* Step 1 */}
              <div className="flex flex-col border items-center bg-white shadow-md rounded-lg p-8 text-center">
                <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  01
                </div>
                <h4 className="text-lg font-semibold">Step One</h4>
                <p className="text-gray-600 mt-2">
                  It uses a dictionary of over 200.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col border items-center bg-white shadow-md rounded-lg p-8 text-center">
                <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  02
                </div>
                <h4 className="text-lg font-semibold">Step One</h4>
                <p className="text-gray-600 mt-2">
                  It uses a dictionary of over 200.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col border items-center bg-white shadow-md  rounded-lg p-8 text-center">
                <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  03
                </div>
                <h4 className="text-lg font-semibold">Step One</h4>
                <p className="text-gray-600 mt-2">
                  It uses a dictionary of over 200.
                </p>
              </div>
            </div>
            {/* Video Section */}
            <div className="mt-8 relative">
              <Image
                src="/assets/images/banner/2.jpg"
                alt="Service Video"
                width={800}
                height={400}
                className="rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-primary text-white rounded-full p-4">
                  <FaPlay size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Services List */}
          <ServiceInfo />

          {/* Pricing Information */}
          <div className="bg-gray-100 p-4 rounded-md mt-8">
            <h4 className="text-lg font-semibold mb-2">Price: {price}</h4>
            <Link href={`/pages/checkout/${_id}`}>
              <button className="btn btn-primary text-white w-full py-2 mt-4 rounded-md">
                Proceed Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
