import React from 'react';
import { View, Button } from 'react-native';

function CustomDrawerContentSeries(props) {
  return (
    <View>
      <Button title="Voltar para Home" onPress={() => props.navigation.navigate('Home')} />
      <Button title="Adicionar Série" onPress={() => props.navigation.navigate('AdicionarItem', { categoria: 'series' })} />
    </View>
  );
}

export default CustomDrawerContentSeries;
