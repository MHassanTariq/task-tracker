import PageScreen from "../../components/pageScreen";
import colors from "../../utils/colors";
import styles from "../../utils/styles";
import TaskCreationForm from "../../components/taskCreationForm";
import { StandardButton } from "../../components/standardButton";
import DraggableTaskList, {
  DraggableTaskProps,
} from "../../components/taskList";

function Backlog() {
  function onAdd() {}
  function onMove() {}
  function onDiscard() {}
  const taskOperations = {
    onDelete: onMove,
    onToggle: onMove,
    editTask: onMove,
    setEditingTaskId: onMove,
  };
  const taskList: DraggableTaskProps = {
    task: {
      id: "123",
      text: "Do smth",
      isCompleted: false,
    },
    isHighlighted: true,
    disableRightOptions: true,
  };

  const areOptionsDisabled = false;

  function Title() {
    return <p className={`${colors.titleText}`}>Backlog</p>;
  }

  function StandardButtonOptions() {
    return (
      <div className={`${styles.flexRow} gap-5 pt-4`}>
        <StandardButton
          type="button"
          onClick={onMove}
          text="Move"
          disabled={areOptionsDisabled}
        />
        <StandardButton
          type="button"
          onClick={onDiscard}
          text="Discard"
          disabled={areOptionsDisabled}
        />
      </div>
    );
  }

  return (
    <PageScreen onDragEnd={() => {}}>
      <Title />
      <div className={styles.bodyArea}>
        <TaskCreationForm
          onSubmitTask={onAdd}
          placeholder="🚀 Add your next big idea here..."
        />
        <StandardButtonOptions />
        <DraggableTaskList
          taskList={[taskList]}
          listId={"backlogList"}
          taskOperations={taskOperations}
        />
      </div>
    </PageScreen>
  );
}

export default Backlog;
