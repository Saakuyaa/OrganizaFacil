import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';

// Imagem de fundo
const backgroundImg = { uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80' };

// Importa o ícone joystick local
import joystickIcon from '../assets/icons/joystick.png'; 
import movieIcon from '../assets/icons/film.png';
import seriesIcon from '../assets/icons/series.png'

const categoryImages = {
  Animes: { uri: 'https://cdn-icons-png.flaticon.com/512/188/188987.png' },
  Jogos: joystickIcon, 
  Filmes: movieIcon,
  Series: seriesIcon, 
};

const HomeScreen = ({ navigation }) => {
  const items = [
    { id: '1', title: 'Animes', screen: 'ListaAnimes', category: 'Animes' },
    { id: '2', title: 'Jogos', screen: 'ListaJogos', category: 'Jogos' },
    { id: '3', title: 'Filmes', screen: 'ListaFilmes', category: 'Filmes' },
    { id: '4', title: 'Séries', screen: 'ListaSeries', category: 'Series' },
  ];

  return (
    <ImageBackground source={backgroundImg} style={styles.background} blurRadius={4}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.header}>Organiza Fácil</Text>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Drawer', { category: item.category })}
            >
              <Image
                source={categoryImages[item.category]}
                style={styles.cardImage}
                resizeMode="contain"
              />
              <Text style={styles.cardText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18, 18, 18, 0.85)',
  },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#E0E0E0',
    letterSpacing: 1,
  },
  card: {
    flex: 1,
    margin: 10,
    minHeight: 160,
    backgroundColor: '#1F1F1F',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
    padding: 15,
  },
  cardImage: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  cardText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#BB86FC',
  },
});

export default HomeScreen;
