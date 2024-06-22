import { useWindowDimensions } from "react-native";
import { s } from "./Txt.style";

import { Text } from "react-native";
const IPHONE_12_PRO_MAX_RATIO = 0.0010799136069114472;
export function Txt({ children, style, ...restProps }) {
  const fontSize = style?.fontSize || s.txt.fontSize;
  const { height } = useWindowDimensions();
  return (
    <Text
      style={[
        s.txt,
        style,
        {
          fontSize: Math.round(fontSize * IPHONE_12_PRO_MAX_RATIO * height),
        },
      ]}
      {...restProps}
    >
      {children}
    </Text>
  );
}
