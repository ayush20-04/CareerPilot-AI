import { Trash2 } from "lucide-react";
import ResultCard from "./ResultCard.jsx";

const featureLabels = {
  "profile-analysis": "Profile Analysis",
  "headline-optimizer": "Headline Optimizer",
  "about-generator": "About Generator",
  "skills-suggestions": "Skills Suggestions",
  "post-generator": "Post Generator"
};

const HistoryList = ({ history, onDelete }) => {
  if (!history.length) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-500">
        No saved results yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((item) => (
        <article
          className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
          key={item._id}
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-slate-900">
                {featureLabels[item.feature] || item.feature}
              </h3>
              <p className="text-xs text-slate-500">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
            <button
              className="rounded-md border border-slate-200 p-2 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              type="button"
              aria-label="Delete history item"
              onClick={() => onDelete(item._id)}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <ResultCard result={item.result} />
        </article>
      ))}
    </div>
  );
};

export default HistoryList;
