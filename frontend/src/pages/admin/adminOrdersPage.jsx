import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/loading";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You are not logged in");
        setIsLoading(false);
        return;
      }

      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setOrders(response.data.orders);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to fetch orders");
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full h-full bg-gray-50 max-h-full overflow-y-scroll relative rounded-lg">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">
          Order Management
        </h2>

        {!isLoading ? (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="w-full bg-white border border-blue-100">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="py-3 px-4 text-left font-medium">Order ID</th>
                  <th className="py-3 px-4 text-left font-medium">Email</th>
                  <th className="py-3 px-4 text-left font-medium">Name</th>
                  <th className="py-3 px-4 text-left font-medium">Phone</th>
                  <th className="py-3 px-4 text-left font-medium">Address</th>
                  <th className="py-3 px-4 text-left font-medium">Status</th>
                  <th className="py-3 px-4 text-left font-medium">Total</th>
                  <th className="py-3 px-4 text-left font-medium">Date</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={order._id}
                    className={`border-t border-blue-50 hover:bg-blue-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-blue-50/30"
                    }`}
                  >
                    <td className="py-3 px-4 font-medium">
                      {order.orderId}
                    </td>

                    <td className="py-3 px-4">{order.email}</td>

                    <td className="py-3 px-4">{order.name}</td>

                    <td className="py-3 px-4">{order.phone}</td>

                    <td className="py-3 px-4 max-w-[220px] truncate">
                      {order.address}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-blue-600 font-semibold">
                      Rs. {order.total}
                    </td>

                    <td className="py-3 px-4 text-gray-600">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}

                {orders.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-6 text-gray-500"
                    >
                      No Orders Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center items-center py-16">
            <div className="w-[70px] h-[70px] border-[5px] border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}