import "./Hero.css";

export function Hero() {
  return (
    <section>
      <div>
        <h1>
          Style that <br /> Stands out
        </h1>
        <p>Trendy streetwear for the culture</p>
        <button className="shop-now-btn">Shop Now</button>
        <button className="view-categories-btn">View Categories</button>
      </div>
      <img src="./images/hero-image.png" alt="hero image" />
    </section>
  );
}
