const MaterialResourceManager = class {
    constructor() {
        this.manager = {};

        this.addResource = this.addResource.bind(this);
        this.removeResource = this.removeResource.bind(this);
        this.getResourcesAsArray = this.getResourcesAsArray.bind(this);
    }

    addResource(resourceName, url, category, button, handleMaterialResourceListItemClick) {
        this.manager[resourceName] = {
            name: resourceName,
            url: url,
            category: category,
            button: button,
            handleMaterialResourceListItemClick: handleMaterialResourceListItemClick
        };
        return this.manager[resourceName];
    }

    removeResource (resourceName) {
        delete this.manager[resourceName];
        return this.manager[resourceName];
    }

    getResourcesAsArray () {
        return Object.values(this.manager);
    }
}


export default MaterialResourceManager;
