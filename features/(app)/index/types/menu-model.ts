import { SvgProps } from 'react-native-svg';

export type MenuModel = {
  title: string;
  icon: React.FC<SvgProps>;
  bgColor: string;
};
