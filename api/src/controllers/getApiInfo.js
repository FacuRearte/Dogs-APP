const axios = require("axios");

module.exports = async function getApiInfo() {
  const apiInfo = await axios.get("https://api.thedogapi.com/v1/breeds");
  const list = await apiInfo.data.map((el) => {
    return {
      name: el.name,
      lifeSpan: el.life_span,
      id: el.id,
      height: el.height.metric,
      weight: el.weight.metric,
      temperament: [el.temperament]
        .join()
        .split(",")
        .map((el) => el.trim()),
      img: el.image.url,
    };
  });
  return list;
};
