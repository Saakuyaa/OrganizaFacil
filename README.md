# Organiza Fácil

**Aplicativo móvel para organizar listas de filmes, séries, animes e jogos**

---

## Descrição do Projeto

O **Organiza Fácil** é um aplicativo mobile desenvolvido em **React Native** com **Expo** para dispositivos Android. O app permite aos usuários organizar seus conteúdos favoritos em quatro categorias: filmes, séries, animes e jogos.

Cada item pode ser adicionado e classificado por status:

- Assistindo
- Planejo assistir
- Completado

O objetivo é facilitar o acompanhamento e a organização do que o usuário consome no dia a dia, com uma interface simples, prática e eficiente.

---

## Funcionalidades principais

- Adição e classificação de itens em categorias distintas.
- Navegação simples por menu lateral (Drawer Navigator).
- Armazenamento local dos dados do usuário com AsyncStorage.
- Integração com APIs externas para dados atualizados e detalhados:
  - TMDB (filmes e séries)
  - Jikan API (animes)
  - RAWG API (jogos)

---

## Tecnologias Utilizadas

- React Native com Expo  
- JavaScript (JSX)  
- Node.js e npm para gerenciamento de pacotes  
- @react-navigation/drawer para navegação lateral  
- @react-native-async-storage/async-storage para armazenamento local  
- react-native-dotenv para variáveis de ambiente  
- APIs externas: TMDB, Jikan, RAWG  
- Plugins Babel para recursos avançados do JavaScript  

---

## Como executar o projeto localmente

```bash
git clone https://github.com/Saakuyaa/OrganizaFacil.git
cd OrganizaFacil
npm install
expo start
