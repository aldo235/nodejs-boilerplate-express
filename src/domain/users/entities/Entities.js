
class Entities {
    constructor(id, createdAt) {
        this._id = id;
        this._createdAt = createdAt;
    }

    getId = () => {
        return this._id
    }

    setId = (id) => {
        this._id = id;
        return this;
    }

    getCreatedAt = () => {
        return this._createdAt
    }
}

module.exports = Entities