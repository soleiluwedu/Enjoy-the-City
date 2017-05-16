// Stringify data.
function stringify(data) {

  // These data types do not have toString() functionality and do not render properly to a React DOM.
  switch (data) {
    case undefined: return 'undefined';
    case null: return 'null';
    case true: return 'true';
    case false: return 'false';
  }

  // Stringify conditionally and possibly recursively according to data type.
    switch (typeof data) {

      case 'object':
        // Recursive stringify any nested Array instances.
        if (Array.isArray(data)) return `[${data.map((e, i) => (i === 0 ? '' : ' ') + stringify(e))}]`;
        // Recursive stringify any nested Object literals.
        else return `{ ${Object.keys(data).map((key, i) => (i === 0 ? '' : ' ') + key + ": " + stringify(data[key]))} }`;

      // Functions have toString() functionality.
      case 'function': return data.toString();

      // Strings need quotes.
      case 'string': return `'${data}'`;

      // All others need not be stringified
      default: return `${data}`;

    }

}

module.exports = stringify;