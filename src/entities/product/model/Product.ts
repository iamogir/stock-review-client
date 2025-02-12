export class Product{
    constructor(
        public readonly name: string,
        public readonly category: string,
        public readonly quantityKg: number,
        public readonly unitWeight: string,
        public readonly quantityUnits: number,
        public readonly expirationDate: Date,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly barcode: string,
        public readonly supplier: string,
        public readonly storageLocation: string,
        public readonly status: string,
    ) {
        this.name = name;
        this.category = category;
        this.quantityKg = quantityKg;
        this.unitWeight = unitWeight;
        this.quantityUnits = quantityUnits;
        this.expirationDate = expirationDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.barcode = barcode;
        this.supplier = supplier;
        this.storageLocation = storageLocation;
        this.status = status;
    }

    static fromJson(json: string): Product {
        const obj = JSON.parse(json);
        return Product.fromServerObject(obj);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    static fromServerObject(obj): Product {
        return new Product(obj.name, obj.category, obj.quantityKg, obj.unitWeight, obj.quantityUnits, obj.expirationDate, obj.createdAt, obj.updatedAt,
            obj.barcode, obj.supplier, obj.storageLocation, obj.status);
    }
}