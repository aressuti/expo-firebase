import { Text, View, Image } from "react-native";

import estilos from "./estilos";
import Cabecalho from '../../componentes/Cabecalho'
import Produto from "../../componentes/Produtos"
import { auth } from "../../config/firebase"
import animacao from "../../../assets/loading_lottie.gif"

export default function Principal({ navigation }) {  
    const usuario = auth.currentUser

    function deslogar() {
        auth.signOut()
        navigation.replace('Login')
    }

    return (
        <View style={ estilos.container }>
            <Cabecalho logout={ deslogar }/>
            <Text style={ estilos.texto }> Usuário: { usuario.email }  </Text>

            <Image styles={ estilos.imagem } source={ animacao }/>

            <Produto nome="Tênis" preco="200,00" />
            <Produto nome="Camisa" preco="100,00" />
            <Produto nome="Suplementos" preco="150,00" />
        </View>
    )
}
