const renderValue = (value) => {
  if (Array.isArray(value)) {
    return (
      <ul className="space-y-2">
        {value.map((item, index) => (
          <li
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
            key={`${item}-${index}`}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  if (typeof value === "object" && value !== null) {
    return <ResultCard result={value} />;
  }

  return (
    <p className="whitespace-pre-wrap rounded-md border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-700">
      {value}
    </p>
  );
};

const formatLabel = (label) => {
  return label
    .replace(/([A-Z])/g, " $1")
    .replace(/-/g, " ")
    .replace(/^./, (letter) => letter.toUpperCase());
};

const ResultCard = ({ result }) => {
  if (!result) {
    return null;
  }

  return (
    <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
      {Object.entries(result).map(([key, value]) => (
        <div className="space-y-2" key={key}>
          <h3 className="text-sm font-bold text-slate-800">
            {formatLabel(key)}
          </h3>
          {renderValue(value)}
        </div>
      ))}
    </div>
  );
};

export default ResultCard;
