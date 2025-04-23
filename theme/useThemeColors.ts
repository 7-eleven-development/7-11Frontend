import { useColorScheme } from 'react-native';
import { Colors } from './Colors';

type Theme = 'light' | 'dark';

type ThemeColors = typeof Colors.light;

export default function useThemeColors(): ThemeColors {
  const scheme = useColorScheme() as Theme | null;    //om systemet inte har något färgschema definierat så returnerar det null.
  return Colors[scheme ?? 'light'];     //light kommer användas som standardvrde om scheme är null.
}
