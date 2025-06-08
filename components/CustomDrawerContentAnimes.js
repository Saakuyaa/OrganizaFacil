import React from 'react';
import { View, Button } from 'react-native';

function CustomDrawerContentAnimes(props) {
  return (
    <View>
      <Button title="Voltar para Home" onPress={() => props.navigation.navigate('Home')} />
      <Button title="Adicionar Anime" onPress={() => props.navigation.navigate('AdicionarItem', { categoria: 'animes' })} />
    </View>
  );
}

export default CustomDrawerContentAnimes;
