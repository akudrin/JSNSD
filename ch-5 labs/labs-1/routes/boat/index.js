"use strict";
const { promisify } = require("util");
const { boat } = require("../../model");
const read = promisify(boat.read);

module.exports = async (fastify, opts) => {
  const { notFound } = fastify.httpErrors;

  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params;
    try {
      return await read(id);
    } catch (err) {
      if (err.message === "not found") throw notFound();
      throw err;
    }
  });
};
