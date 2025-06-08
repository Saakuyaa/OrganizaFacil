import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Modal,
  Image,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { salvarLista, carregarLista } from '../utils/storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TMDB_API_KEY, RAWG_API_KEY } from '@env';



const getStatusOptions = (categoria) => {
  if (categoria === 'jogos') {
    return [
      { key: 'completados', label: 'Completados' },
      { key: 'assistindo', label: 'Jogando' },
      { key: 'planejo', label: 'Planejo Jogar' },
    ];
  } else {
    return [
      { key: 'completados', label: 'Completados' },
      { key: 'assistindo', label: 'Assistindo' },
      { key: 'planejo', label: 'Planejo Assistir' },
    ];
  }
};

// Botão de Status Reutilizável
function StatusButton({ option, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.statusButton, selected && styles.statusButtonSelected]}
      onPress={() => onPress(option.key)}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Text style={[styles.statusButtonText, selected && styles.statusButtonTextSelected]}>
        {option.label}
      </Text>
    </TouchableOpacity>
  );
}

export default function AdicionadordeItems() {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoria } = route.params || {};

  if (!categoria) {
    return (
      <View style={styles.container}>
        <Text style={styles.info}>Categoria não especificada.</Text>
      </View>
    );
  }

  const statusOptions = getStatusOptions(categoria);

  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [statusSelecionado, setStatusSelecionado] = useState(null);

  const buscar = useCallback(async () => {
    if (!busca.trim()) {
      Alert.alert('Atenção', 'Digite algo para buscar');
      return;
    }

    setLoading(true);
    setErro('');
    setResultados([]);

    try {
      let dados = [];

      if (categoria === 'animes') {
        const resposta = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(busca)}&limit=10`);
        const json = await resposta.json();
        if (json.data && Array.isArray(json.data)) {
          dados = json.data.map(item => ({
            id: item.mal_id.toString(),
            nome: item.title,
            imagem: item.images.jpg.image_url,
          }));
        }
      } else if (categoria === 'jogos') {
        const resposta = await fetch(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(busca)}`);
        const json = await resposta.json();
        if (json.results && Array.isArray(json.results)) {
          dados = json.results.map(item => ({
            id: item.id.toString(),
            nome: item.name,
            imagem: item.background_image,
          }));
        }
      } else if (categoria === 'filmes' || categoria === 'series') {
        const tipo = categoria === 'filmes' ? 'movie' : 'tv';
        const resposta = await fetch(
          `https://api.themoviedb.org/3/search/${tipo}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(busca)}&language=pt-BR`
        );
        const json = await resposta.json();
        if (json.results && Array.isArray(json.results)) {
          dados = json.results.map(item => ({
            id: item.id.toString(),
            nome: categoria === 'filmes' ? item.title : item.name,
            imagem: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
          }));
        }
      }

      setResultados(dados);
    } catch (error) {
      console.error('Erro ao buscar:', error);
      setErro('Erro na busca, tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [busca, categoria]);

  const abrirModal = useCallback(item => {
    setItemSelecionado(item);
    setStatusSelecionado(null);
    setModalVisible(true);
  }, []);

  const adicionarComStatus = useCallback(async () => {
    if (!statusSelecionado) {
      Alert.alert('Atenção', 'Escolha um status antes de adicionar.');
      return;
    }

    const chaveStorage = `${categoria}_${statusSelecionado}`;

    const listaAtual = (await carregarLista(chaveStorage)) || [];
    const existe = listaAtual.some(i => i.id === itemSelecionado.id);

    if (existe) {
      Alert.alert('Aviso', 'Item já está na lista desse status.');
      setModalVisible(false);
      return;
    }

    const novaLista = [...listaAtual, itemSelecionado];
    await salvarLista(chaveStorage, novaLista);

    Alert.alert('Sucesso', `${itemSelecionado.nome} adicionado à lista ${statusSelecionado}!`);
    setModalVisible(false);
    navigation.goBack();
  }, [categoria, itemSelecionado, navigation, statusSelecionado]);

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1748418361786-c0329309ddd9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Overlay para escurecer a imagem */}
      <View style={styles.overlay} />

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={`Buscar ${categoria}`}
          placeholderTextColor="#ccc"
          value={busca}
          onChangeText={setBusca}
          returnKeyType="search"
          onSubmitEditing={buscar}
          accessibilityLabel={`Campo para buscar ${categoria}`}
        />

        <TouchableOpacity style={styles.botaoBuscar} onPress={buscar} activeOpacity={0.8} accessibilityRole="button">
          <Text style={styles.botaoBuscarTexto}>Buscar</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#7B5FFF" style={{ marginVertical: 20 }} />}
        {erro ? <Text style={[styles.info, styles.erro]}>{erro}</Text> : null}

        <FlatList
          data={resultados}
          keyExtractor={item => item.id}
          ListEmptyComponent={!loading && <Text style={styles.info}>Nenhum resultado.</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => abrirModal(item)} activeOpacity={0.7}>
              {item.imagem ? (
                <Image source={{ uri: item.imagem }} style={styles.imagem} resizeMode="cover" />
              ) : (
                <View style={[styles.imagem, styles.imagemPlaceholder]}>
                  <Text style={styles.imagemPlaceholderText}>Sem imagem</Text>
                </View>
              )}
              <Text style={styles.nome}>{item.nome}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={resultados.length === 0 && { flexGrow: 1, justifyContent: 'center' }}
        />

        {/* Modal para escolher status */}
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalFundo}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitulo}>Escolha o status</Text>
              {statusOptions.map(option => (
                <StatusButton
                  key={option.key}
                  option={option}
                  selected={statusSelecionado === option.key}
                  onPress={setStatusSelecionado}
                />
              ))}

              <View style={styles.modalBotoes}>
                <TouchableOpacity
                  style={[styles.modalBtn, styles.modalBtnCancelar]}
                  onPress={() => setModalVisible(false)}
                  activeOpacity={0.8}
                  accessibilityRole="button"
                >
                  <Text style={[styles.modalBtnTexto, { color: '#444' }]}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalBtn, styles.modalBtnAdicionar]}
                  onPress={adicionarComStatus}
                  activeOpacity={0.8}
                  accessibilityRole="button"
                >
                  <Text style={[styles.modalBtnTexto, { color: '#444' }]}>Adicionar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 70,
    position: 'relative',
    zIndex: 1,
  },
  input: {
    height: 50,           
    borderColor: '#AAA',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 18,         
    marginBottom: 12,
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.15)', 
  },
  botaoBuscar: {
    backgroundColor: '#BB86FC',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  botaoBuscarTexto: {
    color: '#1F1F1F',
    fontWeight: 'bold',
    fontSize: 16,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  imagem: {
    width: 60,
    height: 90,
    borderRadius: 6,
    marginRight: 12,
  },
  imagemPlaceholder: {
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagemPlaceholderText: {
    color: '#ccc',
    fontSize: 12,
  },
  nome: {
    fontSize: 16,
    flexShrink: 1,
    color: '#fff',
  },
  info: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  erro: {
    color: '#f66',
  },
  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalContainer: {
    backgroundColor: '#454e5c',
    borderRadius: 12,
    padding: 20,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
    textAlign: 'center',
  },
  statusButton: {
    backgroundColor: '#444',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  statusButtonSelected: {
    backgroundColor: '#7B5FFF',
  },
  statusButtonText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
  },
  statusButtonTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalBtnCancelar: {
    backgroundColor: '#ccc',
  },
  modalBtnAdicionar: {
  
    backgroundColor: '#ccc',
  },
  modalBtnTexto: {
    fontSize: 16,
  },
});
