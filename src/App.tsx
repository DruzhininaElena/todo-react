import './App.css'
import {TodolistItem} from './components/TodolistItem.tsx';
import {useState} from 'react';
import {v1} from 'uuid';
import {CreateItemForm} from './components/CreateItemForm.tsx';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValue = 'all' | 'active' | 'completed'

export type Todolist = {
    id: string
    title: string
    filter: FilterValue
}

export type TaskState = {
    [todolistId: string]: Array<Task>
}

export const App = () => {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<Array<Todolist>>(
        [
            {
                id: todolistId_1,
                title: 'What to learn',
                filter: 'all'
            },
            {
                id: todolistId_2,
                title: 'What to buy',
                filter: 'all'
            }
        ]
    )

    const [tasks, setTasks] = useState<TaskState>({
        [todolistId_1]: [
            {id: v1(), title: 'H' + 'TML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: 'Water', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Fish', isDone: false},
            {id: v1(), title: 'Milk', isDone: false}
        ]
    })


    function deleteTask(taskId: string, todolistId: string) {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)
        })
    }

    function createTask(newTaskTitle: string, todolistId: string) {
        setTasks({
            ...tasks,
            [todolistId]: [{id: v1(), title: newTaskTitle, isDone: false}, ...tasks[todolistId]]
        })
    }

    function changeFilter(filterValue: FilterValue, todolistId: string) {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filterValue} : tl))

    }

    function changeTaskStatus(isDone: boolean, taskId: string, todolistId: string) {
        setTasks(
            {
                ...tasks,
                [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, isDone} : task)
            }
        )
    }

    function deleteTodolist(todolistId: string) {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }

    function createTodolist(title: string) {

        const todolistId = v1()

        setTodolists([
            {id: todolistId, title: title, filter: 'all'},
            ...todolists
        ])
        setTasks({...tasks, [todolistId]: []})
    }

    function changeTaskTitle(title: string, todolistId: string, taskId: string) {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)
        })
    }

    function changeTodolistTitle(title: string, todolistId: string) {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }


    const todolistsComponents = todolists.map(tl => {

        const filteredTasks = () => {
            let tasksForTodolist = tasks[tl.id];

            switch (tl.filter) {
                case 'active':
                    return tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
                case 'completed':
                    return tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
                default:
                    return tasksForTodolist
            }
        }

        return (
            <Grid key={tl.id}>
                <Paper sx={{p: '10px 20px'}}>
                    <TodolistItem
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={filteredTasks()}
                        deleteTask={deleteTask}
                        changeFilter={changeFilter}
                        createTask={createTask}
                        changeTaskStatus={changeTaskStatus}
                        currentFilterStatus={tl.filter}
                        deleteTodolist={deleteTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="app">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid
                    container
                    sx={{justifyContent: 'center', m: '20px'}}>
                    <CreateItemForm createItem={createTodolist}/>
                </Grid>
                <Grid
                    sx={{justifyContent: 'center'}}
                    container
                    spacing={3}>
                    {todolistsComponents}
                </Grid>
            </Container>
        </div>
    )
}

