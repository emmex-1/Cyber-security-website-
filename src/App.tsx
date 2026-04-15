import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
// import About from "./pages/About";
import Courses from "./pages/Courses";
import Pricing from "./pages/Pricing";
import Training from "./pages/Training";
// import Podcast from "./pages/Podcast";
import Resources from "./pages/Resources";
import Services from "./pages/Services";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Gallery from "./pages/Gallery";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <ScrollToTop /> 
        <Routes>
          <Route path="/" element={<Index />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/courses" element={<Courses />} />
          <Route path="/workshops" element={<Pricing />} />
          <Route path="/training" element={<Training />} />
          {/* <Route path="/podcast" element={<Podcast />} /> */}
          <Route path="/resources" element={<Resources />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
