const FormField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  textarea = false,
  placeholder = "",
  required = false,
  options = []
}) => {
  const inputClasses =
    "mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100";

  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>

      {textarea ? (
        <textarea
          className={`${inputClasses} min-h-28 resize-y`}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      ) : options.length > 0 ? (
        <select
          className={inputClasses}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          className={inputClasses}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      )}
    </label>
  );
};

export default FormField;
