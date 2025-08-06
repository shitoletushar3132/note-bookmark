export default function validate(data, rules) {
  const errors = [];

  for (const field in rules) {
    const rule = rules[field];
    const value = data[field];

    if (
      rule.required &&
      (value === undefined || value === null || value === "")
    ) {
      errors.push(`${field} is required`);
      continue;
    }

    if (value === undefined || value === null) continue;

    switch (rule.type) {
      case "string":
        if (typeof value !== "string") errors.push(`${field} must be a string`);
        break;
      case "number":
        if (typeof value !== "number") errors.push(`${field} must be a number`);
        break;
      case "array":
        if (!Array.isArray(value)) errors.push(`${field} must be an array`);
        break;
      case "object":
        if (typeof value !== "object" || Array.isArray(value))
          errors.push(`${field} must be an object`);
        break;
      case "boolean":
        if (typeof value !== "boolean")
          errors.push(`${field} must be a boolean`);
        break;
      default:
        errors.push(`Invalid type for ${field}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
