
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import ContactList from "./pages/contact/Contact";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import SearchJobs from "./pages/searchJobs/SearchJobs";
import CompanyList from "./pages/companyList/CompanyList";
import About from "./pages/about/About";
import JobDetails from "./pages/jobDetails/JobDetails";

function App() {
  

  return (
    <BrowserRouter>
    <div className="flex flex-col h-screen justify-between ">
      <Header />
      <div className="flex-grow ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/contact" element={<ContactList />} />
        <Route path="/search-jobs" element={<SearchJobs />} />
        <Route path="/company-list" element={<CompanyList />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </div>
      <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;