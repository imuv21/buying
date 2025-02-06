
// image slider
import bannerOne from './images/banner1.jpeg';
import bannerTwo from './images/banner2.jpeg';
import bannerThree from './images/bannerthree.png';
import bannerOnem from './images/bannerOnem.png';
import bannerTwom from './images/bannertwom.jpeg';
import bannerThreem from './images/bannerthreem.png';

export const images = [
    bannerOne, bannerTwo, bannerThree, bannerTwo
];
export const imagesMobile = [
    bannerOnem, bannerTwom, bannerThreem, bannerOnem
];


//categories
import gardening from './images/gardening.jpg';
import wood from './images/wood.jpg';
import acrylic from './images/acrylic.jpg';
import neon from './images/neon.jpg';
import toys from './images/toys.jpg';
import stationary from './images/stationary.avif';
import services from './images/customize.png';

export const categories = [
    {
        id: "iog43tsdhn54u7uh43",
        name: "Gardening",
        image: gardening
    },
    {
        id: "iog43dsiuo87th43",
        name: "Wood",
        image: wood
    },
    {
        id: "iog43djiytikyth43",
        name: "Acrylic",
        image: acrylic
    },
    {
        id: "iog43tik7ltykdh43",
        name: "Neon",
        image: neon
    },
    {
        id: "iog4sktbt3th43",
        name: "Toys",
        image: toys
    },
    {
        id: "iog43ttyketh43",
        name: "Stationary",
        image: stationary
    },
    {
        id: "iog43tu65uh43",
        name: "Services",
        image: services
    }
];
export const subCategories = {
    Gardening: ["Artificial Plants", "Table Top", "Plants Accessories", "Flower Vase", "Flower Bunch", "Gifts"],
    Wood: ["Wood Easel Canvas", "Wood Sheet", "Wood Shelves", "Customize Wood", "Wood Frame", "Ramadan & Eid Wood"],
    Acrylic: ["Table Top", "Signage", "UV Printing Acrylic", "Bath Accessories", "Display Stand", "Neon", "Customize Neon"],
    Neon: ["Festival Neon", "Celebration Neon", "Office & Event", "Customize"],
    Toys: ["New Born", "Girls", "Boys", "Unisex", "Games", "Indoor"],
    Stationary: ["Office", "School", "Kids"],
    Services: ["Digital Printing", "Offset Printing", "Photography", "Videography", "Exhibition Events", "Maintenance"]
};

