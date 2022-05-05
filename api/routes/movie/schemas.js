export const allMoviesSchema = {
  querystring: {
    type: 'object',
    properties: {
      limit: {
        type: 'number'
      },
      offset: {
        type: 'number'
      }
    },
  },
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          trackid: {
            type: 'number'
          },
          prevmovieid: {
            type: 'number'
          },
          nextmovieid: {
            type: 'number'
          },
          title: {
            type: 'string'
          },
          duration: {
            type: 'object',
            properties: {
              hours:{
                type: 'number'
              },
              minutes: {
                type: 'number'
              }
            }
          },
          rating: {
            type: 'string'
          }
        }
      }
    }
  }
};
