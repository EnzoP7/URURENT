import { StatusBar } from "expo-status-bar";

import Navigation2 from "./src/routes/Navigation2";
import { AlquilerProvider } from "./src/Providers/alquilerProvider";

export default function App() {
  return (
    <>
      <AlquilerProvider>
        <StatusBar style="auto" />
        <Navigation2 />
      </AlquilerProvider>
    </>
  );
}
