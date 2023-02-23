import { useRecoilValue } from "recoil";
import "./App.css";
import { Content } from "./components/Content";
import { GlobalNavBar } from "./components/GlobalNavBar";
import GNBIndexAtom from "./recoil/GNBIndexAtom";

function App() {
  const tab = useRecoilValue(GNBIndexAtom);
  return (
    <div className="App">
      <GlobalNavBar />
      {tab === -1 ? <></> : <Content />}
    </div>
  );
}

export default App;
