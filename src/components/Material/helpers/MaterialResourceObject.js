export default  class MaterialResource {
    constructor(name, url, category, button, handleMaterialResourceListItemClick) {
        this.name = name;
        this.url = url;
        this.category = category;
        this.button = button;
        this.handleMaterialResourceListItemClick = handleMaterialResourceListItemClick;
    }
}