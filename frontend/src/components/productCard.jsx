import React from "react";
import { Link, useNavigate } from "react-router-dom";


export default function ProductCard({ product }) {

  const navigate = useNavigate();
  const isOutOfStock = product.stock <= 0 || !product.isAvailable;
  const isDiscounted = product.labelledPrice > product.price;

  return (
    <Link 
      to={`/overview/${product.productId}`}
      className="w-full max-w-[19rem] min-h-[320px] bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-100 flex flex-col group relative overflow-hidden focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:outline-none"
      tabIndex={0}
      aria-label={`Product card for ${product.name}`}
    >
      {/* Discount Badge */}
      {isDiscounted && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-md z-10 shadow-sm tracking-wide">
          SAVE {Math.round(((product.labelledPrice - product.price) / product.labelledPrice) * 100)}%
        </span>
      )}

      {/* Product Image */}
      <div className="relative flex items-center justify-center h-48 bg-gray-50/50 p-4 border-b border-gray-50 overflow-hidden">
        <img
          src={product.images[0] || "https://via.placeholder.com/150"}
          alt={product.name}
          className="object-contain h-full w-full transition-transform duration-500 group-hover:scale-110 drop-shadow-sm"
          loading="lazy"
        />
        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Product Name */}
        <h2 className="text-lg font-bold text-gray-800 leading-tight mb-2 line-clamp-2" title={product.name}>
          {product.name}
        </h2>

        {/* Price & Stock Section */}
        <div className="flex flex-col gap-1 mb-5">
          <div className="flex items-end gap-2 flex-wrap">
            <span className="text-2xl font-black text-gray-900">${product.price.toFixed(2)}</span>
            {isDiscounted && (
              <span className="text-sm font-semibold text-gray-400 line-through pb-1 decoration-gray-300 decoration-2">
                ${product.labelledPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center mt-1">
            {isOutOfStock ? (
              <span className="flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-md border border-red-100">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Out of stock
              </span>
            ) : product.stock <= 5 ? (
              <span className="flex items-center gap-1 text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-md border border-orange-100">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span> Only {product.stock} left
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-md border border-green-100">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> In stock
              </span>
            )}
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Add to cart logic here
            }}
            disabled={isOutOfStock}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2
              ${
                isOutOfStock
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                  : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 active:scale-95"
              }
            `}
            aria-disabled={isOutOfStock}
          >
            Add to Cart
          </button>
          <button
            disabled={isOutOfStock}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2
              ${
                isOutOfStock
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-200"
                  : "bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700 hover:border-blue-700 hover:shadow-md active:scale-95 shadow-blue-500/30"
              }
            `}
            aria-disabled={isOutOfStock}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
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