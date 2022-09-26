'use strict';

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
    const noteId = Number(ctx.request.url.split("/").at(-1));
    const userId = ctx.state.user.id;
    const entry = await strapi.entityService.findOne('api::note.note', noteId, {
      populate: ['owners'],
    });
    let allowed = entry.owners.some(owner => owner.id === userId)
    if (allowed) {
      return JSON.stringify(entry);
    } else {
      ctx.response.status = 403;
    }
  },

}));