//products
export const products = [
    {
        name: 'Colorful Butterfly Wall Art UV Printed Round Acrylic Paintings (12x12 Inches, 3MM) for Home, Office, Bedroom & Living Room Décor',
        originalPrice: 1499,
        salePrice: 899,
        ratings: 4,
        image: ['https://m.media-amazon.com/images/I/71lFHHjqzvL._AC_SL1140_.jpg', 'https://m.media-amazon.com/images/I/71TRn16s4CL._AC_SL1140_.jpg'],
        productId: 'c7f25f14b6b14cfa',
    },
    {
        name: '2Pcs 9.44" Round Wall Mirror Tile, Self Adhesive Non Glass Mirror Sticker Acrylic Mirror Sheet Disc High Clear Wall Mirror Circle Mirror Decorative Mirror for Bathroom, Bedroom, Door',
        originalPrice: 1299,
        salePrice: 799,
        ratings: 5,
        image: ['https://m.media-amazon.com/images/I/71lFHHjqzvL._AC_SL1140_.jpg', 'https://m.media-amazon.com/images/I/71TRn16s4CL._AC_SL1140_.jpg'],
        productId: '9e18f9d65f474fc1',
    },
    {
        name: '50 Pieces Empty Christmas Decorations Round Clear Acrylic Christmas Ornaments Clear Acrylic with Red Ribbon for DIY Christmas and Party Decorations, Gift Tag',
        originalPrice: 1599,
        salePrice: 899,
        ratings: 3,
        image: ['https://m.media-amazon.com/images/I/71lFHHjqzvL._AC_SL1140_.jpg', 'https://m.media-amazon.com/images/I/71TRn16s4CL._AC_SL1140_.jpg'],
        productId: 'f1230d2c0e52445a',
    },
    {
        name: 'Mirror Wall Stickers Striped Design, 20 Pcs Mirror Art Tile Decal, DIY Self Adhesive Wall Line Border Decals, Acrylic Mirror Strips Removable, for Home Art Wall Decor 5 * 20cm (Sliver&Gold)',
        originalPrice: 999,
        salePrice: 599,
        ratings: 4,
        image: ['https://m.media-amazon.com/images/I/71lFHHjqzvL._AC_SL1140_.jpg', 'https://m.media-amazon.com/images/I/71TRn16s4CL._AC_SL1140_.jpg'],
        productId: 'a5b67f2d36c1425b',
    },
    {
        name: 'Motivational Wall Art Set of 3 | Lion, Wolf, Eagle UV Printed Acrylic Paintings (18x27 Inches, 3MM) with Studs for Home, Office, Bedroom, Living Room Décor',
        originalPrice: 1899,
        salePrice: 1299,
        ratings: 5,
        image: ['https://m.media-amazon.com/images/I/71lFHHjqzvL._AC_SL1140_.jpg', 'https://m.media-amazon.com/images/I/71TRn16s4CL._AC_SL1140_.jpg'],
        productId: 'd83b25f6e4a84899',
    },
    {
        name: '5x7 Inches Acrylic Picture Frame Set of 6, Double Sided Clear Frameless Photo Frame, Clear Table Transparent Frame for Home Office',
        originalPrice: 1799,
        salePrice: 1149,
        ratings: 3,
        image: ['https://m.media-amazon.com/images/I/71lFHHjqzvL._AC_SL1140_.jpg', 'https://m.media-amazon.com/images/I/71TRn16s4CL._AC_SL1140_.jpg'],
        productId: 'b481209c12304878',
    },
    {
        name: 'Acrylic Double Sided Magnetic Photo Frames with Gift Box Package 2021 (3, 4x4")',
        originalPrice: 1299,
        salePrice: 849,
        ratings: 4,
        image: ['https://m.media-amazon.com/images/I/71lFHHjqzvL._AC_SL1140_.jpg', 'https://m.media-amazon.com/images/I/71TRn16s4CL._AC_SL1140_.jpg'],
        productId: 'e56af8e7c9f8469b',
    },
    {
        name: '8.5x11 Acrylic frame, Clear Certificate Document Magnetic Photo Frame for Tabletop Display with Gift Box',
        originalPrice: 1999,
        salePrice: 1299,
        ratings: 4,
        image: ['https://m.media-amazon.com/images/I/71lFHHjqzvL._AC_SL1140_.jpg', 'https://m.media-amazon.com/images/I/71TRn16s4CL._AC_SL1140_.jpg'],
        productId: 'a123fe6c3bda459c',
    },
    {
        name: 'UV Print Set of 3 | Thick Acrylic Glass Wall Art for Bedroom, Living Room, and Office Decor | 20x24 Inches',
        originalPrice: 2199,
        salePrice: 1499,
        ratings: 5,
        image: ['https://m.media-amazon.com/images/I/71lFHHjqzvL._AC_SL1140_.jpg', 'https://m.media-amazon.com/images/I/71TRn16s4CL._AC_SL1140_.jpg'],
        productId: 'dcef68a7b1c3428a',
    },
    {
        name: '6 Pcs Artificial Poppies Flowers Silk Flowers Poppy for Home Table Centerpieces Decoration Office Wedding (Orange)',
        originalPrice: 1299,
        salePrice: 899,
        ratings: 4.8,
        image: ['https://m.media-amazon.com/images/I/71lFHHjqzvL._AC_SL1140_.jpg', 'https://m.media-amazon.com/images/I/71TRn16s4CL._AC_SL1140_.jpg'],
        productId: 'f12a34b5c6d78e90',
    },
    {
        name: '25 Pcs Artificial Roses Flowers Fake Roses with Stems Real Touch Foam Flowers for DIY Wedding Bouquet Baby Shower Centerpiece Floral Arrangement Party Home Decor (Burgundy)',
        originalPrice: 1599,
        salePrice: 1099,
        ratings: 4.7,
        image: ['https://m.media-amazon.com/images/I/71lFHHjqzvL._AC_SL1140_.jpg', 'https://m.media-amazon.com/images/I/71TRn16s4CL._AC_SL1140_.jpg'],
        productId: 'a1b2c3d4e5f67890',
    },
    {
        name: '5 Pcs Silk Roses Fake Pink Roses with Stems Real Touch Rose Artificial Flowers for Arrangement Wedding Party Home Decoration',
        originalPrice: 999,
        salePrice: 749,
        ratings: 4.5,
        image: ['https://m.media-amazon.com/images/I/71lFHHjqzvL._AC_SL1140_.jpg', 'https://m.media-amazon.com/images/I/71TRn16s4CL._AC_SL1140_.jpg'],
        productId: 'b2c3d4e5f6g78901',
    },
    {
        name: '12 Pack Basswood Sheets 12 x 8 x 1/13 Inch Thin Plywood Wood Sheets Unfinished Wood Squares Boards Balsa Wood Sheets for Crafts Laser Cutting Wood Burning and Drawing (12 x 8 inch)',
        originalPrice: 1999,
        salePrice: 1499,
        ratings: 4.6,
        image: ['https://m.media-amazon.com/images/I/71lFHHjqzvL._AC_SL1140_.jpg', 'https://m.media-amazon.com/images/I/71TRn16s4CL._AC_SL1140_.jpg'],
        productId: 'c3d4e5f6g7h89012',
    },
    {
        name: 'Pack of 4 PCS 12 x 12 Inch Craft Wood, Plywood Board Basswood Sheets, Perfect for DIY Projects, Drawing, Painting, Laser, Wood Burning, Wood Engraving and Laser Projects',
        originalPrice: 1399,
        salePrice: 999,
        ratings: 4.4,
        image: ['https://m.media-amazon.com/images/I/71lFHHjqzvL._AC_SL1140_.jpg', 'https://m.media-amazon.com/images/I/71TRn16s4CL._AC_SL1140_.jpg'],
        productId: 'd4e5f6g7h8i90123',
    },
    {
        name: 'Toilet Door Sign Acrylic Sticker | Ladies+Gentlemen+Disabled | Color Black | 100mm Diameter | Adhesive Male-Female WC Signage Board | Wall Bathroom Plaque Decor Man-Woman Signs',
        originalPrice: 499,
        salePrice: 349,
        ratings: 4.2,
        image: ['https://m.media-amazon.com/images/I/71lFHHjqzvL._AC_SL1140_.jpg', 'https://m.media-amazon.com/images/I/71TRn16s4CL._AC_SL1140_.jpg'],
        productId: 'e5f6g7h8i9j01234',
    },
    {
        name: 'Large Magnetic Dry Erase White Board 72 x 48 Inch, 6\' x 4\' Big Foldable Whiteboard for Wall with Marker Tray | Silver Aluminum Frame Marker Board for Home Office Classroom',
        originalPrice: 4599,
        salePrice: 3299,
        ratings: 4.9,
        image: ['https://m.media-amazon.com/images/I/71lFHHjqzvL._AC_SL1140_.jpg', 'https://m.media-amazon.com/images/I/71TRn16s4CL._AC_SL1140_.jpg'],
        productId: 'f6g7h8i9j0k12345',
    },
    {
        name: 'Magnetic Dry Erase Board with Lines 48 x 36 Inch, 4\' x 3\' Double Sided Hanging White Board Planner for Wall | Grid Lined White Board + Message Presentation Board',
        originalPrice: 2599,
        salePrice: 1899,
        ratings: 4.7,
        image: ['https://m.media-amazon.com/images/I/71lFHHjqzvL._AC_SL1140_.jpg', 'https://m.media-amazon.com/images/I/71TRn16s4CL._AC_SL1140_.jpg'],
        productId: 'g7h8i9j0k1l23456',
    },
    {
        name: 'Magnetic Whiteboard, 45x60cm Dry Erase Board Aluminium Frame Wall Mounted White Board with Pen Tray and Accessories, Notices & Reminders Board for Office & Classroom',
        originalPrice: 1799,
        salePrice: 1299,
        ratings: 4.5,
        image: ['https://m.media-amazon.com/images/I/71lFHHjqzvL._AC_SL1140_.jpg', 'https://m.media-amazon.com/images/I/71TRn16s4CL._AC_SL1140_.jpg'],
        productId: 'h8i9j0k1l2m34567',
    },
    {
        name: 'Single Sided Dry Erase Board for Wall 60 x 90cm Aluminum Presentation Magnetic Whiteboard with Pen Tray, Wall-Mounted White Board for School, Office and Home',
        originalPrice: 2199,
        salePrice: 1599,
        ratings: 4.6,
        image: ['https://m.media-amazon.com/images/I/71lFHHjqzvL._AC_SL1140_.jpg', 'https://m.media-amazon.com/images/I/71TRn16s4CL._AC_SL1140_.jpg'],
        productId: 'i9j0k1l2m3n45678',
    },
    {
        name: '8.7" Silk Hydrangea Flower Heads with Stems Fake Hydrangeas Flowers for DIY Wedding Centerpiece Home Decor, Pack of 6 (Fiery Red)',
        originalPrice: 1299,
        salePrice: 899,
        ratings: 4.8,
        image: ['https://m.media-amazon.com/images/I/71lFHHjqzvL._AC_SL1140_.jpg', 'https://m.media-amazon.com/images/I/71TRn16s4CL._AC_SL1140_.jpg'],
        productId: 'j0k1l2m3n4o56789',
    }
];

