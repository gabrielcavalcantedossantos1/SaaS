export type StudyStatus = "todo" | "done" | "difficult";

export type StudyItem = {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: "trabalho" | "estudo" | "pessoal";
  priority: "baixa" | "media" | "alta";
  status: StudyStatus;
  createdAt?: Date;
};

export type CreateStudyData = {
  userId: string;
  title: string;
  description: string;
  category: "trabalho" | "estudo" | "pessoal";
  priority: "baixa" | "media" | "alta";
};