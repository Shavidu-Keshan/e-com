import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/loading";
export default function AdminOrdersPage() {
     const [orders, setOrders] = useState([]);
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
        if(isLoading){
            const token = localStorage.getItem("token");
            if(!token){
                alert("You are not logged in");
                return;
            }
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then((response) => {
                setOrders(response.data.orders);
                console.log(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                alert("Failed to fetch orders");
                setIsLoading(false);
            });
        }
     },[isLoading])


  return (
    <div className="w-full h-full max-full overflow-y-scroll">
      {
        isLoading ? <Loading />:
        <table>
            <thead>
                
            </thead>
        </table>

      }
    </div>
  );
}
