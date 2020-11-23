
function ZeroPadNumber( number ) {
  return ( `00000` + number ).slice( -6 )
}

module.exports = {
  ZeroPadNumber
}