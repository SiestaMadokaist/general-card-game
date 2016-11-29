exports.ADD = "CHAT.ADD"
exports.addChat = (author, imageUrl, text) => {
  return {
    type: exports.ADD,
    author,
    imageUrl,
    text
  }
}
