import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout = ({ currentUser, setCurrentUser }) => {
  return (
    <div>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
