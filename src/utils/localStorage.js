// Utility functions for localStorage operations

export const storage = {
  // Cart operations
  getCart: () => {
    try {
      return JSON.parse(localStorage.getItem('gardeningCart') || '[]');
    } catch {
      return [];
    }
  },

  setCart: (cart) => {
    localStorage.setItem('gardeningCart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
  },

  addToCart: (plant) => {
    const cart = storage.getCart();
    const existingItem = cart.find(item => item.id === plant.id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cart.push({
        ...plant,
        quantity: 1,
        addedAt: new Date().toISOString()
      });
    }

    storage.setCart(cart);
  },

  // User preferences
  getPreferences: () => {
    try {
      return JSON.parse(localStorage.getItem('userPreferences') || '{}');
    } catch {
      return {};
    }
  },

  setPreferences: (preferences) => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  },

  // Favorites
  getFavorites: () => {
    try {
      return new Set(JSON.parse(localStorage.getItem('favorites') || '[]'));
    } catch {
      return new Set();
    }
  },

  setFavorites: (favorites) => {
    localStorage.setItem('favorites', JSON.stringify([...favorites]));
  },

  // Search history
  getSearchHistory: () => {
    try {
      return JSON.parse(localStorage.getItem('searchHistory') || '[]');
    } catch {
      return [];
    }
  },

  addToSearchHistory: (query) => {
    if (!query.trim()) return;

    const history = storage.getSearchHistory();
    const filteredHistory = history.filter(item => item !== query);
    const newHistory = [query, ...filteredHistory].slice(0, 10); // Keep only last 10 searches

    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  }
};
