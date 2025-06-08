import React from 'react';
import { View, Button } from 'react-native';

function CustomDrawerContentFilmes(props) {
  return (
    <View>
      <Button title="Voltar para Home" onPress={() => props.navigation.navigate('Home')} />
      <Button title="Adicionar Filme" onPress={() => props.navigation.navigate('AdicionarItem', { categoria: 'filmes' })} />
    </View>
  );
}

export default CustomDrawerContentFilmes;
