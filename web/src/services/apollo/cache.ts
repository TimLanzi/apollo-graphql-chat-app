import { InMemoryCache, makeVar } from "@apollo/client";

interface UserState {
  loading: boolean;
  data: any | null;
}

export const userVar = makeVar<UserState>({
  loading: true,
  data: null,
});

export default new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        sessionUser: {
          read() {
            return userVar();
          },
        },
      },
    },
  },
});