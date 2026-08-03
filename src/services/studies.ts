import type {
  StudyItem,
  StudyStatus,
  CreateStudyData,
} from "../types/study";

import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";

const COLLECTION_NAME = "studies";

const buildUserStudiesQuery = (userId: string) =>
  query(collection(db, COLLECTION_NAME), where("userId", "==", userId));

// Busca os estudos do usuário
export async function getStudiesByUser(
  userId: string
): Promise<StudyItem[]> {
  const q = buildUserStudiesQuery(userId);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as StudyItem[];
}

export function listenToStudiesByUser(
  userId: string,
  onChange: (studies: StudyItem[]) => void
) {
  const q = buildUserStudiesQuery(userId);

  return onSnapshot(q, (querySnapshot) => {
    const studies = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    })) as StudyItem[];

    onChange(studies);
  });
}

// Atualiza o status
export async function updateStudyStatus(
  id: string,
  status: StudyStatus
): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);

  await updateDoc(docRef, {
    status,
  });
}

// Exclui
export async function deleteStudy(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}

// Cria uma tarefa
export async function createStudy(data: CreateStudyData): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...data,
    status: "todo",
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}