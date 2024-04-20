import {devolucaoBaseDeCalc, devolucaoValorST} from "./calculoImposto.js"
import {numItem, criarLi, btnRemov, numLi, descricao, labelB, base, labelValor, valor, btnConfirm} from "./criarLi.js"
const {ipcRenderer} = require('electron')




//ints descrição
const nomeEmpresa = document.getElementById('empresa')
const numNf = document.getElementById('numNf')

//inputs calcular
const quantNtCompra = document.getElementById('quant-compra')
const baseStCompra = document.getElementById('baseST-compra')
const valorStCompra = document.getElementById('valorST-compra')
const quantDevolucao = document.getElementById('quant-devolver')
const baseDevolucao = document.getElementById('baseST-devolver') 
const valorDevolucao = document.getElementById('valorST-devolver')
const toalBase = document.getElementById('totalSt-base')
const totalValor = document.getElementById('totalSt-valor')

//botoes
const btnCalcularImposto = document.getElementById('btnCalcular')
const btnAdicionarProd = document.getElementById('btnAdicionar')
const calcularTotal = document.getElementById('calcTotal')
const print = document.getElementById('btnPrint')


btnCalcularImposto.addEventListener('click', function(ev){
  ev.preventDefault
  
  if (quantDevolucao.value === null || quantDevolucao.value === '' ){
    ipcRenderer.invoke('dialog', "showMessageBox", {
      type: 'error',
      buttons: ['OK'],
      title: 'Campo Vazio',
      message: 'O campo quantidade na devolução está vazio!\n Preencha o campo e clique em calcular.'
    })
  
  } else if (valorStCompra .value === null || valorStCompra.value === '' ){
    ipcRenderer.invoke('dialog', "showMessageBox", {
      type: 'error',
      buttons: ['OK'],
      title: 'Campo Vazio',
      message: 'O campo ValorST da nota de origem está vazio!\n Preencha o campo e clique em calcular.'
    })

  }else if (baseStCompra.value === null || baseStCompra.value === '' ){
    ipcRenderer.invoke('dialog', "showMessageBox", {
      type: 'error',
      buttons: ['OK'],
      title: 'Campo Vazio',
      message: 'O campo BaseST da nota de origem está vazio!\n Preencha o campo e clique em calcular.'
    })
  

  }else if (quantNtCompra.value === null || quantNtCompra.value === '' ){
    ipcRenderer.invoke('dialog', "showMessageBox", {
      type: 'error',
      buttons: ['OK'],
      title: 'Campo Vazio',
      message: 'O campo quantidade da nota de origem está vazio!\n Preencha o campo e clique em calcular.'
    })
    

  }else{
    const baseDevolucao = devolucaoBaseDeCalc();
    const valorDevolucao = devolucaoValorST();

    //arredondando os valores para 2 casas decimais
    const baseSt = Math.round(baseDevolucao * 100) / 100;
    const valorSt = Math.round(valorDevolucao * 100) / 100;

    document.getElementById('baseST-devolver').value = baseSt
    document.getElementById('valorST-devolver').value = valorSt
    btnAdicionarProd.disabled = false
  }
})

btnAdicionarProd.addEventListener('click', function(ev) {
  ev.preventDefault();

 
  const li = criarLi()
  const remover = btnRemov()
  const indexLi = numLi()
  const decricaoProd = descricao()
  const labelBase = labelB()
  const inputBase = base()
  const labolValorSt = labelValor()
  const inputValor = valor()
  const confirm = btnConfirm()

  
  li.append(remover, indexLi, decricaoProd, labelBase, inputBase, labolValorSt, inputValor, confirm)

  const listaProd = document.getElementById("list")
  listaProd.appendChild(li)

  quantNtCompra.value = ""
  baseStCompra.value = ""
  valorStCompra.value = ""
  quantDevolucao.value = ""
  baseDevolucao.value = ""
  valorDevolucao.value = ""
  btnAdicionarProd.disabled = true

  const cont= "linha-" + numItem.length
  numItem.push(cont)
  

  remover.addEventListener("click", function(){
    listaProd.removeChild(li)
    
    //Me da o número de linhas restantes apos excluir uma linha
    const linhasRest = listaProd.querySelectorAll('li')
    const numLinha = linhasRest.length //lê o index do linhasRest('li')
    
    //Excluindo a linha e reordenando os números das linhas
    linhasRest.forEach((linha, index) =>{
      const input = linha.querySelector('input')
      input.value = index + 1
    })

    //Exlcuindo a ultimo elemto do array
    numItem.splice(-1)

    console.log("Linhas restantes = " + numLinha)
    console.log("Atualizando o index do array = " + numItem.length)
  })

  // Ao clicar o botão confirmar pinta a li com classe e desbilita o campo descrição e o botão remover ao clicar novamente retira as auterações.
  confirm.addEventListener('click', function(){
    li.classList.toggle('verificado');
    
    if (decricaoProd.disabled === false){
      decricaoProd.disabled = true
      remover.disabled = true
    }else if(decricaoProd.disabled === true){
      decricaoProd.disabled = false
      remover.disabled = false
    }
      
  })
  console.log(numItem)

})

calcularTotal.addEventListener('click', function(ev){
  ev.preventDefault()
  const lista = document.getElementById('list');

  let somaBaseST = 0
  let somaValorST = 0

  const linhas = lista.querySelectorAll('li')

  linhas.forEach((linhaAtual) => {
    const base = linhaAtual.querySelector('#base').value
    const valor = linhaAtual.querySelector('#valor').value

    somaBaseST +=  parseFloat(base)
    somaValorST += parseFloat(valor)
  })
  
  const totalBase = somaBaseST
  const totalValor = somaValorST

  document.getElementById('totalSt-base').value = totalBase.toFixed(2)
  document.getElementById('totalSt-valor').value = totalValor.toFixed(2)
})

print.addEventListener('click', function(ev){
  //validando campos do pdf
  if (nomeEmpresa.value === '' || numNf.value === ''){
    ipcRenderer.invoke('dialog', "showMessageBox", {
      type: 'error',
      buttons: ['OK'],
      title: 'Campo Vazio',
      message: 'O campo nome da empresa ou Nº NFe está vazio!'
    })

  } else if (totalValor.value === null || totalValor.value === '' ){
    ipcRenderer.invoke('dialog', "showMessageBox", {
      type: 'error',
      buttons: ['OK'],
      title: 'Campo Vazio',
      message: 'Precione "Calcular Total" para realizar a impressão'
    })
    
  } else {
    // Capturar os valores dos inputs
    const listProd = document.getElementById('list');
    const li = listProd.querySelectorAll('li');

    let pdf = ``;

    let content = '';
    li.forEach((item) => {
      const index = item.querySelector('.numIndex').value
      const descricao = item.querySelector('.descricao').value; // Capturar o valor do input descrição
      const baseST = item.querySelector('.baseSt').value; // Capturar o valor do input base do ST
      const valorST = item.querySelector('.valorSt').value; // Capturar o valor do input valor do ST

      // Adicionar os valores dos inputs ao conteúdo
      content += `${index} -  ${descricao} BaseST R$: ${baseST} ValorST R$: ${valorST}<br><br>`;
    });

    pdf = `Empresa: ${nomeEmpresa.value} Nº NFe: ${numNf.value} <br><br><br>                     
    ${content} <br><br><br> Total BaseST R$:${toalBase.value} Total ValorST R$: ${totalValor.value}`

    // Configurar as opções do PDF
    const options = {
      margin: [10, 10, 10, 10],
      filename: "arquivo.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Gerar e baixar o PDF
    html2pdf().set(options).from(pdf).save();
  }
})






