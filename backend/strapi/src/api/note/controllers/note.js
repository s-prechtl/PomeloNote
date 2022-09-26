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
      sort: 'lastViewed'
    });
    return JSON.stringify(entries);
  },
  /**
   * Finds the note by id. Only returns the note when the user is assigned.
   * @param ctx
   * @returns {Promise<void>}
   */
  async findOne(ctx) {
    console.log("findOne")
  }
}));

/**
 *
 */
