import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const backgroundImg = { uri: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1350&q=80' 
 };

export default function ListaJogosInicial() {
  const navigation = useNavigation();

  return (
    <ImageBackground source={backgroundImg} style={styles.background} blurRadius={4}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Sua biblioteca de Jogos</Text>
        <Text style={styles.text}>
          Gerencie os jogos que você já zerou, está jogando ou quer jogar.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AdicionadordeItems', { categoria: 'jogos' })}
        >
          <Text style={styles.buttonText}>Adicionar Jogo</Text>
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
