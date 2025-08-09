import React from "react";
import { Link, useNavigate } from "react-router-dom";


export default function ProductCard({ product }) {

  const navigate = useNavigate();
  const isOutOfStock = product.stock <= 0 || !product.isAvailable;
  const isDiscounted = product.labelledPrice > product.price;

  return (
    <Link to={`/overview/${product.productId}`}
      className="w-72 with-full min-h-[300px] h-fit bg-white rounded-3xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col group relative overflow-hidden"
      tabIndex={0}
      aria-label={`Product card for ${product.name}`}
    >
      {/* Discount Badge */}
      {isDiscounted && (
        <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow">
          -{Math.round(((product.labelledPrice - product.price) / product.labelledPrice) * 100)}%
        </span>
      )}

      {/* Product Image */}
      <div className="flex items-center justify-center h-44 bg-gray-50 rounded-t-3xl overflow-hidden">
        <img
          src={product.images[0] || "https://via.placeholder.com/150"}
          alt={product.name}
          className="object-contain h-40 w-full transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 px-5 py-4">
        {/* Product Name */}
        <h2 className="text-lg font-bold text-gray-800 text-center mb-2 truncate" title={product.name}>
          {product.name}
        </h2>

        

        {/* Price */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-xl font-bold text-green-600">${product.price.toFixed(2)}</span>
          {isDiscounted && (
            <span className="text-base text-gray-400 line-through">${product.labelledPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Stock Status */}
        {/* <div className="text-center mb-4">
          {isOutOfStock ? (
            <span className="text-xs font-medium text-red-500 bg-red-100 px-2 py-1 rounded-full">
              Out of stock
            </span>
          ) : (
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              In stock ({product.stock})
            </span>
          )}
        </div> */}

        {/* Bottom Buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            disabled={isOutOfStock}
            className={`flex-1 py-2 rounded-lg font-semibold transition-colors
              ${
                isOutOfStock
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              }
            `}
            aria-disabled={isOutOfStock}
          >
            Add to Cart
          </button>
          <button
            disabled={isOutOfStock}
            className={`flex-1 py-2 rounded-lg font-semibold transition-colors
              ${
                isOutOfStock
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white shadow-sm"
              }
            `}
            aria-disabled={isOutOfStock}

            onClick={() => {
              navigate(`/checkout`, { state: { 
                cart :[
                  { productId: product.productId, 
                    name: product.name,
                    image: product.images[0],
                    price: product.price,
                    labelledPrice: product.labelledPrice,
                    quantity: 1 
                  }
                ]
               } });
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </Link>
  );
}