import { util, ZodParsedType } from "../helpers/util.ts";
import { ZodErrorMap, ZodIssueCode } from "../ZodError.ts";

const errorMap: ZodErrorMap = (issue, _ctx) => {
  let message: string;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Obbligatorio";
      } else {
        message = `Atteso ${issue.expected}, ricevuto ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Valore letterale non valido, atteso ${JSON.stringify(
        issue.expected,
        util.jsonStringifyReplacer
      )}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Chiave(i) non riconosciuta(e) nell'oggetto: ${util.joinValues(
        issue.keys,
        ", "
      )}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Input non valido`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Valore discriminante non valido. Atteso ${util.joinValues(
        issue.options
      )}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Valore enum non valido. Atteso ${util.joinValues(
        issue.options
      )}, ricevuto '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Argomenti di funzione non validi`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Tipo di ritorno della funzione non valido`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Data non valida`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Input non valido: deve includere "${issue.validation.includes}"`;

          if (typeof issue.validation.position === "number") {
            message = `${message} in una o più posizioni maggiori o uguali a ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Input non valido: deve iniziare con "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Input non valido: deve terminare con "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `${issue.validation} non valido`;
      } else {
        message = "Non valido";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `L'array deve contenere ${
          issue.exact ? "esattamente" : issue.inclusive ? `almeno` : `più di`
        } ${issue.minimum} elemento/i`;
      else if (issue.type === "string")
        message = `La stringa deve contenere ${
          issue.exact ? "esattamente" : issue.inclusive ? `almeno` : `più di`
        } ${issue.minimum} carattere/i`;
      else if (issue.type === "number")
        message = `Il numero deve essere ${
          issue.exact
            ? `esattamente uguale a `
            : issue.inclusive
            ? `maggiore o uguale a `
            : `maggiore di `
        }${issue.minimum}`;
      else if (issue.type === "date")
        message = `La data deve essere ${
          issue.exact
            ? `esattamente uguale a `
            : issue.inclusive
            ? `maggiore o uguale a `
            : `maggiore di `
        }${new Date(Number(issue.minimum))}`;
      else message = "Input non valido";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `L'array deve contenere ${
          issue.exact ? `esattamente` : issue.inclusive ? `al massimo` : `meno di`
        } ${issue.maximum} elemento/i`;
      else if (issue.type === "string")
        message = `La stringa deve contenere ${
          issue.exact ? `esattamente` : issue.inclusive ? `al massimo` : `meno di`
        } ${issue.maximum} carattere/i`;
      else if (issue.type === "number")
        message = `Il numero deve essere ${
          issue.exact
            ? `esattamente`
            : issue.inclusive
            ? `minore o uguale a`
            : `minore di`
        } ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt deve essere ${
          issue.exact
            ? `esattamente`
            : issue.inclusive
            ? `minore o uguale a`
            : `minore di`
        } ${issue.maximum}`;
      else if (issue.type === "date")
        message = `La data deve essere ${
          issue.exact
            ? `esattamente`
            : issue.inclusive
            ? `minore o uguale a`
            : `minore di`
        } ${new Date(Number(issue.maximum))}`;
      else message = "Input non valido";
      break;
    case ZodIssueCode.custom:
      message = `Input non valido`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `I risultati dell'intersezione non possono essere uniti`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Il numero deve essere un multiplo di ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Il numero deve essere finito";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};

export default errorMap;