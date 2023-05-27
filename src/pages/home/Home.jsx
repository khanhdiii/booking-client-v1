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
        <Featured />
      </div>
      <h1 className="homeTitle">Browse by property type</h1>
      <PropertyList />

      <FeaturedProperties />
      <MailList />
      <Footer />
    </div>
  );
};

export default Home;
