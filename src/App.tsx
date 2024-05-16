import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HappyProvider } from "@ant-design/happy-work-theme";
import Contexts from "./context/Contexts";
import NotificationWrapper from "./components/shared/NotificationWrapper";
import ScrollToTopWrapper from "./components/shared/ScrollToTopWrapper";
import QueryWrapper from "./components/shared/QueryWrapper";
import { publicRoutes } from "./constants";
import "./App.css";

function App() {
  return (
    <QueryWrapper>
      <HappyProvider>
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
      </HappyProvider>
    </QueryWrapper>
  );
}

export default App;
