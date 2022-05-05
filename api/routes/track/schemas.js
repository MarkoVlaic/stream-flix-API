export const trackSchema = {
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
        tracktitle: {
          type: 'string'
        },
        releasedate: {
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
        subtitleLanguages: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        audioLanguages: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      },
      404: {
        message: {
          type: 'string'
        }
      }
    }
      }
};