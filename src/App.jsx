import { Button } from "@/components/ui/button";
import Header from "./components/Header";
import "./App.css";
import Main from "./pages/Main";

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Button className="bg-primary text-white hover:bg-primary-dark">
        Primary Button
      </Button>
      <Button className="bg-secondary text-black hover:bg-secondary-dark">
        Secondary Button
      </Button>
      <Button variant="default">Primary Button</Button>
      <Button variant="outline">Primary Button</Button>
    </div>
  );
}

export default App;
