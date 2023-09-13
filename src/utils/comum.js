export const alteraDados = ( variavel, valor, dados, setDados ) => {
    setDados({
        ...dados,
        [variavel]: valor
    })
}

export function validarCamposObrigatorios(dados, setDados) {
    for (const [variavel, valor] of Object.entries(dados)) {
      if (valor == '') {
        setDados({
          ...dados,
          [variavel]: null
        })
        return false
      } 
    }
    return true
  }
