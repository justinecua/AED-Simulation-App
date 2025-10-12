import { v4 as uuidv4 } from 'uuid';

export const makeReadableId = prefix => {
  const shortId = uuidv4().split('-')[0];
  return `${prefix}-${shortId}`;
};
