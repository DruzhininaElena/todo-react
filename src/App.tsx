import './App.css'
import {TodolistItem} from './components/TodolistItem.tsx';
import {useReducer, useState} from 'react';
import {v1} from 'uuid';
import {CreateItemForm} from './components/CreateItemForm.tsx';
import {AppBar, Container, Grid, IconButton, Paper, Toolbar} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {containerSx} from './styles/Container.styles.ts';
import {NavButton} from './styles/NavButton.ts';
import {createTheme, ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {MaterialUISwitch} from './styles/MaterialUISwitch.ts';
import {deepPurple} from '@mui/material/colors';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from './model/todolists-reducer.ts';
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
    tasksReducer
} from './model/tasks-reducer.ts';

type ThemeMode = 'dark' | 'light'

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

export type TasksState = {
    [todolistId: string]: Array<Task>
}

export const App = () => {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer,
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
        ] as Todolist[]
    )

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: deepPurple[500],
            },
        },
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    // tasks CRUD

    function deleteTask(taskId: string, todolistId: string) {
       dispatchToTasks(deleteTaskAC({taskId, todolistId}))
    }
    function createTask(newTaskTitle: string, todolistId: string) {
        dispatchToTasks(createTaskAC({todolistId, title: newTaskTitle}))
    }
    function changeTaskStatus(isDone: boolean, taskId: string, todolistId: string) {
        dispatchToTasks(changeTaskStatusAC({todolistId, taskId, isDone}))
    }
    function changeTaskTitle(title: string, todolistId: string, taskId: string) {
        dispatchToTasks(changeTaskTitleAC({todolistId, taskId, title}))
    }

    // todolists CRUD

    function changeFilter(filter: FilterValue, todolistId: string) {
        dispatchToTodolists(changeTodolistFilterAC({id: todolistId, filter}))
    }
    function deleteTodolist(todolistId: string) {
        const action = deleteTodolistAC(todolistId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    function createTodolist(title: string) {

        const action = createTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    function changeTodolistTitle(title: string, todolistId: string) {
        dispatchToTodolists(changeTodolistTitleAC({id: todolistId, title}))
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
            <Grid key={tl.id}
                  size={{ xs: 12, sm: 6, md: 4 }}
            >
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
        <ThemeProvider theme={theme} >
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Container maxWidth={'lg'} sx={containerSx}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <div>
                            <NavButton color={'inherit'}>Sign in</NavButton>
                            <NavButton color={'inherit'}>Sign up</NavButton>
                            <NavButton color={'inherit'} background={theme.palette.primary.dark}>Faq</NavButton>
                            <MaterialUISwitch sx={{ m: 1 }} defaultChecked onChange={changeMode}/>
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>
            <Container maxWidth={'lg'}>
                <Grid
                    container
                    sx={{m: '30px 0'}}>
                    <CreateItemForm createItem={createTodolist}/>
                </Grid>
                <Grid
                    container
                    spacing={4}>
                    {todolistsComponents}
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

