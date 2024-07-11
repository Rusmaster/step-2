import stylesApp from "./app.module.css";
import AppHeader from "../AppHeader";
import BurgerContent from "../BurgerContent";

function App() {
  return (
    <div className={stylesApp.app}>
      <AppHeader />
      <BurgerContent />
    </div>
  );
}

export default App;
