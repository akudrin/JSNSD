"use strict";

module.exports = async function (fastify, opts) {
  fastify.register(require("@fastify/sensible"));
  fastify.register(require("@fastify/http-proxy"), {
    upstream: "https://news.ycombinator.com/",
    async preHandler(request, reply) {
      if (request.query.token !== "abc") {
        throw fastify.httpErrors.unauthorized();
      }
    },
  });
};
