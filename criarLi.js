// const listaUl = document.getElementById('list')
const numItem = [0]

function criarLi (){
  const li = document.createElement('li')
  li.id = "li-" + numItem.length
  // li.dataset.confirm = "naoVerificado"
  return li
}

function btnRemov (){
  const btnRemov = document.createElement('button')
  btnRemov.id = "btnRemov-" + numItem.length
  btnRemov.className = "btn-remov-confirm"
  btnRemov.disabled = false
  
  const img = document.createElement('img')
  img.src = "./img/x-svg.svg"
  img.alt = "btnRemov"

  btnRemov.appendChild(img)

  return btnRemov
}

function numLi (){
  const inputIndex = document.createElement ('input')
  inputIndex.type = "text"
  inputIndex.id = "numIndex"
  inputIndex.classList = "numIndex"
  inputIndex.name = "item-" + numItem.length
  inputIndex.value = numItem.length 
  inputIndex.disabled = true
  return inputIndex
}

function descricao (){
  const inputDescricao = document.createElement('input')
  inputDescricao.type = "text"
  inputDescricao.className = "descricao"
  inputDescricao.id = "item" + numItem.length 
  inputDescricao.name = "item-" + numItem.length
  inputDescricao.disabled = false
  inputDescricao.placeholder = "Digite a descrição do produto"
  return inputDescricao
}

function labelB (){
  const lb = document.createElement('label')
  lb.className = "licampoST"
  lb.id = "base-" + numItem.length
  lb.innerText = "BaseST R$: "
  return lb
}


function base (){
  const base = document.createElement('input')
  base.type = "number"
  base.id = "base"
  base.className = "baseSt"
  base.name = "base-" + numItem.length
  base.value = document.getElementById('baseST-devolver').value
  base.disabled = true
  return base
}

function labelValor (){
  const label = document.createElement('label')
  label.className = "licampoST"
  label.htmlFor = "valor-" + numItem.length
  label.innerText = "ValorST R$: "
  return label
}

function valor (){
  const valor =  document.createElement('input')
  valor.type = "number"
  valor.id = "valor"
  valor.className = "valorSt"
  valor.name = "valor-" + numItem.length
  valor.value = document.getElementById('valorST-devolver').value
  valor.disabled = true
  return valor
}

function btnConfirm (){
  const btnConfirm = document.createElement('button')
  btnConfirm.id = "btn-" + numItem.length
  btnConfirm.className = "btn-remov-confirm"

  const imgConfirm = document.createElement('img')
  imgConfirm.src = "./img/ok-svg.svg"
  imgConfirm.alt = "btnConfirm"

  btnConfirm.appendChild(imgConfirm)

  return btnConfirm
}


export{numItem, criarLi, btnRemov, numLi, descricao, labelB, base, labelValor, valor, btnConfirm}