import Config from './config';

const ApiEndpoint = {
  REGISTER: `${Config.BASE_URL}/register`,
  LOGIN: `${Config.BASE_URL}/login`,

  GET_ALL_STORIES: `${Config.BASE_URL}/stories`,
  STORE_STORIES: `${Config.BASE_URL}/stories`,
  GUEST_USER_STORIES: `${Config.BASE_URL}/stories/guest`,
  // GET_BY_ID_STORIES: (id) => `${Config.BASE_URL}/stories/${id}`,
  // DESTROY_STORIES: (id) => `${Config.BASE_URL}/stories/${id}`,
};

export default ApiEndpoint;
