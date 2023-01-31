import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { getError } from './store/errors';
import configureStore from './store/store';
import { titleChanged, taskDeleted, completeTask, getTasks, loadTasks, getTasksLoadingStatus, createTasks } from './store/task';


const store = configureStore();

const App = () => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  }

  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <p>{error}</p>
  }

  
  return (
    <>
      <h1>App</h1>
      <div>
        <button
          onClick={()=>dispatch(createTasks())}
          style={{
            backgroundColor: "blue",
            color: "white",
            marginTop: "7px"
            }}
        >Create New Task</button>
      </div>
      <ul>
        {state.map(el=>(
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={()=>dispatch(completeTask(el.id))}>Complete</button>
            <button onClick={()=>changeTitle(el.id)}>Change title</button>
            <div>
              <button 
              style={{
                backgroundColor: "red",
                color: "white",
                marginTop: "7px"
                }}
              onClick={()=>deleteTask(el.id)}
              >Delete Task</button>
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
