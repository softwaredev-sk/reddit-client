export const ERRORS = {
  empty: "Name can't be empty! Enter a valid sub name",
  short: 'Reddit name too short!',
  long: 'Reddit name too long!',
  retry: 'Please check subreddit name and retry!',
  exists: `Already added to the list`,
  subExists(sub) {
    return `${sub} ${this.exists.toLowerCase()}`;
  },
};

export const SIDEBAR_EFFECTS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay: 0.15, duration: 0.25 },
};
