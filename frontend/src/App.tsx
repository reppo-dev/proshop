import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreens from "./screens/HomeScreens";

function App() {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-7xl">
        <Header />
        <main>
          <HomeScreens />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
