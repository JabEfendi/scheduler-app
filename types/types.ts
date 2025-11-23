export interface Task {
  id: string;
  title: string;
  desc: string;
  status: boolean;
  dueDate: Date;
  deadline: Date;
  project?: string | null;
}
