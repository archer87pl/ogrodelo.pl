import type { GardenProject } from "./types";
import { STORAGE_KEY } from "./types";

export function loadProjects(): GardenProject[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw) as GardenProject[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function saveProjects(projects: GardenProject[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function upsertProject(project: GardenProject): GardenProject[] {
  const projects = loadProjects();
  const idx = projects.findIndex((p) => p.id === project.id);
  const updated = { ...project, updatedAt: new Date().toISOString() };
  if (idx >= 0) projects[idx] = updated;
  else projects.unshift(updated);
  saveProjects(projects.slice(0, 20));
  return loadProjects();
}

export function deleteProject(id: string): GardenProject[] {
  const next = loadProjects().filter((p) => p.id !== id);
  saveProjects(next);
  return next;
}
