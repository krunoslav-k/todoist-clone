import * as Popover from "@radix-ui/react-popover";
import LabelsDropdown from "./menus/LabelsDropdown";
import type Todo from "../../../types/todo";
import DatePopover from "./popovers/DatePopover";
import PriorityPopover from "./popovers/PriorityPopover";
import ReminderPopover from "./popovers/RemindersPopover";
import ActionsPopover from "./popovers/ActionsPopover";
import useTodoForm from "../../../hooks/useTodoForm";
import LabelButton from "./buttons/LabelButton";

interface TodoFormProps {
  initialTodo?: Todo;
  onClose: () => void;
  projectId: string | null;
  sectionId: string | null;
}

export default function TodoForm({
  initialTodo,
  onClose,
  projectId,
  sectionId,
}: TodoFormProps) {
  const {
    todo,
    setTodo,
    titleRef,
    handleSubmit,
    handleSelectDate,
    handleRemoveDate,
    handlePrioritySelect,
    handleToggleReminder,
    handleSelectLabel,
    handleRemoveLabel,
    handleRemoveAllLabels,
    getLabelQuery,
    handleOpenLabels,
    isOpen,
    openDropdown,
    closeDropdown,
  } = useTodoForm(projectId, sectionId, initialTodo, onClose);
  const labels = todo.labels ?? [];
  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="w-full flex flex-col">
        {/* TITLE + LABELS */}
        <Popover.Root
          open={isOpen("labels")}
          onOpenChange={(open) =>
            open ? openDropdown("labels") : closeDropdown()
          }
        >
          <Popover.Anchor asChild>
            <input
              ref={titleRef}
              type="text"
              value={todo.title}
              onChange={(e) =>
                setTodo((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              placeholder="Task name"
              className="ml-2.5 mr-2.5 mt-3 mb-1 text-[0.92rem] font-medium focus:outline-none flex-1"
            />
          </Popover.Anchor>

          <Popover.Portal>
            <Popover.Content
              side="bottom"
              align="center"
              sideOffset={5}
              onInteractOutside={(e) => e.preventDefault()}
              onOpenAutoFocus={(e) => e.preventDefault()}
              className="w-(--radix-popover-trigger-width)"
            >
              <LabelsDropdown
                onLabelSelect={handleSelectLabel}
                labelQuery={getLabelQuery(todo.title)}
                onClose={() => closeDropdown()}
              />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        {/* DESCRIPTION */}
        <input
          type="text"
          value={todo.description}
          onChange={(e) =>
            setTodo((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          placeholder="Description"
          className="ml-2.5 mr-2.5 mb-2.5 text-sm text-gray-600 focus:outline-none"
        />

        {/* BUTTONS + POPOVERS */}
        <div className="ml-2 mb-2 flex gap-2">
          <DatePopover
            dateOpen={isOpen("date")}
            onOpenChange={(open) =>
              open ? openDropdown("date") : closeDropdown()
            }
            dueDate={todo.dueDate}
            onSelectDate={handleSelectDate}
            onRemoveDate={handleRemoveDate}
          />

          <PriorityPopover
            priorityOpen={isOpen("priority")}
            onOpenChange={(open) =>
              open ? openDropdown("priority") : closeDropdown()
            }
            priority={todo.priority}
            onPrioritySelect={handlePrioritySelect}
          />

          <ReminderPopover
            remindersOpen={isOpen("reminders")}
            onOpenChange={(open) =>
              open ? openDropdown("reminders") : closeDropdown()
            }
            hasReminder={todo.hasReminder}
            onToggleReminder={() => {
              handleToggleReminder();
              closeDropdown();
            }}
          />

          {labels.length < 4 ? (
            labels.map((label) => (
              <LabelButton
                key={label}
                label={label}
                onRemoveLabel={handleRemoveLabel}
              />
            ))
          ) : (
            <LabelButton
              label={labels.length.toString()}
              onRemoveLabel={handleRemoveAllLabels}
            />
          )}
          <ActionsPopover
            actionsOpen={isOpen("actions")}
            onOpenChange={(open) =>
              open ? openDropdown("actions") : closeDropdown()
            }
            onOpenLabels={(open) =>
              open ? handleOpenLabels() : closeDropdown()
            }
            titleRef={titleRef}
          />
        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-300 p-2 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="cancel_button">
            Cancel
          </button>

          <button type="submit" className="add_button">
            {initialTodo ? "Save" : "Add task"}
          </button>
        </div>
      </form>
    </div>
  );
}
