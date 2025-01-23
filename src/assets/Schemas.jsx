
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