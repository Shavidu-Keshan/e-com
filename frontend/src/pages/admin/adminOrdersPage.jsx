import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(0);

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

  // ✅ STATUS UPDATE FUNCTION
  async function updateStatus(newStatus) {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        import.meta.env.VITE_BACKEND_URL +
          "/api/order/" +
          orders[activeOrder].orderId +
          "/status",
        { status: newStatus },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Order status updated");

      // update UI instantly
      setOrders((prev) =>
        prev.map((item, index) =>
          index === activeOrder
            ? { ...item, status: newStatus }
            : item
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  }

  return (
    <div className="w-full h-full bg-gray-50 max-h-full overflow-y-scroll relative rounded-lg">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">
          Order Management
        </h2>

        {!isLoading ? (
          <div className="overflow-x-auto rounded-lg shadow-md">

            {/* MODAL */}
            <Modal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              className="bg-white w-[95%] max-w-3xl mx-auto mt-16 rounded-xl shadow-2xl outline-none"
              overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center"
            >
              {orders[activeOrder] && (
                <div className="p-6 space-y-5">

                  {/* HEADER */}
                  <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-xl font-semibold text-blue-600">
                      Order Details
                    </h2>

                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-500 hover:text-red-500 text-xl"
                    >
                      ✕
                    </button>
                  </div>

                  {/* ORDER INFO */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <p><span className="font-medium">Order ID:</span> {orders[activeOrder].orderId}</p>
                    <p><span className="font-medium">Email:</span> {orders[activeOrder].email}</p>
                    <p><span className="font-medium">Name:</span> {orders[activeOrder].name}</p>
                    <p><span className="font-medium">Phone:</span> {orders[activeOrder].phone}</p>
                    <p className="col-span-2">
                      <span className="font-medium">Address:</span> {orders[activeOrder].address}
                    </p>
                  </div>

                  {/* PRODUCT TABLE */}
                  <div className="overflow-x-auto border rounded-lg">
                    <table className="w-full text-sm">
                      <thead className="bg-blue-500 text-white">
                        <tr>
                          <th className="py-2 px-3 text-left">Product</th>
                          <th className="py-2 px-3 text-left">Image</th>
                          <th className="py-2 px-3 text-left">Qty</th>
                          <th className="py-2 px-3 text-left">Price</th>
                          <th className="py-2 px-3 text-left">Subtotal</th>
                        </tr>
                      </thead>

                      <tbody>
                        {orders[activeOrder].products?.map((item) => {
                          const product = item.productInfo;

                          return (
                            <tr
                              key={item._id}
                              className="border-t hover:bg-blue-50 transition"
                            >
                              <td className="py-2 px-3 font-medium">
                                {product?.name}
                              </td>

                              <td className="py-2 px-3">
                                <img
                                  src={product?.images?.[0]}
                                  alt={product?.name}
                                  className="w-10 h-10 object-cover rounded border"
                                />
                              </td>

                              <td className="py-2 px-3">
                                {item.quantity}
                              </td>

                              <td className="py-2 px-3 text-blue-600">
                                Rs. {product?.price}
                              </td>

                              <td className="py-2 px-3 font-semibold text-green-600">
                                Rs. {product?.price * item.quantity}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* STATUS + TOTAL */}
                  <div className="flex justify-between items-center border-t pt-3">

                    {/* 🔥 STATUS DROPDOWN */}
                    <select
                      value={orders[activeOrder].status}
                      onChange={(e) => updateStatus(e.target.value)}
                      className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
                    >
                      <option value="pending">Pending</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="returned">Returned</option>
                    </select>

                    <p className="text-lg font-bold text-blue-600">
                      Total: Rs. {orders[activeOrder].total}
                    </p>
                  </div>

                </div>
              )}
            </Modal>

            {/* TABLE */}
            <table className="w-full bg-white border border-blue-100">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="py-3 px-4 text-left">Order ID</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Phone</th>
                  <th className="py-3 px-4 text-left">Address</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Total</th>
                  <th className="py-3 px-4 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={order._id}
                    onClick={() => {
                      setActiveOrder(index);
                      setIsModalOpen(true);
                    }}
                    className="border-t hover:bg-blue-50 cursor-pointer"
                  >
                    <td className="py-3 px-4">{order.orderId}</td>
                    <td className="py-3 px-4">{order.email}</td>
                    <td className="py-3 px-4">{order.name}</td>
                    <td className="py-3 px-4">{order.phone}</td>
                    <td className="py-3 px-4">{order.address}</td>
                    <td className="py-3 px-4">{order.status}</td>
                    <td className="py-3 px-4">Rs. {order.total}</td>
                    <td className="py-3 px-4">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
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