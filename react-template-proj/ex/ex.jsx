function App() {
  const [tasks, setTasks] = React.useState([
    {
      id: 1,
      title: "Learn React",
      done: false
    },
    {
      id: 2,
      title: "Learn Javascript",
      done: false
    }
  ]);

  const [newTitle, setNewTitle] = React.useState("");

 
  const completedCount = tasks.filter((task) => task.done).length;

  
  function addTask(title) {
    const newTask = {
      id: Date.now(),
      title: title,
      done: false
    };

    setTasks([...tasks, newTask]);
  }

  
  function toggleTaskDone(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  
  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    setTasks(updatedTasks);
  }

  
  React.useEffect(() => {
    console.log("Tasks updated:", tasks.length);
  }, [tasks]);

  return (
    <div>
      <h1>Task List</h1>

      
      <input
        value={newTitle}
        onChange={(event) => {
          setNewTitle(event.target.value);
        }}
      />

      <button
        onClick={() => {
          addTask(newTitle);
          setNewTitle("");
        }}
      >
        Add Task
      </button>

      
      {tasks.map((task) => (
        <div key={task.id}>
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => toggleTaskDone(task.id)}
          />

          <span>{task.title}</span>

          <button onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </div>
      ))}

      
      <p>Total: {tasks.length}</p>
      <p>Completed: {completedCount}</p>
      <TaskStats tasks={tasks} />
      <TaskItem task={{ id: 1, title: "Learn React", done: false }} onToggleDone={() => {}} onDelete={() => {}} />
    </div>
  );
}


function TaskStats(props) {
  const completedCount = props.tasks.filter((task) => task.done).length;
  return (
    <div>
      <p>Total: {props.tasks.length}</p>
      <p>Completed: {completedCount}</p>
    </div>
  );
}

function TaskItem({ task, onToggleDone, onDelete }) {
  return (
    <div>
      <input
        type="checkbox"
        checked={task.done}
        onChange={onToggleDone}
      />
      <span>{task.title}</span>
      <button onClick={onDelete}>
        Delete
      </button>
    </div>
  );
}
