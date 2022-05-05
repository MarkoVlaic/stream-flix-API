export const allShowsSchema = {
  querystring: {
    limit: {
      type: 'number'
    },
    offset: {
      type: 'number'
    }
  },
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'number'
          },
          title: {
            type: 'string'
          },
          rating: {
            type: 'string'
          },
          numberseasons: {
            type: 'number'
          }
        }
      }
    }
  }
};

export const singleShowSchema = {
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'number'
      }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        seasons: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              number: {
                type: 'number'
              },
              episodes: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    number: {
                      type: 'number'
                    },
                    trackId: { 
                      type: 'number'
                    }
                  }
                }
              }
            }
          }
        }
      },
    },
    404: {
      message: {
        type: 'string'
      }
    }
  }
};