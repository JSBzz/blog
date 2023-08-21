exports.makeUniqueId = (length) => {
    const _sym = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
    let uniqueId = ''
    for (let i = 0; i < length; i++) {
      uniqueId += _sym[parseInt(Math.random() * _sym.length)]
    }
  
    return uniqueId
  }
  
// https://yonikim.tistory.com/43 블로그 참조. 