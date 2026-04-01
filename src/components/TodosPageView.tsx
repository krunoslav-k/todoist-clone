export default function TodosPageView() {
  return (
    <main className="flex flex-col justify-center items-center px-28">
      <h1 className="self-start py-8 font-bold text-2xl tracking-wide">
        Inbox
      </h1>

      <div className="w-full">
        <TodoList
          onTodoSelect={selectTodo}
          activeTodoForm={activeTodoForm}
          setActiveTodoForm={setActiveTodoForm}
        />

        {activeTodoForm !== "add" && (
          <AddTodoButton
            handleAddTodoButtonClick={() => setActiveTodoForm("add")}
          />
        )}

        {activeTodoForm === "add" && (
          <TodoForm onClose={() => setActiveTodoForm(null)} />
        )}
      </div>

      {selectedTodo && isTodoModalOpen && (
        <TodoModal
          selectedTodoIndex={getSelectedTodoIndex()}
          onPreviousTodoClick={selectPreviousTodo}
          onNextTodoClick={selectNextTodo}
          onCloseClick={() => setIsTodoModalOpen(false)}
          ref={modalRef}
        />
      )}
    </main>
  );
}
