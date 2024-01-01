/**
 * "a,   b, c, d" => [a, b, c, d]
 * 
 * @param {String} text
 * 
 * */
export function getTagList(text) {
  return text.split(',').map(t => t.trim())
}

/**
 * @param {Array} tagLists
 * */
export function countTags(tagLists, sortBy) {
  const count = {}

  for (const tagList of tagLists) {
    for (const tag of tagList) {
      count[tag] = (count[tag] || 0) + 1
    }
  }

  return Object.entries(count).map(([tag, count]) => ({ name: tag, count })).sort((a, b) => b.count - a.count)
}