import React from "react";

const Cart = ({ openCanvas, toggleOffCanvas }) => {
  return (
    <>
      {/* Off-canvas overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity bg-black bg-opacity-50 ${
          openCanvas ? "block" : "hidden"
        }`}
        onClick={toggleOffCanvas} // Click outside to close the off-canvas
      ></div>

      {/* Off-canvas content (Right side) */}
      <div
        className={`fixed top-0 right-0 z-50 w-64 h-full bg-white shadow-lg transform transition-transform ease-in-out duration-300 ${
          openCanvas ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between p-2">
          <h2 className="text-xl font-bold ">Cart</h2>
          <button
            className="btn btn-sm btn-primary "
            onClick={toggleOffCanvas}
          >
            Close
          </button>
        </div>

        <div className="divider p-0"></div>

        {/* Off-canvas content, scrollable */}
        <div className="p-4 overflow-y-auto h-[calc(100vh-50px)]">
          <ul>
            <li className="py-2">
              <a href="#item1" className="link link-hover">
                Menu Item 1
              </a>
            </li>
            <li className="py-2">
              <a href="#item2" className="link link-hover">
                Menu Item 2
              </a>
            </li>
            <li className="py-2">
              <a href="#item3" className="link link-hover">
                Menu Item 3
              </a>
            </li>
            <li className="py-2">
              <a href="#item4" className="link link-hover">
                Menu Item 4
              </a>
            </li>
            <li className="py-2">
              <a href="#item5" className="link link-hover">
                Menu Item 5
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Cart;
