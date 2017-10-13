// Stringify data.
function unlace(data) {
  // These data types do not have toString() functionality.
  switch (data) {
    case undefined: return 'undefined';
    case null: return 'null';
    case true: return 'true';
    case false: return 'false';
    default:
  }

  // Stringify conditionally and possibly recursively according to data type.
  switch (typeof data) {
    case 'object':
      // Recursive stringify any nested Array instances.
      if (Array.isArray(data)) return `[${data.map((e, i) => (i === 0 ? '' : ' ') + unlace(e))}]`;
      // Recursive stringify any nested Object literals.
      return `{ ${Object.keys(data).map((key, i) => (i === 0 ? '' : ' ') + key + ': ' + unlace(data[key]))} }`;

    // Strings need quotes.
    case 'string': return `'${data}'`;

    // All others, including Functions, will be stringified with toString().
    default: return data.toString();
  }
}

module.exports = unlace;
