const blacklist = new Set();

module.exports = {
    add: async (token) => {
      blacklist.add(token);
    },
    exists:async(token) => {
        blacklist.has(token);
    }
}