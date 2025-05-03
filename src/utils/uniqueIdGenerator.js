const { nanoid } = require('nanoid');

const generateUniqueId = (prefix) => {
  if (!prefix) {
    throw new Error("Prefix is required");
  }

  // Generate the unique part
  const uniquePart = nanoid(6); // Generates a 6-character unique ID

  // Log the full unique ID being generated
  const fullId = `${prefix}${uniquePart}`;
  console.log("Generated ID:", fullId);

  return fullId;
};

// Export the function
module.exports = generateUniqueId;
