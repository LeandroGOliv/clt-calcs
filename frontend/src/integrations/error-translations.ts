import type * as errors from "../../node_modules/zod/v4/core/errors";

const error = (): errors.$ZodErrorMap => {
  const Sizable = {
    string: { unit: "caracteres", verb: "ter" },
    file: { unit: "bytes", verb: "ter" },
    array: { unit: "itens", verb: "ter" },
    set: { unit: "itens", verb: "ter" },
  } as const;

  type SizableKeys = keyof typeof Sizable;

  function getSizing(origin: string) {
    if (origin in Sizable) {
      return Sizable[origin as SizableKeys];
    }
    return null;
  }

  return (issue): string | { message: string } | undefined | null => {
    switch (issue.code) {
      case "invalid_type": {
        const _issue = issue as errors.$ZodIssueInvalidType;
        if (
          _issue.expected === "string" &&
          (_issue.input === null || _issue.input === undefined)
        ) {
          return "Preencha este campo";
        }
        if (_issue.expected === "string") {
          return "Digite um texto válido";
        }
        if (_issue.expected === "number") {
          return "Digite um número válido";
        }
        if (_issue.expected === "boolean") {
          return "Selecione uma opção";
        }
        if (_issue.expected === "array") {
          return "Selecione ao menos uma opção";
        }
        if (_issue.expected === "object") {
          return "Preencha as informações corretamente";
        }
        if (_issue.expected === "date") {
          return "Digite uma data válida";
        }
        return "Preencha este campo corretamente";
      }

      case "invalid_value": {
        return "Selecione uma opção válida";
      }

      case "too_big": {
        const _issue = issue as errors.$ZodIssueTooBig;
        const sizing = getSizing(_issue.origin);
        const maximum =
          typeof _issue.maximum === "bigint"
            ? Number(_issue.maximum)
            : _issue.maximum;

        if (_issue.origin === "string") {
          return `Use no máximo ${maximum} caracteres`;
        }
        if (_issue.origin === "file") {
          const mb = maximum / (1024 * 1024);
          if (mb >= 1) {
            return `Arquivo muito grande. Tamanho máximo: ${mb.toFixed(1)}MB`;
          }
          const kb = maximum / 1024;
          if (kb >= 1) {
            return `Arquivo muito grande. Tamanho máximo: ${kb.toFixed(1)}KB`;
          }
          return `Arquivo muito grande. Tamanho máximo: ${maximum} bytes`;
        }
        if (_issue.origin === "array" || _issue.origin === "set") {
          return `Selecione no máximo ${maximum} ${
            maximum === 1 ? "item" : "itens"
          }`;
        }
        if (sizing) {
          return `Máximo permitido: ${maximum} ${sizing.unit}`;
        }
        return `Valor máximo: ${maximum}`;
      }

      case "too_small": {
        const _issue = issue as errors.$ZodIssueTooSmall;
        const sizing = getSizing(_issue.origin);
        const minimum =
          typeof _issue.minimum === "bigint"
            ? Number(_issue.minimum)
            : _issue.minimum;

        if (_issue.origin === "string") {
          if (minimum === 1) {
            return "Este campo é obrigatório";
          }
          return `Use no mínimo ${minimum} caracteres`;
        }
        if (_issue.origin === "array" || _issue.origin === "set") {
          if (minimum === 1) {
            return "Selecione ao menos uma opção";
          }
          return `Selecione ao menos ${minimum} ${
            minimum === 1 ? "item" : "itens"
          }`;
        }
        if (_issue.origin === "file") {
          return `Arquivo muito pequeno. Mínimo: ${minimum} bytes`;
        }
        if (sizing) {
          return `Mínimo necessário: ${minimum} ${sizing.unit}`;
        }
        return `Valor mínimo: ${minimum}`;
      }

      case "invalid_format": {
        const _issue = issue as errors.$ZodIssueInvalidStringFormat;

        if (_issue.format === "email") {
          return "Digite um e-mail válido (exemplo: seu@email.com)";
        }
        if (_issue.format === "url") {
          return "Digite uma URL válida (exemplo: https://site.com)";
        }
        if (_issue.format === "date") {
          return "Digite uma data válida";
        }
        if (_issue.format === "time") {
          return "Digite uma hora válida";
        }
        if (_issue.format === "datetime") {
          return "Digite uma data e hora válida";
        }
        if (_issue.format === "duration") {
          return "Digite uma duração válida";
        }
        if (_issue.format === "ipv4" || _issue.format === "ipv6") {
          return "Digite um endereço IP válido";
        }
        if (_issue.format === "cidrv4" || _issue.format === "cidrv6") {
          return "Digite uma faixa de IP válida";
        }
        if (_issue.format === "e164") {
          return "Digite um número de telefone válido";
        }
        if (
          _issue.format === "uuid" ||
          _issue.format === "uuidv4" ||
          _issue.format === "uuidv6"
        ) {
          return "Código de identificação inválido";
        }
        if (
          _issue.format === "guid" ||
          _issue.format === "cuid" ||
          _issue.format === "cuid2" ||
          _issue.format === "ulid" ||
          _issue.format === "nanoid" ||
          _issue.format === "xid" ||
          _issue.format === "ksuid"
        ) {
          return "Código inválido";
        }
        if (_issue.format === "jwt") {
          return "Token de autenticação inválido";
        }
        if (_issue.format === "base64" || _issue.format === "base64url") {
          return "Formato de codificação inválido";
        }
        if (_issue.format === "json_string") {
          return "Formato JSON inválido";
        }
        if (_issue.format === "emoji") {
          return "Digite um emoji válido";
        }

        if (_issue.format === "starts_with" && "prefix" in _issue) {
          return `O texto deve começar com "${
            (_issue as errors.$ZodIssueStringStartsWith).prefix
          }"`;
        }
        if (_issue.format === "ends_with" && "suffix" in _issue) {
          return `O texto deve terminar com "${
            (_issue as errors.$ZodIssueStringEndsWith).suffix
          }"`;
        }
        if (_issue.format === "includes" && "includes" in _issue) {
          return `O texto deve conter "${
            (_issue as errors.$ZodIssueStringIncludes).includes
          }"`;
        }
        if (_issue.format === "regex") {
          return "Formato inválido";
        }
        if (_issue.format === "template_literal") {
          return "Digite um valor válido";
        }

        return "Formato inválido";
      }

      case "not_multiple_of":
        if (issue.divisor === 1) {
          return "Digite um número inteiro";
        }
        if (issue.divisor <= 10) {
          const examples = [issue.divisor, issue.divisor * 2, issue.divisor * 3]
            .map((n) => n.toString())
            .join(", ");
          return `Digite um múltiplo de ${issue.divisor} (exemplo: ${examples}...)`;
        }
        return `O valor deve ser múltiplo de ${issue.divisor}`;

      case "unrecognized_keys": {
        const _issue = issue as errors.$ZodIssueUnrecognizedKeys;
        if (_issue.keys.length === 1) {
          return `Campo não permitido: ${_issue.keys[0]}`;
        }
        return `Campos não permitidos: ${_issue.keys.join(", ")}`;
      }

      case "invalid_key":
        return "Campo inválido ou não reconhecido";

      case "invalid_union":
        return "Informação inválida. Verifique os dados digitados";

      case "invalid_element":
        return "Um ou mais valores estão inválidos";

      default:
        return "Preencha este campo corretamente";
    }
  };
};

export function customPtBr() {
  return {
    localeError: error(),
  };
}
