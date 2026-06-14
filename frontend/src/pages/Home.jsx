import { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  ClipboardList,
  FileText,
  Lightbulb,
  MessageSquareText,
  RefreshCw,
  Sparkles
} from "lucide-react";
import FormField from "../components/FormField.jsx";
import HistoryList from "../components/HistoryList.jsx";
import LoadingButton from "../components/LoadingButton.jsx";
import ResultCard from "../components/ResultCard.jsx";
import {
  analyzeProfile,
  deleteHistoryItem,
  generateAbout,
  generatePost,
  getHistory,
  optimizeHeadline,
  suggestSkills
} from "../services/api.js";

const initialForms = {
  analyzer: {
    headline: "",
    about: "",
    skills: ""
  },
  headline: {
    headline: "",
    targetRole: "",
    skills: ""
  },
  about: {
    name: "",
    targetRole: "",
    experience: "",
    skills: "",
    achievements: ""
  },
  skills: {
    targetRole: "",
    currentSkills: ""
  },
  post: {
    category: "AI",
    topic: "",
    tone: "Professional and helpful"
  }
};

const tools = [
  {
    id: "analyzer",
    title: "Profile Analyzer",
    description: "Strengths, gaps, and next moves.",
    icon: ClipboardList
  },
  {
    id: "headline",
    title: "Headline Optimizer",
    description: "Sharper LinkedIn positioning.",
    icon: Sparkles
  },
  {
    id: "about",
    title: "About Generator",
    description: "A polished profile summary.",
    icon: FileText
  },
  {
    id: "skills",
    title: "Skills Suggestions",
    description: "Relevant skills to add next.",
    icon: Lightbulb
  },
  {
    id: "post",
    title: "Post Generator",
    description: "Professional LinkedIn content.",
    icon: MessageSquareText
  }
];

