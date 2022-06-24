"use strict";
const got = require("got");

const { BICYCLE_SERVICE_PORT = 4000, BRAND_SERVICE_PORT = 5000 } = process.env;

const bicycleSrv = `http://localhost:${BICYCLE_SERVICE_PORT}`;
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`;

module.exports = async function (fastify, opts) {
  fastify.get("/:id", async function (request, reply) {
    const { id } = request.params;
    const bicycle = await got(`${bicycleSrv}/${id}`).json();
    const brand = await got(`${brandSrv}/${id}`).json();
    /*also valid
   const [ bicycle, brand ] = await Promise.all([
      got(`${bicycleSrv}/${id}`).json(),
      got(`${brandSrv}/${id}`).json()
    ])
  */
    return {
      id: bicycle.id,
      color: bicycle.color,
      brand: brand.name,
    };
  });
};
