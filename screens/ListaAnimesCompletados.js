import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, Image,
  TouchableOpacity, Alert, Modal, ActivityIndicator, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { carregarLista, salvarLista } from '../utils/storage';

export default function ListaAnimesCompletados() {
  const [lista, setLista] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [animeSelecionado, setAnimeSelecionado] = useState(null);
  const [descricao, setDescricao] = useState('');
  const [carregandoDescricao, setCarregandoDescricao] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const dados = await carregarLista('animes_completados');
    setLista(dados || []);
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
            await salvarLista('animes_completados', novaLista);
            setLista(novaLista);
          }
        }
      ]
    );
  };

  const carregarDescricao = async (id) => {
    setCarregandoDescricao(true);
    setDescricao('');
    try {
      const resposta = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const json = await resposta.json();
      setDescricao(json.data?.synopsis || 'Sinopse não disponível.');
    } catch (error) {
      setDescricao('Erro ao carregar a descrição.');
      console.error('Erro na API Jikan:', error);
    }
    setCarregandoDescricao(false);
  };

  const abrirModal = (anime) => {
    setAnimeSelecionado(anime);
    setModalVisible(true);
    carregarDescricao(anime.id);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setAnimeSelecionado(null);
    setDescricao('');
  };

  if (lista.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Nenhum anime completado ainda.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => abrirModal(item)}
            activeOpacity={0.7}
          >
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

      {/* Modal */}
      <Modal
              visible={modalVisible}
              animationType="fade"
              transparent={true}
              onRequestClose={fecharModal}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitulo}>
                    {animeSelecionado ? animeSelecionado.nome : ''}
                  </Text>
                  <ScrollView style={styles.modalConteudo}>
                    {carregandoDescricao ? (
                      <ActivityIndicator size="large" color="#fff" />
                    ) : (
                      <Text style={styles.modalDescricao}>{descricao}</Text>
                    )}
                  </ScrollView>
                  <TouchableOpacity style={styles.modalFechar} onPress={fecharModal}>
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
        modalOverlay: {
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.75)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        },
        modalContainer: {
          backgroundColor: '#23272A',
          borderRadius: 12,
          padding: 20,
          width: '100%',
          maxHeight: '80%',
        },
        modalTitulo: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#fff',
          marginBottom: 12,
        },
        modalConteudo: {
          maxHeight: '70%',
          marginBottom: 20,
        },
        modalDescricao: {
          fontSize: 16,
          color: '#ccc',
          textAlign: 'justify',
        },
        modalFechar: {
          alignSelf: 'flex-end',
          backgroundColor: '#7289da',
          paddingVertical: 6,
          paddingHorizontal: 16,
          borderRadius: 8,
        },
        modalFecharTexto: {
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 14,
        },
      });
      
