import { Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
export default function WebRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}



function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

function NotFound() {
  return (
    <>
      <main>
        <h2>NotFound</h2>

      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}