//toasts
import { toast } from 'react-hot-toast';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

export const showToast = (type, message) => {
    const commonConfig = {
        duration: 3000,
        position: 'top-center',
        ariaProps: { role: 'status', 'aria-live': 'polite' },
    };

    if (type === 'success') {
        toast(
            <div className="flex center g5">
                <VerifiedIcon />
                {message}
            </div>,
            {
                ...commonConfig,
                style: { color: 'rgb(0, 189, 0)' },
                className: 'success',
            }
        );
    } else if (type === 'error') {
        toast(
            <div className="flex center g5">
                <NewReleasesIcon />
                {message}
            </div>,
            {
                ...commonConfig,
                style: { color: 'red' },
                className: 'failed',
            }
        );
    }
};


//admin panel
import orderList from './images/icons8-orders-list-100.png';
import reviewsList from './images/reviews.png';
import userList from './images/icons8-users-list-100.png';
import productList from './images/icons8-product-list-100.png';
import addproduct from './images/icons8-add-new-product-100.png';
import categoryList from './images/icons8-category-list-100.png';
import topRated from './images/icons8-top-rated-100.png';
import bestSeller from './images/icons8-best-seller-100.png';
import adminList from './images/icons8-role-management-100.png';
import featured from './images/featured.png';
import newAdmin from './images/newAdmin.png';

