import React, { useState, useEffect } from "react";
import { Nav } from '../components/Nav';
import { ProjectItem } from '../components/ProjectItem';
import { useProject } from "../contexts/projects";
import { Item } from '../components/Item';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export const Home = () => {
  const { projects, fetchProjects, createProject } = useProject();
  const [projectName, setProjectName] = useState('');

  const handleChange = (event) => {
    setProjectName(event.target.value);
  }

  const handleCreateProject = () => {
    createProject({ name: projectName });
    setProjectName('');
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="home">
      <Nav />
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        <Grid container spacing={3}>
          {projects && projects.map((project) => (
            <ProjectItem key={project?.id} id={project?.id} name={project?.name} tasks={project?.tasks} />
          ))}
          <Grid item xs={3}>
            <Box sx={{ padding: 3, background: 'gainsboro', border: '1px solid gray', borderRadius: '6px' }}>
              <Stack spacing={2} direction="column">
                <Typography variant="h6" component="div">
                  Create a new project
                </Typography>
                <TextField sx={{ width: '100%', background: 'white' }} id="outlined-basic" label="Project Name" variant="outlined" onChange={handleChange} value={projectName} />
                <Button variant="contained" onClick={handleCreateProject}>Create Project</Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div >
  )
}