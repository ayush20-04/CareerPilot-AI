const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    ...options
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
};
export const analyzeProfile = (payload) => {
  return request("/api/ai/analyze-profile", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};

export const optimizeHeadline = (payload) => {
  return request("/api/ai/optimize-headline", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};

export const generateAbout = (payload) => {
  return request("/api/ai/generate-about", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};

export const suggestSkills = (payload) => {
  return request("/api/ai/suggest-skills", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};

export const generatePost = (payload) => {
  return request("/api/ai/generate-post", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};

export const getHistory = () => {
  return request("/api/history");
};

export const deleteHistoryItem = (id) => {
  return request(`/api/history/${id}`, {
    method: "DELETE"
  });
};
