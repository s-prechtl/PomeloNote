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
   * Finds the note by id and updates lastViewed. Exits 403 if the note does not belong to the user making the request.
   * @param ctx
   * @returns {Promise<string>}
   */
  async findOne(ctx) {
    const noteId = getNoteIdFromUrl(ctx.request.url);
    const userId = ctx.state.user.id;
    let entry = await strapi.entityService.findOne(noteUid, noteId, {
      populate: ['owners'],
    });
    const authorized = entry.owners.some(owner => owner.id === userId)
    if (authorized) {
      entry = await strapi.entityService.update(noteUid, noteId, {
        data: {
          lastViewed: Date.now()
        }
      })
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
    const requestBody = JSON.parse(ctx.request.body);
    console.log(JSON.stringify(requestBody, null, 2))
    const entry = await strapi.entityService.findOne(noteUid, noteId, {
      populate: ['owners'],
    });
    const authorized = entry.owners.some(owner => owner.id === userId)
    let allPreviousOwnersKept = true;
    if (requestBody.data.hasOwnProperty("owners")) {
      allPreviousOwnersKept = entry.owners.every(owner => requestBody.data.owners.includes(owner));
    }
    console.log({
      "auth": authorized,
      "allprev": allPreviousOwnersKept,
    })
    if (!authorized) {
      ctx.response.status = 403;
    } else if (!allPreviousOwnersKept) {
      ctx.response.status = 400;
    }
    return await strapi.entityService.update(noteUid, noteId, requestBody);
  },
  /**
   * Creates a new note, automatically sets owners to the user making the request and lastViewed
   * @param ctx
   * @returns {Promise<ctx>}
   */
  async create(ctx) {
    const userId = ctx.state.user.id;
    const requestBody = JSON.parse(ctx.request.body);
    console.log(requestBody);
    const response = await strapi.entityService.create(noteUid, {
      data: {
        title: requestBody.data.title,
        content: requestBody.data.content,
        lastViewed: Date.now(),
        owners: [userId],
        publishedAt: Date.now()
      }
    });
    return response;
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
