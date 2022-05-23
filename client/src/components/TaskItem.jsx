import React from "react";
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { useProject } from "../contexts/projects";


export const TaskItem = ({ taskId, isCompleted, description, createdAt, finishDate, handleToggle, checked }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const { updateTask, deleteTask } = useProject();

  const [newTaskDescription, setNewTaskDescription] = React.useState(description);

  const handleEdit = () => {
    setIsEditing(true);
  }

  const EDIT_ACTIONS = {
    CONFIRM: {
      name: 'CONFIRM',
      submitChange(taskId) {
        updateTask({ projectId, taskId, description: newTaskDescription });
        setIsEditing(false);
      }
    },
    CANCEL: {
      name: 'CANCEL',
      submitChange() {
        setNewTaskDescription(description);
        setIsEditing(false);
      }
    }
  }

  const handleTaskDescriptionChange = (event) => {
    setNewTaskDescription(event.target.value)
  }


  const handleDelete = (taskId) => {
    deleteTask({ projectId, taskId });
  }

  return (
    <ListItem
      key={taskId}
      secondaryAction={
        isEditing ? (
          <Stack spacing={2} direction="row">
            <IconButton onClick={() => EDIT_ACTIONS.CONFIRM.submitChange(taskId)} edge="end" aria-label="confirm">
              <CheckIcon sx={{ fontSize: '15px' }} />
            </IconButton>
            <IconButton onClick={EDIT_ACTIONS.CANCEL.submitChange} edge="end" aria-label="cancel">
              <CancelIcon sx={{ fontSize: '15px' }} />
            </IconButton>
          </Stack>
        ) : (
          <Stack spacing={2} direction="row">
            <IconButton onClick={handleEdit} edge="end" aria-label="edit">
              <EditIcon sx={{ fontSize: '15px' }} />
            </IconButton>
            <IconButton onClick={() => handleDelete(taskId)} edge="end" aria-label="delete">
              <DeleteIcon sx={{ fontSize: '15px' }} />
            </IconButton>
          </Stack>
        )
      }
      disablePadding
    >
      {isEditing ? (
        <TextField size="small" id="outlined-basic" label="Change description" variant="standard" onChange={handleTaskDescriptionChange} value={newTaskDescription} />
      ) : (
        <ListItemButton role={undefined} onClick={handleToggle(taskId)} dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={checked.indexOf(taskId) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': taskId }}
            />
          </ListItemIcon>
          {
            finishDate ? (
              <Tooltip title={finishDate}>
                <ListItemText id={taskId} primary={`${newTaskDescription}`} />
              </Tooltip>
            ) : (
              <ListItemText id={taskId} primary={`${newTaskDescription}`} />
            )
          }
        </ListItemButton>
      )}
    </ListItem>
  );
}