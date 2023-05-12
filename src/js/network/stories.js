import axios from 'axios';
import Config from '../config/config';
import Utils from '../utils/utils';
import ApiEndpoint from '../config/api-endpoint';

const Stories = {
  async getAll() {
    return await axios.get(ApiEndpoint.GET_ALL_STORIES, {
      headers: {
        Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
      },
    });
  },

  async store({ description, photo }) {
    const data = { description, photo };

    return await axios.post(ApiEndpoint.STORE_STORIES, data, {
      headers: {
        Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async getById(id) {
    return await axios.get(ApiEndpoint.GET_BY_ID_STORIES(id), {
      headers: {
        Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
      },
    });
  },

  async update({ id, name, date, amount, type, description, evidence }) {
    const data = { name, date, amount, type, description, evidence };

    return await axios.put(ApiEndpoint.UPDATE_STORIES(id), data, {
      headers: {
        Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async destroy(id) {
    return await axios.delete(ApiEndpoint.DESTROY_STORIES(id), {
      headers: {
        Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
      },
    });
  },
};

export default Stories;
