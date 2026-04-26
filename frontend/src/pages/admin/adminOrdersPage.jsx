import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(0);

  // ================= FETCH ORDERS =================
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

  // ================= UPDATE STATUS =================
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
    <div className="w-full h-full bg-gray-50 overflow-y-scroll p-4">

      <h2 className="text-xl font-semibold text-blue-600 mb-4">
        Order Management
      </h2>

      {/* ================= LOADING ================= */}
      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <div className="w-[70px] h-[70px] border-[5px] border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* ================= MODAL ================= */}
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
                  <p><b>Order ID:</b> {orders[activeOrder].orderId}</p>
                  <p><b>Email:</b> {orders[activeOrder].email}</p>
                  <p><b>Name:</b> {orders[activeOrder].name}</p>
                  <p><b>Phone:</b> {orders[activeOrder].phone}</p>
                  <p className="col-span-2">
                    <b>Address:</b> {orders[activeOrder].address}
                  </p>
                </div>

                {/* PRODUCT TABLE */}
                <div className="border rounded-lg overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-blue-500 text-white">
                      <tr>
                        <th className="p-2">Product</th>
                        <th className="p-2">Image</th>
                        <th className="p-2">Qty</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Subtotal</th>
                      </tr>
                    </thead>

                    <tbody>
                      {orders[activeOrder].products?.map((item) => {
                        const product = item.productInfo;

                        return (
                          <tr key={item._id} className="border-t">
                            <td className="p-2">{product?.name}</td>
                            <td className="p-2">
                              <img
                                src={product?.images?.[0]}
                                className="w-10 h-10 rounded object-cover"
                              />
                            </td>
                            <td className="p-2">{item.quantity}</td>
                            <td className="p-2 text-blue-600">
                              Rs. {product?.price}
                            </td>
                            <td className="p-2 font-bold text-green-600">
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

                  <select
                    value={orders[activeOrder].status}
                    onChange={(e) => updateStatus(e.target.value)}
                    className="border border-blue-600 px-3 py-2 rounded-md text-blue-600"
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

          {/* ================= TABLE ================= */}
          <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-100">
            <table className="w-full bg-white text-sm">

              {/* HEADER */}
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-left">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Address</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={order._id}
                    onClick={() => {
                      setActiveOrder(index);
                      setIsModalOpen(true);
                    }}
                    className="border-b hover:bg-blue-50 cursor-pointer transition"
                  >
                    <td className="p-4 text-blue-600 font-semibold">
                      {order.orderId}
                    </td>

                    <td className="p-4">
                      <p className="font-medium">{order.name}</p>
                      <p className="text-xs text-gray-500">{order.email}</p>
                    </td>

                    <td className="p-4">{order.phone}</td>

                    <td className="p-4 max-w-[180px] truncate">
                      {order.address}
                    </td>

                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${order.status === "pending" ? "bg-yellow-100 text-yellow-700"
                          : order.status === "delivered" ? "bg-green-100 text-green-700"
                            : order.status === "cancelled" ? "bg-red-100 text-red-700"
                              : "bg-purple-100 text-purple-700"
                        }`}>
                        {order.status}
                      </span>
                    </td>

                    <td className="p-4 font-bold text-blue-600">
                      Rs. {order.total}
                    </td>

                    <td className="p-4 text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </>
      )}
    </div>
  );
}