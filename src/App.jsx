import "./styles.scss";
import Router from "./Routes";
import AppProvider from "./Context";

function App() {
  return (
    <AppProvider>
      <main
        style={{
          backgroundColor: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "stretch",
          minHeight: "100vh",
        }}
      >
        <Router />
      </main>
    </AppProvider>
  );
}

export default App;
