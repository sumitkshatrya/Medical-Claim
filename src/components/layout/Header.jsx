import DownloadButton from "../common/DownloadButton";

export default function Header({ title, claimId, data }) {
  return (
    <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shrink-0">
      <div>
        <h1 className="text-lg font-semibold">{title}</h1>
        {claimId && (
          <p className="text-xs text-gray-300 mt-1">Claim ID: {claimId}</p>
        )}
      </div>
      <DownloadButton data={data} />
    </header>
  );
}