export const initialStore = {
  people: [],
  planets: [],
  vehicles: [],
  favorites: []
};


export default function storeReducer(store = initialStore, action = {}) {
  switch (action.type) {
    case "set-people":
      return {
        ...store,
        people: action.payload
      };

    case "set-planets":
      return {
        ...store,
        planets: action.payload
      };

    case "set-vehicles":
      return {
        ...store,
        vehicles: action.payload
      };

    case "add-favorite":
      if (
        store.favorites.find(
          fav => fav.uid === action.payload.uid && fav.type === action.payload.type
        )
      ) {
        return store;
      }

      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      };

    case "remove-favorite":
      return {
        ...store,
        favorites: store.favorites.filter(
          fav => !(fav.uid === action.payload.uid && fav.type === action.payload.type)
        )
      };

    default:
      return store;
  }
}