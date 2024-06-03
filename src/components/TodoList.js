import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask';
import Card from './Card';
import { Container, Typography, Button, Grid } from '@mui/material';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        let arr = localStorage.getItem("taskList");
        if (arr) {
            let obj = JSON.parse(arr);
            setTaskList(obj);
        }
    }, []);

    const toggle = () => {
        setModal(!modal);
    };

    const saveTask = (taskObj) => {
        let tempList = [...taskList, taskObj];
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        setModal(false);
    };

    const deleteTask = (index) => {
        let tempList = taskList.filter((task, idx) => idx !== index);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    const updateListArray = (obj, index) => {
        let tempList = taskList.map((task, idx) => (idx === index ? obj : task));
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    return (
        <Container>
            <Typography variant="h3" align="center" gutterBottom>
                To-do List
            </Typography>
            <Button variant="contained" color="primary" onClick={toggle} style={{ marginBottom: '20px' }}>
                Create Task
            </Button>
            <Grid container spacing={3}>
                {taskList.map((obj, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray} />
                    </Grid>
                ))}
            </Grid>
            <CreateTask toggle={toggle} modal={modal} save={saveTask} />
        </Container>
    );
};

export default TodoList;
