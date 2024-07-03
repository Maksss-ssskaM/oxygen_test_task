import {Route, Routes} from "react-router-dom";
import {ArticlePage} from "./pages/ArticlePage";
import {ArticlesListPage} from "./pages/ArticlesListPage";

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<ArticlesListPage />}/>
          <Route path="/articles/:id" element={<ArticlePage />}/>
        </Routes>
    </>
  );
}

export default App;
