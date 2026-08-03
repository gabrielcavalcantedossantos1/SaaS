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
} from "firebase/firestore";
import { db } from "./firebase";

const COLLECTION_NAME = "studies";

// Busca os estudos do usuário
export async function getStudiesByUser(
  userId: string
): Promise<StudyItem[]> {
  const q = query(
    collection(db, COLLECTION_NAME),
    where("userId", "==", userId)
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as StudyItem[];
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