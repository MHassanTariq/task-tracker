export type ActionLabelType = {
  action: string;
  label: string;
};

export enum AnalyticPages {
  TASKS = "Tasks",
  BACKLOG = "Backlog",
}

export const events = {
  STATUS: {
    COPIED: {
      action: "button_click",
      label: "Copied status report",
    },
  },
  TASKS: {
    TASK_ADDED: {
      action: "button_click",
      label: "Submit New Task",
    },
    TASK_UPDATED: {
      action: "button_click",
      label: "Updated a Task",
    },
    TASK_REMOVED: {
      action: "button_click",
      label: "Task Removed",
    },
    TASK_COMPLETED: {
      action: "button_click",
      label: "Task Completed",
    },
    TASK_UNCOMPLETED: {
      action: "button_click",
      label: "Task Uncompleted",
    },
    MOVE_TO_BACKLOG: {
      action: "button_click",
      label: "Move to Backlog",
    },
    MOVE_TO_DATE: {
      action: "button_click",
      label: "Move to Date",
    },
    DISCARDED: {
      action: "button_click",
      label: "Discarded Multiple Tasks",
    },
  },
  NOTIFICATIONS: {
    MOVE_TO_BACKLOG: {
      action: "notification_click",
      label: "Move to Backlog",
    },
    MOVE_TO_TODAY: {
      action: "notification_click",
      label: "Move to Today",
    },
  },
};
