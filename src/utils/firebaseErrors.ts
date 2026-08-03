import { FirebaseError } from "firebase/app";

export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      // Erros de Login / Credenciais
      case "auth/invalid-credential":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "E-mail ou senha incorretos.";

      // Erros de Cadastro
      case "auth/email-already-in-use":
        return "Este e-mail já está cadastrado.";
      case "auth/weak-password":
        return "A senha deve ter pelo menos 6 caracteres.";
      case "auth/invalid-email":
        return "Digite um e-mail válido.";

      // Erros de Bloqueio / Conexão
      case "auth/too-many-requests":
        return "Muitas tentativas incorretas. Aguarde um instante e tente novamente.";
      case "auth/network-request-failed":
        return "Sem conexão com a internet. Verifique sua rede.";

      default:
        return "Ocorreu um erro ao tentar entrar. Tente novamente.";
    }
  }

  return "Ocorreu um erro inesperado.";
}

export function getFirebaseErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "permission-denied":
        return "Sem permissão para salvar a tarefa. Verifique as regras do Firestore.";
      case "unavailable":
        return "O serviço do Firestore está indisponível no momento. Tente novamente.";
      case "deadline-exceeded":
        return "A operação demorou demais para responder. Tente novamente.";
      case "network-request-failed":
        return "Sem conexão com a internet. Verifique sua rede.";
      default:
        return "Não foi possível criar a tarefa. Tente novamente.";
    }
  }

  return "Não foi possível criar a tarefa. Tente novamente.";
}
