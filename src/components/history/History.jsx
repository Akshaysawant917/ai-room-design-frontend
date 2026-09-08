import { useEffect, useState } from "react";
import { ArrowRight, Clock3, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { getTransformations } from "../../api/transformations";

function History() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadHistory = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getTransformations();
      setItems(response.data?.items || []);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <main className="mx-auto min-h-[calc(100vh-82px)] max-w-[1100px] px-5 py-14 sm:px-12 sm:py-20">
      <div className="mb-8 flex items-end justify-between gap-6 sm:mb-12">
        <div>
          <p className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[1.7px] text-[#bd5c42]">
            <Clock3 size={14} /> Your saved spaces
          </p>
          <h1 className="text-5xl font-medium leading-[.98] tracking-[-2.5px] sm:text-7xl">
            My <em>transformations.</em>
          </h1>
        </div>
        <button
          className="flex items-center gap-2 border-0 bg-transparent text-xs font-semibold"
          onClick={loadHistory}
        >
          <RefreshCw size={15} /> Refresh
        </button>
      </div>
      {loading && (
        <div className="grid gap-4 sm:grid-cols-3">
          <HistorySkeleton />
          <HistorySkeleton />
          <HistorySkeleton />
        </div>
      )}
      {!loading && error && (
        <div className="border border-[#d8d2c8] p-16 text-center">
          <p className="mb-5 text-[#a33d2c]">{error}</p>
          <button
            className="border border-[#20221f] bg-transparent px-5 py-3 text-xs font-semibold"
            onClick={loadHistory}
          >
            Try again
          </button>
        </div>
      )}
      {!loading && !error && !items.length && (
        <div className="border border-[#d8d2c8] p-12 text-center sm:p-16">
          <h2 className="text-4xl font-medium tracking-[-2px]">
            No rooms here <em>yet.</em>
          </h2>
          <p className="my-5 text-sm text-[#6e7169]">
            Upload a room photo and see what your home could become.
          </p>
          <Link
            className="inline-flex items-center gap-5 bg-[#20221f] px-5 py-3 text-xs font-semibold text-[#f6f3ee]"
            to="/transform/upload"
          >
            Transform my room <ArrowRight size={16} />
          </Link>
        </div>
      )}
      {!loading && !error && items.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-3">
          {items.map((item) => (
            <HistoryCard item={item} key={item.id} />
          ))}
        </div>
      )}
    </main>
  );
}

function HistoryCard({ item }) {
  return (
    <Link
      className="group border border-[#d8d2c8] bg-[#f9f7f3] transition hover:-translate-y-1 hover:border-[#bd5c42]"
      to={`/transformations/${item.id}`}
    >
      <div className="grid aspect-[1.35] grid-cols-2">
        <img
          className="h-full w-full object-cover saturate-50"
          src={item.originalImageUrl}
          alt="Original room"
        />
        <img
          className="h-full w-full border-l-2 border-[#f6f3ee] object-cover"
          src={item.generatedImageUrl || item.originalImageUrl}
          alt="Generated room"
        />
      </div>
      <div className="relative p-4">
        <span
          className={`text-[9px] uppercase tracking-[1px] ${item.status === "COMPLETED" ? "text-[#748277]" : item.status === "FAILED" ? "text-[#a33d2c]" : "text-[#bd5c42]"}`}
        >
          {item.status}
        </span>
        <h3 className="my-3 text-lg font-medium capitalize">{item.roomType}</h3>
        <p className="text-[11px] text-[#6e7169]">
          {item.styles?.join(" + ")} · {item.budget}
        </p>
        <ArrowRight className="absolute bottom-4 right-4" size={16} />
      </div>
    </Link>
  );
}

function HistorySkeleton() {
  return (
    <div className="border border-[#d8d2c8] pb-5">
      <div className="aspect-[1.35] animate-pulse bg-[#ebe6dd]" />
      <span className="mx-4 mt-4 block h-2/3 w-3/5 animate-pulse bg-[#ebe6dd]" />
      <span className="mx-4 mt-2 block h-2 w-2/5 animate-pulse bg-[#ebe6dd]" />
    </div>
  );
}

export default History;
