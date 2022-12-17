const validationRules = {
  personName(entity: unknown) {
    if(typeof entity !== "string") {
      return false;
    }

    return (/^[А-ЯЁA-Z][а-яё\-a-z]{1,25}[а-яa-zё]$/).test(entity);
  },

  isInteger(entity: unknown) {
    if(typeof entity !== "number") {
      return false;
    }

    if(!(/^\d+$/).test(String(entity))) {
      return false;
    }

    return true;
  },

  isDate(entity: unknown) {
    if(typeof entity !== "string") {
      return false;
    }

    return String(new Date(entity)) !== "Invalid Date";
  },

  isPastDate(entity: unknown) {
    if(typeof entity !== "string" || !this.isDate(entity)) {
      return false;
    }

    return new Date(entity) <= new Date();
  },

  isFutureDate(entity: unknown) {
    if(typeof entity !== "string" || !this.isDate(entity)) {
      return false;
    }

    return new Date(entity) > new Date();
  },

  gender(entity: unknown) {
    if(typeof entity !== "string") {
      return false;
    }

    return ["male", "female"].includes(entity);
  },

  comment(entity: unknown) {
    return typeof entity === "string" && entity.length > 0 && entity.length <= 200;
  },
};

export type ValidationRequest = {rule: keyof typeof validationRules, entity: unknown;};

export default function validate({rule, entity}: ValidationRequest): boolean {
  return validationRules[rule](entity);
}

export function validateMany(validationRequests: (ValidationRequest & {displayRuleName?: string;})[]): string[] {
  const validationMessages: string[] = [];

  for(const {rule, entity, displayRuleName} of validationRequests) {
    if(!validate({rule, entity})) {
      validationMessages.push(`The ${displayRuleName ?? rule} field is not valid`);
    }
  }

  return validationMessages;
}
