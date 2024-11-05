import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import HomeLayout from '../layout/HomeLayout';
import Login from "@/pages/auth/Login.jsx";
import RegisterBuyer from "@/pages/auth/RegisterBuyer.jsx";
import Cart from "@/pages/cart/Cart.jsx";
import RegisterSeller from "@/pages/auth/RegisterSeller.jsx";
import RegisterDeliveryUnit from "@/pages/auth/RegisterDeliveryUnit.jsx";
import AdminLayout from "@/layout/AdminLayout.jsx";
import SellerLayout from "@/layout/SellerLayout.jsx";
import DeliveryLayout from "@/layout/DeliveryLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register-buyer",
        element: <RegisterBuyer />,
      },
      {
        path: "/seller-channel",
        element: <RegisterSeller />,
      },
      {
        path: "/shipping-channel",
        element: <RegisterDeliveryUnit />,
      },
      {
        path: "/cart",
        element: <Cart />
      },
      
    ],
  },
  {
    path:"/admin",
    element: <AdminLayout />
  },
  {
    path: "/seller",
    element: <SellerLayout />,
  },
  {
    path: "delivery",
    element: <DeliveryLayout />
  }
]);


export default router;


