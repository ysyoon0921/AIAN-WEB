import type { Core } from '@strapi/strapi';
import { enablePublicPermissions, ensureLocales, seedContent } from './seed/bootstrap';

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensureLocales(strapi);
    await enablePublicPermissions(strapi);
    await seedContent(strapi);
  },
};
