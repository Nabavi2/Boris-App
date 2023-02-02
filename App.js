import React from "react";
import { Provider as RNPProvider } from "react-native-paper";
import AppNavigation from "./Navigation/AppNavigation";

const App = () => {
  return (
    <RNPProvider>
      <AppNavigation />
    </RNPProvider>
  );
};

export default App;
