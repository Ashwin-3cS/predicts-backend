
class MemoryService {
    constructor() {
      this.walletStore = new Map(); // Initialize the Map
    }
  
    /**
     * Store a wallet in the memory.
     * @param {string} key - The key to store the wallet (e.g., userId).
     * @param {object} wallet - The wallet object to store.
     */
    async storeWallet(key, wallet) {
      if (!key || !wallet) {
        throw new Error('Both key and wallet are required to store data.');
      }
      this.walletStore.set(key, wallet);
    }
  
    /**
     * Retrieve a wallet from the memory.
     * @param {string} key - The key to retrieve the wallet (e.g., userId).
     * @returns {object|null} The wallet object if found, otherwise null.
     */
    async retrieveWallet(key) {
      if (!key) {
        throw new Error('Key is required to retrieve data.');
      }
      const data = this.walletStore.get(key) || null;
      console.log(data)
      return data
    }
  
    /**
     * Remove a wallet from the memory.
     * @param {string} key - The key to remove the wallet.
     */
    async removeWallet(key) {
      if (!key) {
        throw new Error('Key is required to remove data.');
      }
      this.walletStore.delete(key);
    }
  
    /**
     * Check if a wallet exists for a specific key.
     * @param {string} key - The key to check.
     * @returns {boolean} True if the wallet exists, false otherwise.
     */
    async hasWallet(key) {
        console.log(key, "key")

      const detail =  this.walletStore.has(key);
      console.log(detail, "wallet detail....")
      return detail 
    }
  }
  
  module.exports = MemoryService;