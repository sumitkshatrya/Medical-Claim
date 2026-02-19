import Layout from "./components/layout/Layout";
import Header from "./components/layout/Header";
import data from "./data/data.json";

export default function App() {
  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      <Header 
        title="Medical Claim Review Dashboard" 
        claimId={data?.claim_id}
        data={data}
      />
      <div className="flex-1 overflow-hidden">
        <Layout data={data} />
      </div>
    </div>
  );
}