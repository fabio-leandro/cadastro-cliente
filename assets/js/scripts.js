const tipos = document.getElementById("tipos");
const lblCpfCnpj = document.getElementById("lblCpfCnpj");
const inputCpfCnpj = document.getElementById("i-CpfCnpj");

tipos.addEventListener("change", ()=>{

    if(tipos.value === "pf"){
        lblCpfCnpj.textContent = "CPF";
        inputCpfCnpj.value = "";
        inputCpfCnpj.setAttribute("maxlength","11")
    }
    if(tipos.value === "pj"){
        lblCpfCnpj.textContent = "CNPJ";
        inputCpfCnpj.value = "";
        inputCpfCnpj.setAttribute("maxlength","14")
    }

});

//cpf
const cpfCnpj = document.getElementById('i-CpfCnpj');
//Nome
const nome = document.getElementById('i-Nome');
//Rua
const rua = document.getElementById('i-Rua');
//numero
const numero = document.getElementById('i-Numero');
//bairro
const bairro = document.getElementById('i-Bairro');
//complemento
const complemento = document.getElementById('i-Complemento');
//cep
const cep = document.getElementById('i-Cep');
//uf
const uf = document.getElementById('i-UF');
//municipio
const municipio = document.getElementById('i-Municipio');
//ibge
const ibge = document.getElementById('i-IBGE');
//celular
const celular = document.getElementById('i-Celular');
//fixo
const fixo = document.getElementById('i-Fixo');
//email
const email = document.getElementById('i-Email');
//password
const password = document.getElementById('i-Password');
//repita senha
const repeatPassword = document.getElementById('i-RepeatPassword');

const btnSalvar = document.getElementById('btnSalvar');
btnSalvar.addEventListener('click',()=>{
    if(password === repeatPassword){
        salvarCliente();
    }else{
        alert("As senhas não são iguais.")
    }
   
})

const address = async (cep) =>{
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        return await response.json();
    } catch (e) {
        return console.log(e);
    }
}

cep.addEventListener('blur', async ()=>{
   const  e = await address(cep.value)
   rua.value = e.logradouro;
   bairro.value = e.bairro;
   cep.value = e.cep;
   uf.value = e.uf;
   municipio.value = e.localidade;
   ibge.value = e.ibge;

})

function salvarCliente(){
        fetch('http://localhost:8080/api/v1/clientes',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(
            {
                nome: nome.value,
                tipoCliente: tipos.value === "pf"? "PESSOAFISICA":"PESSOAJURIDICA",
                cpfCnpj: cpfCnpj.value,
                email: email.value,
                senha: password.value,
                endereco: {
                    rua: rua.value,
                    numero: numero.value,
                    bairro: bairro.value,
                    complemento: complemento.value,
                    cep: cep.value,
                    uf: uf.value,
                    municipio: municipio.value,
                    ibge: ibge.value
                },
                telefones: [
                    {
                        numero: celular.value
                    },
                    {
                        numero: fixo.value
                    }
                ]
            }
        ) 
    }).then(response => response.json())
    .then(data => console.log(data))
    .catch(e=> console.log(e));
}
