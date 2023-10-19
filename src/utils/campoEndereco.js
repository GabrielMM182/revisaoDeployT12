const axios = require("axios");

const getEndereco = async (cep) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

const formatarEndereco = (cepData) => {
  return `${cepData.logradouro}, ${cepData.localidade}, ${cepData.uf}, ${cepData.ddd},`;
};

module.exports = { getEndereco, formatarEndereco };
