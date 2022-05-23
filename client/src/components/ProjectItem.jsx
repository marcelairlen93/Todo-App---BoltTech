import React, { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useProject } from "../contexts/projects";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TaskList from './TaskList';
import { Item } from './Item';

export const ProjectItem = ({ id, name, tasks }) => {
  const { updateProject, deleteProject, createTask } = useProject();
  const [projectName, setProjectName] = useState(name);
  const [taskDescription, setTaskDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);


  const handleTaskDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  }

  const handleCreateTask = () => {
    createTask({ projectId: id, description: taskDescription });
    setTaskDescription('');
  }

  const EDIT_ACTIONS = {
    CONFIRM: {
      name: 'CONFIRM',
      submitChange(id) {
        updateProject({ name: projectName, projectId: id });
        setIsEditing(false);
      }
    },
    CANCEL: {
      name: 'CANCEL',
      submitChange() {
        setProjectName(name);
        setIsEditing(false);
      }
    }
  }

  const handleChange = (event) => {
    setProjectName(event.target.value);
  }

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleDelete = () => {
    deleteProject({ projectId: id });
  }

  return (
    <Grid item xs={3}>
      <Item>
        {isEditing ? (
          <div className="project-title">
            <Stack spacing={2} direction="row">
              <TextField size="small" id="outlined-basic" label="Project Name" variant="outlined" onChange={handleChange} value={projectName} />
              <IconButton onClick={() => EDIT_ACTIONS.CONFIRM.submitChange(id)} edge="end" aria-label="confirm">
                <CheckIcon sx={{ fontSize: '15px' }} />
              </IconButton>
              <IconButton onClick={EDIT_ACTIONS.CANCEL.submitChange} edge="end" aria-label="cancel">
                <CancelIcon sx={{ fontSize: '15px' }} />
              </IconButton>
            </Stack>
          </div>

        ) : (
          <div className="project-title">
            <Typography variant="h6" component="div">
              {projectName}
            </Typography>
            <Stack spacing={2} direction="row">
              <IconButton onClick={handleEdit} edge="end" aria-label="edit">
                <EditIcon sx={{ fontSize: '15px' }} />
              </IconButton>
              <IconButton onClick={handleDelete} edge="end" aria-label="delete">
                <DeleteIcon sx={{ fontSize: '15px' }} />
              </IconButton>
            </Stack>
          </div >
        )}
        {tasks && (
          <TaskList projectId={id} tasks={tasks} />
        )}

        <Box sx={{ padding: 1, borderTop: tasks.length ? '1px solid gainsboro' : 0 }}>
          <ListItem
            secondaryAction={
              <Button variant="contained" onClick={handleCreateTask}>Add</Button>
            }
            disablePadding
          >
            <TextField size="small" id="outlined-basic" label="Create a Task" variant="outlined" onChange={handleTaskDescriptionChange} value={taskDescription} />
          </ListItem>
        </Box>
      </Item>
    </Grid >
  )
}