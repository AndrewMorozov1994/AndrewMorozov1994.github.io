const checkStatus = (response) => {
    if (response.ok) {
      return response;
    }
  
    throw new Error(`${response.status}: ${response.statusText}`);
  };
  
const toJSON = (response) => response.json();

export default class Loader {
    async loadData() {
        try {
            const response = await fetch(`../products.json`);
            const data = checkStatus(response);
            return await toJSON(data);
        }
        catch (err) {
            return err;
        }
    }
}




// Loader.loadData().then(it => array.push(...it));