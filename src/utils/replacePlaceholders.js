export default function replacePlaceholders(template, values = {}) {
    return template.replace(/\{([^}]+)\}/g, (_, key) => values[key] || `{${key}}`);
  }
  