const Home = () => {
  const [activeTool, setActiveTool] = useState("analyzer");
  const [forms, setForms] = useState(initialForms);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedTool = useMemo(() => {
    return tools.find((tool) => tool.id === activeTool);
  }, [activeTool]);

  const loadHistory = async () => {
    try {
      setIsHistoryLoading(true);
      const data = await getHistory();
      setHistory(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsHistoryLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForms((currentForms) => ({
      ...currentForms,
      [activeTool]: {
        ...currentForms[activeTool],
        [name]: value
      }
    }));
  };

  const submitTool = async () => {
    const payload = forms[activeTool];

    if (activeTool === "analyzer") {
      return analyzeProfile(payload);
    }

    if (activeTool === "headline") {
      return optimizeHeadline(payload);
    }

    if (activeTool === "about") {
      return generateAbout(payload);
    }

    if (activeTool === "skills") {
      return suggestSkills(payload);
    }

    return generatePost(payload);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setResult(null);
    setIsLoading(true);

    try {
      const data = await submitTool();
      setResult(data);
      await loadHistory();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteHistory = async (id) => {
    try {
      setError("");
      await deleteHistoryItem(id);
      await loadHistory();
    } catch (err) {
      setError(err.message);
    }
  };

  const renderFields = () => {
    if (activeTool === "analyzer") {
      return (
        <>
          <FormField
            label="Current LinkedIn Headline"
            name="headline"
            value={forms.analyzer.headline}
            onChange={handleChange}
            placeholder="Example: Software Engineer | React | Node.js"
            required
          />
          <FormField
            label="Current About Section"
            name="about"
            value={forms.analyzer.about}
            onChange={handleChange}
            placeholder="Paste your current LinkedIn About section"
            textarea
            required
          />
          <FormField
            label="Current Skills"
            name="skills"
            value={forms.analyzer.skills}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB, Communication"
            textarea
            required
          />
        </>
      );
    }

    if (activeTool === "headline") {
      return (
        <>
          <FormField
            label="Current Headline"
            name="headline"
            value={forms.headline.headline}
            onChange={handleChange}
            placeholder="Your current LinkedIn headline"
            required
          />
          <FormField
            label="Target Role"
            name="targetRole"
            value={forms.headline.targetRole}
            onChange={handleChange}
            placeholder="Example: Data Analyst"
            required
          />
          <FormField
            label="Key Skills"
            name="skills"
            value={forms.headline.skills}
            onChange={handleChange}
            placeholder="SQL, Python, Power BI"
          />
        </>
      );
    }

    if (activeTool === "about") {
      return (
        <>
          <FormField
            label="Name"
            name="name"
            value={forms.about.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
          <FormField
            label="Target Role"
            name="targetRole"
            value={forms.about.targetRole}
            onChange={handleChange}
            placeholder="Example: Frontend Developer"
            required
          />
          <FormField
            label="Experience"
            name="experience"
            value={forms.about.experience}
            onChange={handleChange}
            placeholder="Example: 2 years building React apps"
          />
          <FormField
            label="Skills"
            name="skills"
            value={forms.about.skills}
            onChange={handleChange}
            placeholder="React, JavaScript, Tailwind CSS"
            textarea
            required
          />
          <FormField
            label="Achievements"
            name="achievements"
            value={forms.about.achievements}
            onChange={handleChange}
            placeholder="Projects, awards, certifications, or career wins"
            textarea
          />
        </>
      );
    }

    if (activeTool === "skills") {
      return (
        <>
          <FormField
            label="Target Role"
            name="targetRole"
            value={forms.skills.targetRole}
            onChange={handleChange}
            placeholder="Example: AI Engineer"
            required
          />
          <FormField
            label="Current Skills"
            name="currentSkills"
            value={forms.skills.currentSkills}
            onChange={handleChange}
            placeholder="Python, APIs, SQL"
            textarea
            required
          />
        </>
      );
    }

    return (
      <>
        <FormField
          label="Post Category"
          name="category"
          value={forms.post.category}
          onChange={handleChange}
          options={["AI", "Data Science", "Career Tips", "Productivity"]}
          required
        />
        <FormField
          label="Topic"
          name="topic"
          value={forms.post.topic}
          onChange={handleChange}
          placeholder="Example: How AI tools improve daily work"
          required
        />
        <FormField
          label="Tone"
          name="tone"
          value={forms.post.tone}
          onChange={handleChange}
          placeholder="Professional and helpful"
        />
      </>
    );
  };

  const ToolIcon = selectedTool.icon;

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-teal-700">
              <BriefcaseBusiness className="h-4 w-4" />
              AI LinkedIn Profile Workspace
            </div>
            <h1 className="text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
              CareerPilot AI
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Optimize profiles, generate stronger career copy, and save every AI result.
            </p>
          </div>

          <button
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-teal-200 hover:bg-teal-50"
            type="button"
            onClick={loadHistory}
            disabled={isHistoryLoading}
          >
            <RefreshCw
              className={`h-4 w-4 ${isHistoryLoading ? "animate-spin" : ""}`}
            />
            Refresh History
          </button>
        </header>

        {error && (
          <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <section className="space-y-5">
            <nav className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {tools.map((tool) => {
                const Icon = tool.icon;
                const isActive = activeTool === tool.id;

                return (
                  <button
                    className={`min-h-24 rounded-lg border p-4 text-left transition ${
                      isActive
                        ? "border-teal-600 bg-teal-700 text-white shadow-md"
                        : "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-teal-200 hover:bg-teal-50"
                    }`}
                    type="button"
                    key={tool.id}
                    onClick={() => {
                      setActiveTool(tool.id);
                      setResult(null);
                      setError("");
                    }}
                  >
                    <Icon className="mb-3 h-5 w-5" />
                    <span className="block text-sm font-bold">
                      {tool.title}
                    </span>
                    <span
                      className={`mt-1 block text-xs leading-5 ${
                        isActive ? "text-teal-50" : "text-slate-500"
                      }`}
                    >
                      {tool.description}
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-orange-100 text-orange-700">
                  <ToolIcon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-950">
                    {selectedTool.title}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {selectedTool.description}
                  </p>
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {renderFields()}
                <LoadingButton isLoading={isLoading}>
                  Generate Result
                </LoadingButton>
              </form>
            </div>

            {result && (
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-slate-950">
                  AI Result
                </h2>
                <ResultCard result={result} />
              </div>
            )}
          </section>

          <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-950">
                Saved History
              </h2>
              <p className="text-sm text-slate-500">
                Latest 25 generated results from MongoDB.
              </p>
            </div>
            <HistoryList history={history} onDelete={handleDeleteHistory} />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Home;
