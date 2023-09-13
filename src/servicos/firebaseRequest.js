import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    AuthErrorCodes } from "firebase/auth";

import { auth } from "../config/firebase";

function errosFirebase(error) {
    let mensagem = ''

    switch (error.code) {
        case AuthErrorCodes.EMAIL_EXISTS:
            mensagem = "Esse email já está em uso";
            break;
        case AuthErrorCodes.INVALID_EMAIL:
            mensagem = "Email inválido";
            break;
        case AuthErrorCodes.WEAK_PASSWORD:
            mensagem = "A senha precisa de no minimo 6 caracteres";
            break;      
        default:
            mensagem = "Erro desconhecido"
            break;
    }
    
    return mensagem
}    

export async function cadastrar(email, senha) {
    const resultado = await createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
        console.log(userCredential)
        return "sucesso"
    })
    .catch((error) => {
        console.log(error)
        return errosFirebase(error)
    })

    return resultado
}

export async function logar(email, senha) {
    const resultado = await signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
        console.log(userCredential)
        return "sucesso"
    })
    .catch((error) => {
        console.log(error)
        // return errosFirebase(error)
        return "Usuário ou senha inválidos"
    })

    return resultado
}