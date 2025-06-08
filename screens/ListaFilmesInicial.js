import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const backgroundImg = { uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80' };

export default function ListaFilmesInicial() {
  const navigation = useNavigation();

  return (
    <ImageBackground source={backgroundImg} style={styles.background} blurRadius={4}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Sua coleção de Filmes</Text>
        <Text style={styles.text}>
          Acompanhe os filmes que você já assistiu, está vendo ou planeja assistir.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AdicionadordeItems', { categoria: 'filmes' })}
        >
          <Text style={styles.buttonText}>Adicionar Filme</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginBottom: 15,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#BB86FC',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: '#1F1F1F',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
