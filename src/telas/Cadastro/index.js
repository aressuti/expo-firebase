import { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Alert,
} from "react-native";

import estilos from "./estilos";
import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import { cadastrar } from "../../servicos/firebaseRequest";
import Alerta from "../../componentes/Alerta";
import { alteraDados, validarCamposObrigatorios } from "../../utils/comum";
import { entradas } from "./entradas";

export default function Cadastro({ navigation }) {
  const [dados, setDados] = useState({
    email: "",
    senha: "",
    confirmaSenha: "",
  });
  const [statusErro, setStatusErro] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  async function realizarCadastro() {
    if (!validarCamposObrigatorios(dados, setDados)) return;
    if (dados.senha != dados.confirmaSenha) {
      setStatusErro(true);
      setMensagemErro("As senhas devem ser iguais");
      return;
    }

    const res = await cadastrar(dados.email, dados.senha);
    if (res == "sucesso") {
      Alert.alert("Usuário cadastrado com sucesso!");
      setEmail("");
      setSenha("");
      setConfirmaSenha("");
    } else {
      setStatusErro(true);
      setMensagemErro(res);
    }
  }

  function verificarSenhasIguais() {
    return dados.senha == dados.confirmaSenha
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={estilos.keyAvoid}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={estilos.container}>
          {entradas.map((entrada) => {
            return (
              <EntradaTexto
                key={entrada.id}
                {...entrada}
                value={dados[entrada.name]}
                onChangeText={(valor) =>
                  alteraDados(entrada.name, valor, dados, setDados)
                }
                error={entrada.name != 'confirmaSenha' ? false : !verificarSenhasIguais() && dados.confirmaSenha != '' }
              />
            );
          })}

          <Alerta
            mensagem={mensagemErro}
            erro={statusErro}
            setErro={setStatusErro}
          />

          <Botao onPress={() => realizarCadastro()}>CADASTRAR</Botao>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
