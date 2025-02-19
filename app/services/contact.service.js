const{ ObjectId, ReturnDocument } = require("mongodb");

class ContactService {
    constructor(client) {
        this.Contact = client.db().collection("contacts");
    }
    // Dinh nghia cac phuong thuc truy xuat CSDL
    extractConactData(payload){
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };
        // Remove undefined fields
        Object.keys(contact).forEach(
            (key) => contact[key] === undefined && delete contact[key]
        );
        return contact;
    }
    async create(payload) {
        const contact = this.extractConactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            contact,
            { $set: { favorite: contact.favorite === true} },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }
}

module.exports = ContactService;