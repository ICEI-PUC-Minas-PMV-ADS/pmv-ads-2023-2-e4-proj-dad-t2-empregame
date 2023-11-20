import { Box, Select } from "native-base";
import Svg, { SvgProps, Path } from "react-native-svg";

export const SelectPrimary = (props: {
  children: React.ReactNode;
  defaultValue: string | undefined;
  onValueChange: ((itemValue: string) => void) | undefined;
}) => {
  return (
    <Select
      placeholder="Selecionar"
      fontFamily={"Outfit-500"}
      color={"white"}
      fontSize={"18px"}
      bg={"#5A2DA4"}
      rounded={"full"}
      py={"10px"}
      px={"25px"}
      w={"full"}
      borderWidth={"0px"}
      dropdownIcon={
        <Box paddingRight={"15px"}>
          <DropdownIcon />
        </Box>
      }
      onValueChange={props.onValueChange}
      defaultValue={props.defaultValue}
    >
      {props.children}
    </Select>
  );
};

const DropdownIcon = (props: SvgProps) => (
  <Svg width={22} height={22} fill="none" {...props}>
    <Path
      fill="white"
      d="M17.473 7.2a1.375 1.375 0 0 0-1.945 0l-4.204 4.203a.458.458 0 0 1-.648 0L6.473 7.2a1.375 1.375 0 0 0-1.945 1.944l4.203 4.204a3.208 3.208 0 0 0 4.538 0l4.204-4.204a1.375 1.375 0 0 0 0-1.944Z"
    />
  </Svg>
);
