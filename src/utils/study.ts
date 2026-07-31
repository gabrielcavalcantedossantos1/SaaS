// Define os três estados possíveis de um tópico de estudo
export type StudyStatus = 'todo' | 'done' | 'difficult'

// Define a estrutura de um item de estudo salvo no Firestore
export type StudyItem = {
    id: string
    userId: string
    title: string
    subject: string
    status: StudyStatus
    createdAt?: Date
}