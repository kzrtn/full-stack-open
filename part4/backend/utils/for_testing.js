const reverse = string => {
  return string.split('').reverse().join('')
}

const average = array => {
  const total = array.reduce((sum, accumulator) => sum + accumulator, 0)
  return (total / array.length) || 0
}

module.exports = { reverse, average }