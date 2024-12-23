import Footer from "../../components/Client/Footer";
import Buttons from "../../components/Buttons";
import Card from "../../components/Client/Card";
import Navbar from "../../components/Client/Navbar";
import Footers from "./Footer";

function Main() {
  return (
    <div>
      <div className="px-4 block md:hidden">
        <Buttons text={"Tavsiya etilgan"} />
      </div>
      <div className=" hidden md:block">
        <Navbar />
      </div>
      <div className="bg-gray-50 min-h-[87.5vh] p-4 lg:px-40">
        <section className="mt-4">
          <Card
            classNames={
              "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 "
            }
            classNm={
              "flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm relative"
            }
          />
        </section>
      </div>
      <Footers />
      <Footer />
    </div>
  );
}

export default Main;
