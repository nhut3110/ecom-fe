export interface CarouselImage{
    url: string,
    category: string
}

export interface ProductDetail {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image:string,
    rating : {
        rate:number
        count:number
    }
}

export const testProduct:ProductDetail = {
"id": 9,
"title": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
"price": 64.99,
"description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
"category": "electronics",
"image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
"rating": {
"rate": 3.3,
"count": 203
}
}

export const NavList:string[] = ["products", "favorites", "cart", "order"];

export const CarouselImages:Array<CarouselImage> = [
    {
        url:"https://idjewelry.com/media/wysiwyg/rose-gold/rose_gold_jewelry.jpg", 
        category:"jewelry"
    }, 
    {
        url:"https://mir-s3-cdn-cf.behance.net/project_modules/1400/264e3629894817.5609864fcd16d.png", 
        category:"men clothing"
    }, 
    {
        url:"https://i.pinimg.com/originals/3b/a6/79/3ba679fa46d14c310ee8008891ea5754.jpg", 
        category:"women clothing"
    }, 
    {
        url:"https://www.intelligencenode.com/blog/wp-content/uploads/2019/02/electronics.jpg", 
        category:"electronics"
    }
]
