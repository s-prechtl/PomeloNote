'use strict';
//move to utils!
function getNoteIdFromUrl(url) {
  return Number(url.split("/").at(-1));
}

/**
 * note controller
 */
const noteUid = 'api::note.note';
const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController(noteUid, ({strapi}) => ({
  /**
   * Gives all, to the user related, notes.
   * @param ctx
   * @returns {Promise<string>}
   */
  async find(ctx) {
    const userId = ctx.state.user.id;

    const entries = await strapi.entityService.findMany(noteUid, {
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
    const entry = await strapi.entityService.findOne(noteUid, noteId, {
      populate: ['owners'],
    });
    const authorized = entry.owners.some(owner => owner.id === userId)
    if (authorized) {
      return JSON.stringify(entry);
    } else {
      ctx.response.status = 403;
    }
  },
  /**
   * Updates note. Removing owners is an illegal operation (400)
   * @param ctx
   * @returns {Promise<string>}
   */
  async update(ctx) {
    const noteId = getNoteIdFromUrl(ctx.request.url)
    const userId = ctx.state.user.id;
    const requestBody = ctx.request.body;
    const entry = await strapi.entityService.findOne(noteUid, noteId, {
      populate: ['owners'],
    });
    const authorized = entry.owners.some(owner => owner.id === userId)
    let allowed;
    if (requestBody.data.hasOwnProperty("owners")) {
      allowed = entry.owners.every(owner => requestBody.data.owners.includes(owner));
    }
    if (!authorized) {
      ctx.response.status = 403;
    } else if (!allowed) {
      ctx.response.status = 400;
    } else {
      return super.update(ctx);
    }
  },
  /**
   * Deletes user from note owners. If note has no owners anymore, deletes note.
   * @param ctx
   * @returns nothing
   */
  async delete(ctx) {
    const noteId = getNoteIdFromUrl(ctx.request.url)
    const userId = ctx.state.user.id;
    const entry = await strapi.entityService.findOne(noteUid, noteId, {
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
      strapi.entityService.update(noteUid, noteId, {
        data: {
          owners: entry.owners.filter(owner => owner.id !== userId)
        }
      })
    }
    ctx.response.status = 200;
  }
}));
