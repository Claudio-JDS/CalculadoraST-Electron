

const quantNtCompra = document.getElementById('quant-compra')
const baseStCompra = document.getElementById('baseST-compra')
const valorStCompra = document.getElementById('valorST-compra')
const quantDevolucao = document.getElementById('quant-devolver')

function devolucaoBaseDeCalc (){
  const base =  quantDevolucao.value * baseStCompra.value
  const valor = base / quantNtCompra.value
  return valor
}

function devolucaoValorST (){
  const devolucaoBase = valorStCompra.value / quantNtCompra.value
  return devolucaoBase * quantDevolucao.value
}

export {devolucaoBaseDeCalc, devolucaoValorST}



