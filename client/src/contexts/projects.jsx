import React from 'react';
import api from '../services/api';

const ProjectContext = React.createContext(null);

export function useProject() {
  return React.useContext(ProjectContext);
}

export function ProjectProvider({ children }) {
  const [projects, setProjects] = React.useState([]);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get("/projects");

      setProjects(data);
    } catch (err) {
      console.log("Error while fetching projects");
      console.error(err.message);
    }
  };

  const createProject = async ({ name }) => {
    try {
      const { data } = await api.post("/projects", { name });

      setProjects((prevProjects) => ([...prevProjects, data]));
    } catch (err) {
      console.log("Error while creating project");
      console.error(err.message);
    }
  };

  const updateProject = async ({ projectId, name }) => {
    try {
      const { data: updatedProject } = await api.patch(`/projects/${projectId}`, { name });

      const projectIdx = projects.findIndex((project) => projectId === project.id);

      setProjects((prevProjects) => {
        prevProjects[projectIdx] = { ...prevProjects[projectIdx], ...updatedProject };

        return [...prevProjects];
      });
    } catch (err) {
      console.log("Error while updating project");
      console.error(err.message);
    }
  };

  const deleteProject = async ({ projectId }) => {
    try {
      await api.delete(`/projects/${projectId}`);

      const newProjects = projects.filter((project) => projectId !== project.id);

      setProjects([...newProjects]);
    } catch (err) {
      console.log("Error while deleting project");
      console.error(err.message);
    }
  };

  const createTask = async ({ projectId, description }) => {
    try {
      const { data: newTask } = await api.post(`/tasks`, { projectId, description });

      const projectIdx = projects.findIndex((project) => projectId === project.id);

      setProjects((prevProjects) => {
        const newTasks = [...prevProjects[projectIdx].tasks, newTask];

        prevProjects[projectIdx].tasks = newTasks;

        return [...prevProjects];
      });
    } catch (err) {
      console.log("Error while creating task");
      console.error(err.message);
    }
  };

  const updateTask = async ({ projectId, taskId, description = null, isCompleted = false }) => {
    try {
      const projectIdx = projects.findIndex((project) => projectId === project.id);
      const projectData = projects[projectIdx];
      const taskIdx = projectData.tasks.findIndex((task) => taskId === task.id);

      const outdatedTask = projectData.tasks[taskIdx];

      const { data: newTask } = await api.patch(`/tasks/${taskId}`, {
        description: description || outdatedTask.description,
        isCompleted,
      });

      setProjects((prevProjects) => {
        prevProjects[projectIdx].tasks[taskIdx] = newTask;

        return [...prevProjects];
      });
    } catch (err) {
      console.log("Error while updating task");
      console.error(err.message);
    }
  };

  const deleteTask = async ({ projectId, taskId }) => {
    try {
      const projectIdx = projects.findIndex((project) => projectId === project.id);
      const projectData = projects[projectIdx];

      await api.delete(`/tasks/${taskId}`);

      setProjects((prevProjects) => {
        const newTasks = projectData.tasks.filter((task) => taskId !== task.id);

        prevProjects[projectIdx].tasks = newTasks;

        return [...prevProjects];
      });

    } catch (err) {
      console.log("Error while deleting task");
      console.error(err.message);
    }
  };

  const value = {
    projects,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    createTask,
    updateTask,
    deleteTask
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export default function ProjectConsumer() {
  return React.useContext(ProjectContext);
}