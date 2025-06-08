import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Image } from 'react-native';
import { carregarLista, removerItem } from '../utils/storage';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';  

export default function ListaAnimes() {
  const [itens, setItens] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute(); 
  const { category } = route.params;  

  useEffect(() => {
    if (isFocused) {
      carregarLista(category).then(setItens);  
    }
  }, [isFocused, category]);  

  const deletar = async (id) => {
    await removerItem(category, id);  
    const atualizada = await carregarLista(category);
    setItens(atualizada);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
            <Image 
              source={{ uri: item.imagem }} 
              style={{ width: 80, height: 120, marginRight: 10 }} 
            />
            <View style={{ justifyContent: 'center', flexShrink: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.nome}</Text>
              <Button title="Remover" onPress={() => deletar(item.id)} />
            </View>
          </View>
        )}
      />
      <Button
        title={`Adicionar Novo ${category.charAt(0).toUpperCase() + category.slice(1)}`}  
        onPress={() => navigation.navigate('AdicionarItem', { categoria: category })}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}
