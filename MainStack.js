import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './screens/HomeScreen';
import CustomDrawerContent from './components/CustomDrawerContent';

// Telas iniciais
import ListaAnimesInicial from './screens/ListaAnimesInicial';
import ListaJogosInicial from './screens/ListaJogosInicial';
import ListaFilmesInicial from './screens/ListaFilmesInicial';
import ListaSeriesInicial from './screens/ListaSeriesInicial';

// Completados
import ListaAnimesCompletados from './screens/ListaAnimesCompletados';
import ListaJogosCompletados from './screens/ListaJogosCompletados';
import ListaFilmesCompletados from './screens/ListaFilmesCompletados';
import ListaSeriesCompletados from './screens/ListaSeriesCompletados';

// Assistindo
import ListaAnimesAssistindo from './screens/ListaAnimesAssistindo';
import ListaJogosAssistindo from './screens/ListaJogosAssistindo';
import ListaFilmesAssistindo from './screens/ListaFilmesAssistindo';
import ListaSeriesAssistindo from './screens/ListaSeriesAssistindo';

// Planejo Assistir
import ListaAnimesPlanejoAssistir from './screens/ListaAnimesPlanejoAssistir';
import ListaJogosPlanejoAssistir from './screens/ListaJogosPlanejoAssistir';
import ListaFilmesPlanejoAssistir from './screens/ListaFilmesPlanejoAssistir';
import ListaSeriesPlanejoAssistir from './screens/ListaSeriesPlanejoAssistir';

// Tela nova
import AdicionadordeItems from './screens/AdicionadordeItems';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const headerEstiloPadrao = {
  headerStyle: {
    backgroundColor: '#cacaca', 
  },
  headerTitleStyle: {
    color: 'black',          
    fontWeight: 'bold',
  },
};

function DrawerNavigator({ route }) {
  const category = route?.params?.category;

  const initialScreens = {
    Animes: ListaAnimesInicial,
    Jogos: ListaJogosInicial,
    Filmes: ListaFilmesInicial,
    Series: ListaSeriesInicial,
  };

  const completadosScreens = {
    Animes: ListaAnimesCompletados,
    Jogos: ListaJogosCompletados,
    Filmes: ListaFilmesCompletados,
    Series: ListaSeriesCompletados,
  };

  const assistindoScreens = {
    Animes: ListaAnimesAssistindo,
    Jogos: ListaJogosAssistindo,
    Filmes: ListaFilmesAssistindo,
    Series: ListaSeriesAssistindo,
  };

  const planejoAssistirScreens = {
    Animes: ListaAnimesPlanejoAssistir,
    Jogos: ListaJogosPlanejoAssistir,
    Filmes: ListaFilmesPlanejoAssistir,
    Series: ListaSeriesPlanejoAssistir,
  };

  const emojiPorCategoria = {
    Animes: '📺',
    Jogos: '🎮',
    Filmes: '🎬',
    Series: '📺',
  };

  const nomePorCategoria = {
    Animes: 'Animes',
    Jogos: 'Jogos',
    Filmes: 'Filmes',
    Series: 'Séries', 
  };

  if (!category || !initialScreens[category]) {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      </Drawer.Navigator>
    );
  }

  return (
    <Drawer.Navigator
      initialRouteName={`${category}Inicial`}
      drawerContent={(props) => <CustomDrawerContent {...props} category={category} />}
    >
      <Drawer.Screen
        name={`${category}Inicial`}
        component={initialScreens[category]}
        options={{
          drawerLabel: 'Início',
          title: `${emojiPorCategoria[category]} Minha Lista de ${nomePorCategoria[category]}`,
          ...headerEstiloPadrao,
        }}
      />
      <Drawer.Screen
        name={`${category}Completados`}
        component={completadosScreens[category]}
        options={{
          drawerLabel: 'Completados',
          title: category === 'Series' 
            ? `${emojiPorCategoria[category]} Séries Completadas` 
            : `${emojiPorCategoria[category]} ${nomePorCategoria[category]} Completados`,
          ...headerEstiloPadrao,
        }}
      />
      <Drawer.Screen
        name={`${category}Assistindo`}
        component={assistindoScreens[category]}
        options={{
          drawerLabel: 'Assistindo',
          title: category === 'Jogos'
            ? `${emojiPorCategoria[category]} Jogos em andamento`
            : `${emojiPorCategoria[category]} Assistindo ${nomePorCategoria[category]}`,
          ...headerEstiloPadrao,
        }}
      />
      <Drawer.Screen
        name={`${category}PlanejoAssistir`}
        component={planejoAssistirScreens[category]}
        options={{
          drawerLabel: 'Planejo Assistir',
          title: category === 'Jogos'
            ? '🎮 Planejo Jogar'
            : `${emojiPorCategoria[category]} Planejo Assistir ${nomePorCategoria[category]}`,
          ...headerEstiloPadrao,
        }}
      />
    </Drawer.Navigator>
  );
}

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="AdicionadordeItems" component={AdicionadordeItems} />
    </Stack.Navigator>
  );
}
