'use strict';
//move to utils!
function getNoteIdFromUrl(url) {
  return Number(url.split("/").at(-1));
}

/**
 * note controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::note.note', ({strapi}) => ({
  /**
   * Gives all, to the user related, notes.
   * @param ctx
   * @returns {Promise<string>}
   */
  async find(ctx) {
    const userId = ctx.state.user.id;

    const entries = await strapi.entityService.findMany('api::note.note', {
      populate: ['owners'],
      filters: {
        owners: {
          id: userId
        }
      },
      sort: {
        lastViewed: 'desc'
      }
    });
    return JSON.stringify(entries);
  },
  /**
   * Finds the note by id. Exits 403 if the note does not belong to the user making the request
   * @param ctx
   * @returns {Promise<string>}
   */
  async findOne(ctx) {
    const noteId = getNoteIdFromUrl(ctx.request.url);
    const userId = ctx.state.user.id;
    const entry = await strapi.entityService.findOne('api::note.note', noteId, {
      populate: ['owners'],
    });
    const authorized = entry.owners.some(owner => owner.id === userId)
    if (authorized) {
      return JSON.stringify(entry);
    } else {
      ctx.response.status = 403;
    }
  },
  async update(ctx) {
    const noteId = getNoteIdFromUrl(ctx.request.url)
    const userId = ctx.state.user.id;
    const requestBody = ctx.request.body;
    const entry = await strapi.entityService.findOne('api::note.note', noteId, {
      populate: ['owners'],
    });
    const authorized = entry.owners.some(owner => owner.id === userId)
    const allowed = !requestBody.data.hasOwnProperty("owners");
    if (!authorized) {
      ctx.response.status = 403;
    } else if (!allowed) {
      ctx.response.status = 400;
    } else {
      super.update(ctx);
    }
  },
  async delete(ctx) {
    const noteId = getNoteIdFromUrl(ctx.request.url)
    const userId = ctx.state.user.id;
    const entry = await strapi.entityService.findOne('api::note.note', noteId, {
      populate: ['owners'],
    });
    const ownersCount = entry.owners.length;
    const authorized = entry.owners.some(owner => owner.id === userId)
    if (!authorized) {
      ctx.response.status = 403;
      return;
    }
    if (ownersCount === 1) {
      super.delete(ctx);
    } else {
      strapi.entityService.update('api::note.note', noteId, {
        data: {
          owners: entry.owners.filter(owner => owner.id !== userId)
        }
      })
    }
  }
}));
