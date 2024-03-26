import { Outlet } from "react-router-dom";
import Footer from "./pages/Footer";
import Header from "./pages/Header";

export default function Root() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
