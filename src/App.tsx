import TodoItem from "./components/TodoItem";
import { dummyData } from "./data/dummyData";

function App() {
  return (
    <>
      <div>
        {dummyData.map((todo) => {
          return <TodoItem todo={todo} />;
        })}
      </div>
    </>
  );
}

export default App;
