import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { useProject } from "../contexts/projects";
import { TaskItem } from "./TaskItem";

export default function TaskList({ projectId, tasks }) {
  const [checked, setChecked] = React.useState([0]);

  const { updateTask, deleteTask } = useProject();

  const handleToggle = (taskId) => () => {
    const currentIndex = checked.indexOf(taskId);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(taskId);
      updateTask({ projectId, taskId, isCompleted: true });
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', height: 200, maxHeight: 200, overflowY: 'auto' }}>
      {!tasks?.length && (
        <Typography variant="h6" component="div">
          No tasks to show
        </Typography>
      )}
      {Array.isArray(tasks) && tasks.map(({ id: taskId, isCompleted, description, createdAt, finishDate }) => (
        <TaskItem
          key={taskId}
          id={taskId}
          isCompleted={isCompleted}
          description={description}
          createdAt={createdAt}
          finishDate={finishDate}
          handleToggle={handleToggle}
          checked={checked}
        />
      ))}
    </List>
  );
}