import { InMemoryCache, makeVar } from "@apollo/client";

interface UserState {
  loading: boolean;
  data: any | null;
  refetch: (() => void) | null;
}

export const userVar = makeVar<UserState>({
  loading: true,
  data: null,
  refetch: null
});

export default new InMemoryCache({
  // addTypename: false
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