import type Todo from "../../../types/todo";
import TodoModalHeader from "./TodoModalHeader";
import TodoModalContent from "./TodoModalContent";
import TodoModalSidebar from "./TodoModalSidebar";

interface TodoModalProps {
  todo: Todo;
  onToggleCompleted: (id: number, completed: boolean) => void;
  onCloseClick: () => void;
}

export default function TodoModal({
  todo,
  onToggleCompleted,
  onCloseClick,
}: TodoModalProps) {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-[rgba(0,0,0,0.4)] z-50">
      <div className="w-4xl h-[85%] flex flex-col bg-white rounded-xl relative">
        <TodoModalHeader onCloseClick={onCloseClick} />

        <div className="flex-1 flex">
          <TodoModalContent todo={todo} onToggleCompleted={onToggleCompleted} />

          <TodoModalSidebar />
        </div>
      </div>
    </div>
  );
}
