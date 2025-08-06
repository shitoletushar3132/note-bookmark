const notecreateRule = {
  title: { type: "string", required: true },
  content: { type: "string", required: true },
  tags: { type: "array", required: false },
};

const bookmarkRules = {
  title: {
    type: "string",
    required: false,
  },
  url: {
    type: "string",
    required: true,
  },
  tags: {
    type: "array",
    required: false,
  },
};

const userRules = {
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
};

export { notecreateRule, bookmarkRules, userRules };
