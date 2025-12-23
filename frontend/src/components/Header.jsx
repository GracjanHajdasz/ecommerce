import { Search, ShoppingCart } from "lucide-react";
import "./Header.css";

export function Header() {
  return (
    <header>
      <img src="images/logo.png" alt="StreetStyle" />
      <div className="nav-center">
        <p>Home</p>
        <p>Shop</p>
        <p>Categories</p>
        <p>About</p>
      </div>
      <div className="header-right">
        <div className="icon-wrapper">
          <Search size={20} />
        </div>
        <div className="icon-wrapper">
          <ShoppingCart size={20} />
        </div>
        <p>login</p>
      </div>
    </header>
  );
}
