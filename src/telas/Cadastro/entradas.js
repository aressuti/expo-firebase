export const entradas = [
    {
      id: '1',
      name: 'email',
      label: 'E-mail',
      messageError: 'Digite um e-mail válido',
      secureTextEntry: false,
      inputMode: 'email',
      pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
    },
    {
      id: '2',
      name: 'senha',
      label: 'Senha',
      messageError: 'Digite uma senha válida',
      secureTextEntry: true,
      inputMode: 'text',
      pattern: '.{6,}',
    },
    {
        id: '3',
        name: 'confirmaSenha',
        label: 'Confirmar Senha',
        messageError: 'As senhas devem ser iguais',
        secureTextEntry: true,
        inputMode: 'text'
      },
    ]
