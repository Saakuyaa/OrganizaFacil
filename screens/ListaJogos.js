import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet } from 'react-native';
import { carregarLista, removerItem } from '../utils/storage';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'; 

export default function ListaJogos() {
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
    <View>
      <FlatList
        data={itens}  
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.imagem }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>{item.nome}</Text>
              <Button title="Remover" onPress={() => deletar(item.id)} />
            </View>
          </View>
        )}
      />
      
      <View style={styles.addButtonContainer}>
        <Button
          title={`Adicionar Novo ${category.charAt(0).toUpperCase() + category.slice(1)}`}  
          onPress={() => navigation.navigate('AdicionarItem', { categoria: category })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  image: {
    width: 80,
    height: 120,
    marginRight: 10,
  },
  textContainer: {
    justifyContent: 'center',
    flexShrink: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButtonContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
});
