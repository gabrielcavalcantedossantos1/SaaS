import type { StudyItem, StudyStatus } from "../types/study";

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

//busca no firestore os topicos de estudo
export async function getStudiesByUser(userId: string): Promise<StudyItem[]> {
  //busca e consulta filtrando pelo userId
  const q = query(
    collection(db, COLLECTION_NAME),
    where("userId", "==", userId),
  );

  //consulta e recebe dados do banco
  const querySnapshot = await getDocs(q);

  //transform a busca em um objeto
  const studies = querySnapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as StudyItem[];

  return studies;
}

// muda uma atividade de estudo expecifica
export async function updateStudyStatus(
  id: string,
  status: StudyStatus,
): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);

  await updateDoc(docRef, {
    status: status,
  });
}

// funçao para apagar uma materia
export async function deleteStudy(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}

// funçao para criar uma materia
export async function createStudy(
  userId: string,
  title: string,
  subject: string,
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    userId,
    title,
    subject,
    status: "todo",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}
