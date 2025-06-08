import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { carregarLista, salvarLista } from '../utils/storage';

export default function ListaAnimesAssistindo() {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const dados = await carregarLista('filmes_assistindo');
    setLista(dados);
  };

  const removerItem = (id) => {
    Alert.alert(
      'Remover anime',
      'Tem certeza que deseja remover este anime da lista?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Remover', 
          style: 'destructive',
          onPress: async () => {
            const novaLista = lista.filter(item => item.id !== id);
            await salvarLista('filmes_assistindo', novaLista);
            setLista(novaLista);
          }
        }
      ]
    );
  };

  if (lista.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Nenhum filme sendo assistido no momento.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {item.imagem && (
              <Image source={{ uri: item.imagem }} style={styles.imagem} />
            )}
            <Text style={styles.nome}>{item.nome}</Text>
            <TouchableOpacity 
              style={styles.botaoRemover} 
              onPress={() => removerItem(item.id)}
            >
              <Icon name="delete" size={20} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.textoBotaoRemover}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2c2f33',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
    color: '#ccc',
    fontWeight: '600',
  },
  item: {
    flexDirection: 'row',
    marginVertical: 6,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 12,
    borderRadius: 10,
  },
  imagem: {
    width: 50,
    height: 75,
    marginRight: 12,
    borderRadius: 6,
    backgroundColor: '#444',
  },
  nome: {
    fontSize: 16,
    flexShrink: 1,
    flex: 1,
    color: '#eee',
    fontWeight: '600',
  },
  botaoRemover: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b33939',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  textoBotaoRemover: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
