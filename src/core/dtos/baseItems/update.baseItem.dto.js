class UpdateBaseItemDTO {
    constructor(id, name, description, category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category
    }
    async validate() {
        try {
            await validMongoObjectId(this.id)
        } catch (error) {
            throw error;
        }
    }
}
module.exports = UpdateBaseItemDTO;