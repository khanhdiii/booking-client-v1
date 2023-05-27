import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import NavbarMenu from "../../components/navbar/NavbarMenu";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";

const Home = () => {
  return (
    <div>
      <NavbarMenu />
      <Header />
      <div className="homeContainer">
        <h2 className="homeTitle">Top Travels</h2>
        <Featured />
        <h2 className="homeTitle">Browse by property type</h2>
        <PropertyList />
        <h2 className="homeTitle">Homes guests love</h2>
        <FeaturedProperties />
        <MailList />
        <Footer />{" "}
      </div>
    </div>
  );
};

export default Home;
