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
        <i className="fa-solid fa-magnifying-glass"></i>
        <i className="fa-solid fa-cart-shopping"></i>
        <p>login</p>
      </div>
    </header>
  );
}
