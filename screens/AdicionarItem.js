/*
Acabou ficando obsoleto


import React, { useState } from 'react';
import { View, TextInput, Button, Image, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { salvarLista, carregarLista } from '../utils/storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const TMDB_API_KEY = 'teste';
const RAWG_API_KEY = 'teste';

export default function AdicionarItem() {
  const [busca, setBusca] = useState('');
  const [status, setStatus] = useState('assistindo');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { categoria } = route.params;

  const buscar = async () => {
    setLoading(true);
    setErro('');
    let dados = [];

    try {
      if (categoria === 'animes') {
        const resposta = await fetch(`https://api.jikan.moe/v4/anime?q=${busca}&limit=10`);
        const json = await resposta.json();
        if (json.data && Array.isArray(json.data)) {
          dados = json.data.map(item => ({
            id: item.mal_id.toString(),
            nome: item.title,
            imagem: item.images.jpg.image_url,
          }));
        }
      } else if (categoria === 'jogos') {
        const resposta = await fetch(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${busca}`);
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
        const resposta = await fetch(`https://api.themoviedb.org/3/search/${tipo}?api_key=${TMDB_API_KEY}&query=${busca}&language=pt-BR`);
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
      setErro('Falha na busca, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const adicionar = async (item) => {
    const chaveLista = `${categoria}_${status}`;
    const listaAtual = await carregarLista(chaveLista);

    const itemExistente = listaAtual.find((i) => i.id === item.id);
    if (itemExistente) {
      Alert.alert('Item já adicionado', 'Este item já está na sua lista.');
    } else {
      const novaLista = [...listaAtual, item];
      await salvarLista(chaveLista, novaLista);
      navigation.goBack();
    }
  };

  return (
    <View style={{ padding: 10, marginTop: 45 }}>
      <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Status:</Text>
      <Picker
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)}
        style={{ marginBottom: 10 }}
      >
        <Picker.Item label="Assistindo" value="assistindo" />
        <Picker.Item label="Completados" value="completados" />
        <Picker.Item label="Planejo Assistir" value="planejo" />
      </Picker>

      <TextInput
        placeholder={`Buscar ${categoria}`}
        value={busca}
        onChangeText={setBusca}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title="Buscar" onPress={buscar} />

      {loading && <Text style={{ marginTop: 10 }}>Carregando...</Text>}
      {erro && <Text style={{ color: 'red', marginTop: 10 }}>{erro}</Text>}

      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={!loading && <Text style={{ marginTop: 10 }}>Nenhum item encontrado.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => adicionar(item)}
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              padding: 10,
              borderWidth: 1,
              borderRadius: 5,
              backgroundColor: '#f9f9f9',
            }}
          >
            {item.imagem && (
              <Image
                source={{ uri: item.imagem }}
                style={{ width: 60, height: 90, marginRight: 10, resizeMode: 'cover' }}
              />
            )}
            <Text style={{ alignSelf: 'center', flexShrink: 1, fontSize: 16 }}>
              {item.nome}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

*/
