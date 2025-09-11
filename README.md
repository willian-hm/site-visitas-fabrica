# Sistema de Cadastro de Visita - Fábrica de Software

Este projeto consiste em um sistema de cadastro de visita na Fábrica de Software. O objetivo principal é permitir que visitantes se registrem através de um formulário, capturem uma foto e, em seguida, gerem um crachá digital com seus dados.

## Estrutura do Projeto

A estrutura do projeto é composta por três páginas principais:

1. **Página de Acesso Inicial** (Cadastro de Visita)
2. **Formulário de Visita**
3. **Crachá Digital**

### 1. Página de Acesso Inicial (Cadastro de Visita)

A primeira página (`index.html`) é responsável por fornecer um botão para o visitante realizar o cadastro. Quando o visitante clica no botão, o sistema verifica se ele está em uma localização permitida e se a permissão de câmera foi concedida.

- **Localização**: A página verifica a localização geográfica do visitante e restringe o acesso caso ele não esteja dentro do raio de 100 metros.
- **Permissões de Câmera**: A página também solicita permissão para acessar a câmera do dispositivo do visitante.

#### Estrutura:

- Cabeçalho com título e links para o Bootstrap e ícones.
- Uma área central com um botão que aciona o processo de cadastro.
- Mensagem de acesso negado em caso de falha na verificação de localização ou permissão de câmera.
- Rodapé com aviso de direitos autorais.

### 2. Formulário de Visita

A segunda página (`formulario.html`) exibe o formulário de cadastro de visita, incluindo a captura de uma foto através da câmera do visitante.

#### Funcionalidades:

- **Captura de Foto**: A página ativa a câmera do visitante e exibe um preview. O visitante pode tirar uma foto, que será exibida como imagem de perfil.
- **Formulário**: O visitante preenche informações como nome, e-mail, empresa (opcional) e motivo da visita (opcional).
- **Submissão**: Após o preenchimento, o formulário pode ser enviado para registrar a visita.
- **Confirmação**: Após o envio, uma barra de progresso é exibida e, ao final, uma mensagem de sucesso é mostrada.

#### Estrutura:

- Um vídeo com preview da câmera do visitante e um botão para tirar a foto.
- Campos para nome, e-mail, empresa e motivo da visita.
- Botões para capturar a foto e reenviar a foto, caso necessário.
- Mensagens de sucesso e de confirmação após o envio do formulário.
- Contagem regressiva para recarregar a página após o sucesso.

### 3. Crachá Digital

A última página (`cracha.html`) exibe o crachá digital do visitante, com as informações coletadas no formulário.

#### Funcionalidades:

- Exibe o nome, e-mail, empresa e foto do visitante.
- Foto de perfil capturada durante o cadastro.
- Design simples com informações do visitante centralizadas.

#### Estrutura:

- Cabeçalho com o título "VISITANTE".
- Exibição da foto, nome, e-mail e empresa do visitante.

## Como Usar

1. **Abra a página inicial** (`index.html`).
2. **Clique no botão "Realizar Cadastro de Visita"** para começar o processo de cadastro.
3. **Permita o acesso à sua câmera** e verifique sua localização.
4. **Preencha o formulário de visita** com as informações solicitadas.
5. Após o envio, **gerencie o crachá digital** na página de crachá.

## Tecnologias Utilizadas

- HTML
- CSS
- JavaScript

## Licença

Este projeto está licenciado sob a Licença MIT.

---

**Fábrica de Software - Todos os direitos reservados**