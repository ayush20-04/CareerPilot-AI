const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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
  return request("/ai/analyze-profile", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};

export const optimizeHeadline = (payload) => {
  return request("/ai/optimize-headline", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};

export const generateAbout = (payload) => {
  return request("/ai/generate-about", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};

export const suggestSkills = (payload) => {
  return request("/ai/suggest-skills", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};

export const generatePost = (payload) => {
  return request("/ai/generate-post", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};

export const getHistory = () => {
  return request("/history");
};

export const deleteHistoryItem = (id) => {
  return request(`/history/${id}`, {
    method: "DELETE"
  });
};
