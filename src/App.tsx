import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contexts from "./context/Contexts";
import NotificationWrapper from "./components/NotificationWrapper";
import ScrollToTopWrapper from "./components/ScrollToTopWrapper";
import { publicRoutes } from "./constants/data";

function App() {
  return (
    <Contexts>
      <NotificationWrapper />
      <Router>
        <ScrollToTopWrapper>
          <Routes>
            {publicRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  route.layout ? (
                    <route.layout>
                      <route.component />
                    </route.layout>
                  ) : (
                    <route.component />
                  )
                }
              />
            ))}
          </Routes>
        </ScrollToTopWrapper>
      </Router>
    </Contexts>
  );
}

export default App;
