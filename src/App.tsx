import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import { CommitmentSetup } from "@/components/CommitmentSetup";
import { StakeSetup } from "@/components/StakeSetup";
import { Finish } from "@/components/Finish";
import { SuccessPage } from "@/components/finish/SuccessPage";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/commitment" element={<CommitmentSetup />} />
        <Route path="/stake" element={<StakeSetup />} />
        <Route path="/finish" element={<Finish />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;