export const accordionData = [
    {
        header: 'Users',
        bricks: [
            { name: 'Order List', route: '/dashboard/order-list', icon: orderList },
            { name: 'Reviews List', route: '/dashboard/reviews-list', icon: reviewsList },
            { name: 'User List', route: '/dashboard/user-list', icon: userList },
        ],
    },
    {
        header: 'Products',
        bricks: [
            { name: 'Add New Product', route: '/dashboard/add-new-product', icon: addproduct },
            { name: 'Products List', route: '/dashboard/product-list', icon: productList },
            { name: 'Categories List', route: '/dashboard/category-list', icon: categoryList },
        ],
    },
    {
        header: 'Analytics',
        bricks: [
            { name: 'Top Rated Products', route: '/dashboard/top-rated-products', icon: topRated },
            { name: 'Best Sellers Products', route: '/dashboard/best-seller-products', icon: bestSeller },
            { name: 'Featured Products', route: '/dashboard/featured-products', icon: featured },
        ],
    },
    {
        header: 'Management',
        bricks: [
            { name: 'Add New Admin', route: '/dashboard/add-new-admin', icon: newAdmin },
            { name: 'Admin List', route: '/dashboard/admin-list', icon: adminList },
        ],
    },
];




const bla  = [
    {
        "tags": ["Marvel", "Superhero", "Avengers"],
        "title": "Iron Man Arc Reactor Glow T-Shirt",
        "category": "Superhero",
        "originalPrice": "₹1299",
        "salePrice": "₹999",
        "stocks": "50",
        "information": "A premium cotton T-shirt featuring Iron Man’s iconic Arc Reactor that glows in the dark."
    },
    {
        "tags": ["DC", "Superhero", "Batman"],
        "title": "The Dark Knight Bat Logo Tee",
        "category": "Superhero",
        "originalPrice": "₹1199",
        "salePrice": "₹899",
        "stocks": "30",
        "information": "A sleek black Batman T-shirt with the classic Bat-symbol from The Dark Knight trilogy."
    },
    {
        "tags": ["Anime", "Dragon Ball Z", "Goku"],
        "title": "Dragon Ball Z Goku Kanji Tee",
        "category": "Anime",
        "originalPrice": "₹1399",
        "salePrice": "₹1099",
        "stocks": "40",
        "information": "An orange T-shirt with Goku’s training symbol printed on the front and back."
    },
    {
        "tags": ["TV Series", "Stranger Things", "Netflix"],
        "title": "Stranger Things Hawkins High Tee",
        "category": "TV Series",
        "originalPrice": "₹1299",
        "salePrice": "₹999",
        "stocks": "25",
        "information": "A vintage-style green T-shirt featuring Hawkins High School's tiger mascot."
    },
    {
        "tags": ["Movie", "Star Wars", "Sci-Fi"],
        "title": "Star Wars Darth Vader 'Dark Side' Tee",
        "category": "Movie",
        "originalPrice": "₹1499",
        "salePrice": "₹1199",
        "stocks": "35",
        "information": "A black Star Wars tee featuring Darth Vader with ‘Join the Dark Side’ text."
    },
    {
        "tags": ["Gaming", "Retro", "Nintendo"],
        "title": "Super Mario Pixel Art Tee",
        "category": "Gaming",
        "originalPrice": "₹999",
        "salePrice": "₹799",
        "stocks": "60",
        "information": "A classic Nintendo T-shirt with an 8-bit pixel Mario print."
    },
    {
        "tags": ["Marvel", "Deadpool", "Anti-Hero"],
        "title": "Deadpool Maximum Effort T-Shirt",
        "category": "Superhero",
        "originalPrice": "₹1299",
        "salePrice": "₹999",
        "stocks": "40",
        "information": "A fun Deadpool tee featuring his catchphrase ‘Maximum Effort’."
    },
    {
        "tags": ["Anime", "Naruto", "Shonen"],
        "title": "Naruto Akatsuki Cloud Tee",
        "category": "Anime",
        "originalPrice": "₹1399",
        "salePrice": "₹1099",
        "stocks": "50",
        "information": "A black tee featuring the iconic red Akatsuki clouds from Naruto."
    },
    {
        "tags": ["TV Series", "Breaking Bad", "Walter White"],
        "title": "Breaking Bad Heisenberg Tee",
        "category": "TV Series",
        "originalPrice": "₹1199",
        "salePrice": "₹899",
        "stocks": "45",
        "information": "A minimalist design featuring Walter White’s Heisenberg sketch."
    },
    {
        "tags": ["Movie", "Harry Potter", "Hogwarts"],
        "title": "Harry Potter Hogwarts Crest Tee",
        "category": "Movie",
        "originalPrice": "₹1299",
        "salePrice": "₹999",
        "stocks": "35",
        "information": "A Hogwarts-themed T-shirt featuring the house crest."
    },
    {
        "tags": ["Gaming", "PlayStation", "Retro"],
        "title": "PlayStation Classic Logo Tee",
        "category": "Gaming",
        "originalPrice": "₹999",
        "salePrice": "₹799",
        "stocks": "55",
        "information": "A retro PlayStation logo T-shirt for gaming fans."
    },
    {
        "tags": ["Anime", "One Piece", "Luffy"],
        "title": "One Piece Luffy Gear 5 Tee",
        "category": "Anime",
        "originalPrice": "₹1499",
        "salePrice": "₹1199",
        "stocks": "30",
        "information": "A white tee featuring Luffy’s Gear 5 transformation."
    },
    {
        "tags": ["Marvel", "Spider-Man", "Comics"],
        "title": "Spider-Man Web Slinging Tee",
        "category": "Superhero",
        "originalPrice": "₹1299",
        "salePrice": "₹999",
        "stocks": "35",
        "information": "A vibrant Spider-Man T-shirt showcasing him mid-web swing."
    },
    {
        "tags": ["Movie", "The Godfather", "Classic"],
        "title": "The Godfather Logo Tee",
        "category": "Movie",
        "originalPrice": "₹1199",
        "salePrice": "₹899",
        "stocks": "25",
        "information": "A black T-shirt featuring The Godfather logo in bold white print."
    },
    {
        "tags": ["TV Series", "Game of Thrones", "Fantasy"],
        "title": "Game of Thrones House Stark Tee",
        "category": "TV Series",
        "originalPrice": "₹1299",
        "salePrice": "₹999",
        "stocks": "40",
        "information": "A Winterfell-inspired tee with the Stark direwolf sigil."
    },
    {
        "tags": ["Gaming", "Cyberpunk", "Sci-Fi"],
        "title": "Cyberpunk 2077 Samurai Logo Tee",
        "category": "Gaming",
        "originalPrice": "₹1499",
        "salePrice": "₹1199",
        "stocks": "20",
        "information": "A stylish Cyberpunk tee featuring the Samurai logo."
    },
    {
        "tags": ["Anime", "Attack on Titan", "Shonen"],
        "title": "Attack on Titan Survey Corps Tee",
        "category": "Anime",
        "originalPrice": "₹1399",
        "salePrice": "₹1099",
        "stocks": "45",
        "information": "A green T-shirt with the iconic Survey Corps Wings of Freedom emblem."
    },
    {
        "tags": ["Movie", "Jurassic Park", "Dinosaur"],
        "title": "Jurassic Park Classic Logo Tee",
        "category": "Movie",
        "originalPrice": "₹1299",
        "salePrice": "₹999",
        "stocks": "50",
        "information": "A nostalgic Jurassic Park logo T-shirt for dinosaur lovers."
    },
    {
        "tags": ["Marvel", "Loki", "Villain"],
        "title": "Loki TVA Variant Tee",
        "category": "Superhero",
        "originalPrice": "₹1299",
        "salePrice": "₹999",
        "stocks": "30",
        "information": "A TVA-themed Loki T-shirt with the 'Variant' print."
    },
    {
        "tags": ["Movie", "Back to the Future", "Sci-Fi"],
        "title": "Back to the Future Delorean Tee",
        "category": "Movie",
        "originalPrice": "₹1299",
        "salePrice": "₹999",
        "stocks": "40",
        "information": "A cool retro-style T-shirt featuring the time-traveling DeLorean."
    }
];
