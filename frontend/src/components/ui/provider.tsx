"use client";

import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineRecipe,
} from "@chakra-ui/react";

import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

const buttonRecipe = defineRecipe({
  variants: {
    variant: {
      solid: {
        bg: "var(--color-secondary)",
        color: "var(--color-text)",
        _hover: {
          bg: "var(--color-secondary)/80",
        },
      },
    },
  },
});

const system = createSystem(defaultConfig, {
  preflight: false,
  theme: {
    recipes: {
      button: buttonRecipe,
      input: {
        variants: {
          outline: {
            field: {
              borderColor: "red.700",
              _hover: {
                borderColor: "blue.800",
              },
              _focus: {
                borderColor: "blue.500",
                boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
              },
              _invalid: {
                borderColor: "red.500",
                boxShadow: "0 0 0 1px var(--chakra-colors-red-500)",
              },
            },
          },
        },
      },
    },
  },
});

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
