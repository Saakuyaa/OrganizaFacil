import AsyncStorage from '@react-native-async-storage/async-storage';

export const salvarLista = async (chave, lista) => {
  try {
    await AsyncStorage.setItem(chave, JSON.stringify(lista));
  } catch (error) {
    console.error('Erro ao salvar lista:', error);
  }
};

export const carregarLista = async (chave) => {
  try {
    const json = await AsyncStorage.getItem(chave);
    return json != null ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Erro ao carregar lista:', error);
    return [];
  }
};

export const removerItem = async (chave, id) => {
  try {
    const listaAtual = await carregarLista(chave);
    const novaLista = listaAtual.filter(item => String(item.id) !== String(id));
    await salvarLista(chave, novaLista);
  } catch (error) {
    console.error('Erro ao remover item:', error);
  }
};
