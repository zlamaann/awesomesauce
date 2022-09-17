import axios from "axios";

export const getAllArticles = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: '/api/v1/article/all'
      });
      return res;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
  };