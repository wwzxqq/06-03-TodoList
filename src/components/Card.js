import React, { useState } from 'react';
import EditTask from '../modals/EditTask';
import { Card as MuiCard, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
    const [modal, setModal] = useState(false);

    const categoryColors = {
        Work: { primaryColor: "#FFD700", secondaryColor: "#FFFACD" }, 
        Personal: { primaryColor: "#FF4500", secondaryColor: "#FFDEAD" }, 
        Shopping: { primaryColor: "#32CD32", secondaryColor: "#98FB98" }, 
        Study: { primaryColor: "#8A2BE2", secondaryColor: "#DDA0DD" }, 
        Others: { primaryColor: "#1E90FF", secondaryColor: "#ADD8E6" }, 
        Default: { primaryColor: "#D3D3D3", secondaryColor: "#F5F5F5" } 
    };

    const getCategoryColors = (category) => {
        return categoryColors[category] || categoryColors.Default;
    };

    const { primaryColor, secondaryColor } = getCategoryColors(taskObj.Category);

    const toggle = () => {
        setModal(!modal);
    };

    const updateTask = (obj) => {
        updateListArray(obj, index);
    };

    const handleDelete = () => {
        deleteTask(index);
    };

    return (
        <MuiCard style={{ borderTop: `5px solid ${primaryColor}`, marginBottom: '20px' }}>
            <CardContent style={{ backgroundColor: secondaryColor }}>
                <Typography variant="h5" component="div">
                    {taskObj.Name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {taskObj.Description}
                </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: 'space-between' }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Edit />}
                    onClick={toggle}
                    style={{ backgroundColor: primaryColor }}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Delete />}
                    onClick={handleDelete}
                    style={{ backgroundColor: primaryColor }}
                >
                    Delete
                </Button>
            </CardActions>
            <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
        </MuiCard>
    );
};

export default Card;
