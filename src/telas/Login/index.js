import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, View, Image } from 'react-native';

import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import estilos from './estilos';
import { logar } from '../../servicos/firebaseRequest'
import Alerta from '../../componentes/Alerta'
import { auth } from '../../config/firebase';
import { loading_lottie } from '../../../assets/loading_lottie.gif'
import { alteraDados, validarCamposObrigatorios } from "../../utils/comum"
import { entradas } from './entradas'

export default function Login({ navigation }) {
  const [dados, setDados] = useState({
    email: '',
    senha: ''
  })
  const [statusErro, setStatusErro] = useState('')
  const [mensagemErro, setMensagemErro] = useState('')
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const estadoUsuario = auth.onAuthStateChanged(
      usuario => {
        if (usuario) {
          navigation.replace('Principal')
        }
        setCarregando(false)
      }
    )

    return () => estadoUsuario()
  }, [])

  async function realizarLogin() {
    if (!validarCamposObrigatorios(dados, setDados)) return 

    const res = await logar(dados.email, dados.senha);
    if (res != "sucesso") {
        setStatusErro('firebase')
        setMensagemErro("E-mail ou senha inválidos")  
    } else {
        navigation.replace('Principal')
    }
  }

  if (carregando) {
      return (
        <View style={ estilos.containerAnimacao}>
          <Image source={ loading_lottie }
            style={ estilos.imagem }
          />
        </View>
      )
  }

  return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={ estilos.keyAvoid }>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={estilos.container}>
              {
                entradas.map((entrada) => {
                  return (
                    <EntradaTexto 
                      key={entrada.id}
                      {...entrada}
                      value={dados[entrada.name]}
                      onChangeText={valor => alteraDados(entrada.name, valor, dados, setDados)}
                    />
                  )
                })
              }
            
            <Alerta 
                mensagem={ mensagemErro }
                erro={ statusErro }
                setErro={ setStatusErro }            
            />

            <Botao onPress={() => realizarLogin()}>LOGAR</Botao>
            <Botao 
                onPress={() => { navigation.navigate('Cadastro') }}
            >
                CADASTRAR USUÁRIO
            </Botao>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
