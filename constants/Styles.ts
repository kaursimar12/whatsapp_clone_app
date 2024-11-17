import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
  block: {
    backgroundColor: '#fff',
    borderRadius: 0,
    marginHorizontal: 0,
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    gap: 10,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.lightGray,
    marginLeft: 0,
  },
});
