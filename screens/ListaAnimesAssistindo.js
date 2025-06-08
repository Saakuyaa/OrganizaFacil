import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { carregarLista, salvarLista } from '../utils/storage';

export default function ListaAnimesAssistindo() {
  const [lista, setLista] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [animeSelecionado, setAnimeSelecionado] = useState(null);
  const [carregandoDescricao, setCarregandoDescricao] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const dados = await carregarLista('animes_assistindo');
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
            await salvarLista('animes_assistindo', novaLista);
            setLista(novaLista);
          }
        }
      ]
    );
  };

  const abrirDescricao = async (anime) => {
    setAnimeSelecionado(anime);
    setModalVisible(true);
    setDescricao('');
    setCarregandoDescricao(true);

    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${anime.id}`);
      const json = await response.json();
      setDescricao(json.data.synopsis || 'Sem descrição disponível.');
    } catch (error) {
      setDescricao('Erro ao carregar a descrição.');
    } finally {
      setCarregandoDescricao(false);
    }
  };

  if (lista.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Nenhum anime assistindo no momento.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => abrirDescricao(item)} style={styles.item}>
            {item.imagem && (
              <Image source={{ uri: item.imagem }} style={styles.imagem} />
            )}
            <Text style={styles.nome}>{item.nome}</Text>
            <TouchableOpacity
              style={styles.botaoRemover}
              onPress={() => removerItem(item.id)}
            >
              <Icon name="delete" size={18} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.textoBotaoRemover}>Remover</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      {/* Modal de descrição */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>{animeSelecionado?.nome}</Text>
            {carregandoDescricao ? (
              <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
            ) : (
              <ScrollView style={styles.modalDescricaoContainer}>
                <Text style={styles.modalDescricao}>{descricao}</Text>
              </ScrollView>
            )}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalFechar}
            >
              <Text style={styles.modalFecharTexto}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#2c2f33',
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    borderRadius: 10,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  modalDescricaoContainer: {
    maxHeight: 300,
  },
  modalDescricao: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
  },
  modalFechar: {
    marginTop: 20,
    alignSelf: 'flex-end',
    backgroundColor: '#7289da',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  modalFecharTexto: {
    color: '#fff',
    fontWeight: '600',
  },
});
