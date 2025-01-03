import React from 'react';
import { FlatList } from 'react-native';
import MenuItem from '../components/menu-item';
import { MenuModel } from '../types/menu-model';

const MenuSection = ({ menus }: { menus: MenuModel[] }) => {
  return (
    <FlatList
      data={menus}
      numColumns={3}
      keyExtractor={(item) => item.title}
      renderItem={({ item, index }) => <MenuItem index={index} menu={item} />}
      columnWrapperStyle={{ justifyContent: 'flex-start', alignItems: 'stretch' }}
      style={{ flex: 1 }}
    />
  );
};

export default MenuSection;
