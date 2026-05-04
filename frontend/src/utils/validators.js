// src/utils/validators.js
export const validarCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += cpf[i] * (10 - i);
  let r = (soma * 10) % 11; if (r === 10) r = 0;
  if (r != cpf[9]) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += cpf[i] * (11 - i);
  r = (soma * 10) % 11; if (r === 10) r = 0;
  return r == cpf[10];
};

export const buscarCEP = async (cep) => {
  const r = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  return r.json();
};
``